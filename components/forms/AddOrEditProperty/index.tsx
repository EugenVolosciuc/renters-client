import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Form, FormInstance, Row, Col, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'

import { dbPhotoToAntdPhoto } from 'utils/parsers/dbPhotoToAntdPhoto'

import {
    Title,
    Address,
    Description,
    PropertyType,
    NumberOfFloors,
    NumberOfRooms,
    FloorArea,
    Floor,
    Rent,
    BillTypes,
    AddRenter,
    PropertyPhotos
} from 'components/forms/AddOrEditProperty/inputs'
import { useCreatePropertyMutation, useModifyPropertyMutation } from 'store/property/service'
import { Property, PropertyFormData } from 'types/Property'
import { handleError } from 'utils/handleError'
import { propertyFormDataToReqData } from 'utils/parsers/propertyFormDataToReqData'
import { parseDBArray } from 'utils/parsers/string-manipulation'
import styles from 'components/forms/AddOrEditProperty/AddOrEditProperty.module.less'
import { BILL_TYPES } from 'types/Bill'

type Props = {
    form: FormInstance,
    property?: Property
}

const AddOrEditProperty: FC<Props> = ({ form, property }) => {
    const router = useRouter()
    const { t } = useTranslation()
    const [createProperty, { isLoading: creatingProperty }] = useCreatePropertyMutation()
    const [modifyProperty, { isLoading: modifyingProperty }] = useModifyPropertyMutation()

    const handleAddProperty = async (values: PropertyFormData) => {
        try {
            const dataToSend = propertyFormDataToReqData(values)
            const property = await createProperty(dataToSend).unwrap()

            // TODO: if renter added, send invitation

            message.success(t('add-edit-property:property-added'))
            router.push('/app/properties/[id]', `/app/properties/${property.id}`)
        } catch (error) {
            handleError(error)
        }
    }

    const handleUpdateProperty = async (values: PropertyFormData) => {
        try {
            const dataToSend = propertyFormDataToReqData(values)
            const modifiedProperty = await modifyProperty({ property: dataToSend, id: (property as Property).id }).unwrap()

            message.success(t('add-edit-property:property-modified'))
            router.push('/app/properties/[id]', `/app/properties/${modifiedProperty.id}`)
        } catch (error) {
            handleError(error)
        }
    }

    const isUpdatePropertyForm = !!property
    const formClassName = `${styles['add-edit-property-form']} add-edit-property-form`

    const initialValues = isUpdatePropertyForm
        ? {
            title: property.title,
            address: property.address,
            billTypes: parseDBArray(property.billTypes as string).filter(billType => billType !== BILL_TYPES.RENT),
            description: property.description,
            floor: property.floor,
            floors: property.floors,
            floorArea: property.floorArea,
            type: property.type,
            rooms: property.rooms,
            rentPrice: property.rentPrice,
            ...(property.photos && {
                uploadPhotos: property.photos.map(dbPhotoToAntdPhoto),
                jsonPhotos: JSON.stringify(property.photos)
            })
        }
        : {
            jsonPhotos: '[]',
            addRenter: false
        }

    return (
        <Form
            name="add-property"
            layout="vertical"
            form={form}
            size="middle"
            requiredMark="optional"
            className={formClassName}
            onFinish={isUpdatePropertyForm ? handleUpdateProperty : handleAddProperty}
            initialValues={initialValues}
        >
            <Row gutter={8}>
                <Col xs={24} md={18} lg={12} xl={6} xxl={5}>
                    <Title />
                    <Address />
                    <PropertyType />
                    <NumberOfFloors />
                    <NumberOfRooms />
                    <Description />
                    <FloorArea />
                    <Floor />
                    {/* TODO: Remove Rent component from here, it should be set in the "Add a renter" section, */}
                    {/* as that's where the contract will be instantiated. */}
                    <Rent />
                    <BillTypes />
                    <PropertyPhotos form={form} />
                    {!isUpdatePropertyForm && <AddRenter />}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={creatingProperty || modifyingProperty}
                        >
                            {isUpdatePropertyForm
                                ? t('properties-common:edit-property')
                                : t('properties-common:add-property')
                            }
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default AddOrEditProperty
