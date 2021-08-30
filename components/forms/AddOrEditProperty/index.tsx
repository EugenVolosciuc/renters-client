import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Form, FormInstance, Row, Col, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'

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
import { useCreateMutation } from 'store/property/service'
import { Property, PropertyFormData } from 'types/Property'
import { handleError } from 'utils/handleError'
import { propertyFormDataToReqData } from 'utils/propertyFormDataToReqData'
import styles from 'components/forms/AddOrEditProperty/AddOrEditProperty.module.less'

type Props = {
    form: FormInstance,
    property?: Property
}

const AddOrEditProperty: FC<Props> = ({ form, property }) => {
    const router = useRouter()
    const { t } = useTranslation()
    const [createProperty, { isLoading: creatingProperty }] = useCreateMutation()

    const handleAddProperty = async (values: PropertyFormData) => {
        try {
            const dataToSend = propertyFormDataToReqData(values)
            const property = await createProperty(dataToSend).unwrap()

            // TODO: if renter added, send invitation

            message.success(t('add-property:property-added'))
            router.push('/app/properties/[id]', `/app/properties/${property.id}`)
        } catch (error) {
            handleError(error)
        }
    }

    const handleUpdateProperty = (values: PropertyFormData) => {
        console.log("UPDATING", values)
    }

    const isUpdatePropertyForm = !!property
    const formClassName = `${styles['add-edit-property-form']} add-edit-property-form`

    const initialValues = isUpdatePropertyForm 
        ? {} 
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
                    <Rent />
                    <BillTypes />
                    <PropertyPhotos form={form} />
                    <AddRenter />

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            loading={creatingProperty}
                        >
                            {t('add-property:add-property')}
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default AddOrEditProperty
