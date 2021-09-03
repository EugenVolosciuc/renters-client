// https://codesandbox.io/s/bw813?file=/App.tsx
import React, { FC, useState } from 'react'
import { Form, Upload, Button, Modal, FormInstance, Input, message } from 'antd'
import { useTranslation } from 'react-i18next'

import { useUploadMutation, useDeleteMutation } from 'store/photos/service'
import { Photo, PHOTO_TYPE } from 'types/Photo'
import { handleError } from 'utils/handleError'

type Props = {
    form: FormInstance
}

function getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

const defaultPreview = {
    visible: false,
    image: '',
    title: ''
}

const maxCount = 6
const maxFileSize = 1 * 1024 * 1024 // 8MB

const PropertyPhotos: FC<Props> = ({ form }) => {
    const [preview, setPreview] = useState(defaultPreview)
    const { t } = useTranslation()
    const [uploadPhoto] = useUploadMutation()
    const [deletePhoto] = useDeleteMutation()

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setPreview({
            visible: true,
            image: file.url || file.preview,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        })
    }

    const handleClosePreview = () => setPreview(defaultPreview)

    // This doesn't work :/
    const handleFileSizeLimit = (file: any) => {        
        if (file.size > maxFileSize) {
            message.error(t('add-property:images-must-have-max', { maxFileSize }))
            return false
        }

        return Promise.resolve(file)
    }

    const handleUploadChanges = async (options: any) => {
        const { file, onError, onSuccess, } = options
        try {
            const formData = new FormData()
            formData.append(PHOTO_TYPE.PROPERTY, file)

            const result = await uploadPhoto(formData).unwrap()

            const currentPhotos: Photo[] = JSON.parse(form.getFieldValue('jsonPhotos'))
            currentPhotos.push(result)

            form.setFieldsValue({ jsonPhotos: JSON.stringify(currentPhotos) })

            onSuccess()
        } catch (error) {
            console.log("ERROR", error)
            onError()
        }
    }

    const handleRemovePhoto = async (file: any) => {
        try {
            const currentPhotos: Photo[] = JSON.parse(form.getFieldValue('jsonPhotos'))

            const { public_id } = currentPhotos.find(photo => photo.title === file.name) as Photo
            const filteredPhotos = currentPhotos.filter(photo => photo.title !== file.name)
            form.setFieldsValue({ jsonPhotos: JSON.stringify(filteredPhotos) })

            await deletePhoto(public_id)
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <>
            <Form.Item
                name="uploadPhotos"
                label={t('add-property:property-photos', { maxCount })}
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    accept="image/*"
                    customRequest={handleUploadChanges}
                    listType="picture-card"
                    onPreview={handlePreview}
                    onRemove={handleRemovePhoto}
                    maxCount={maxCount}
                // beforeUpload={handleFileSizeLimit} // will probably delete, as it doesn't work
                >
                    <Button type="link">{t('add-property:upload')}</Button>
                </Upload>
            </Form.Item>
            <Form.Item name="jsonPhotos" hidden>
                <Input />
            </Form.Item>
            <Modal
                visible={preview.visible}
                title={preview.title}
                footer={null}
                onCancel={handleClosePreview}
            >
                <img alt={preview.title} style={{ width: '100%' }} src={preview.image} />
            </Modal>
        </>

    )
}

export default PropertyPhotos
