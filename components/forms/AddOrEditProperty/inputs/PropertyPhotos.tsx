// https://codesandbox.io/s/bw813?file=/App.tsx
import React, { FC } from 'react'
import { Form, Upload, Button, FormInstance, Input, message } from 'antd'
import { useTranslation } from 'react-i18next'

import { useUploadPhotoMutation, useDeletePhotoMutation } from 'store/photos/service'
import { Photo, PHOTO_TYPE } from 'types/Photo'
import { handleError } from 'utils/handleError'

type Props = {
    form: FormInstance
}

const maxCount = 6
const maxFileSize = 1 * 1024 * 1024 // 8MB

const PropertyPhotos: FC<Props> = ({ form }) => {
    const { t } = useTranslation()
    const [uploadPhoto] = useUploadPhotoMutation()
    const [deletePhoto] = useDeletePhotoMutation()

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    // This doesn't work :/
    const handleFileSizeLimit = (file: any) => {        
        if (file.size > maxFileSize) {
            message.error(t('add-edit-property:images-must-have-max', { maxFileSize }))
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
                label={t('add-edit-property:property-photos', { maxCount })}
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    accept="image/*"
                    customRequest={handleUploadChanges}
                    listType="picture-card"
                    onRemove={handleRemovePhoto}
                    maxCount={maxCount}
                // beforeUpload={handleFileSizeLimit} // will probably delete, as it doesn't work
                >
                    <Button type="link">{t('add-edit-property:upload')}</Button>
                </Upload>
            </Form.Item>
            <Form.Item name="jsonPhotos" hidden>
                <Input />
            </Form.Item>
        </>
    )
}

export default PropertyPhotos
