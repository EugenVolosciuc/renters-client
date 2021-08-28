import React, { FC } from 'react'
import { Form, FormInstance, Row, Col, Button } from 'antd'

import { Property, PropertyFormData } from 'types/Property'
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
import styles from 'components/forms/AddOrEditProperty/AddOrEditProperty.module.less'

type Props = {
    form: FormInstance,
    property?: Property
}

const AddOrEditProperty: FC<Props> = ({ form, property }) => {
    const isUpdatePropertyForm = !!property

    const handleAddProperty = (values: PropertyFormData) => {
        console.log("ADDING", values)
    }

    const handleUpdateProperty = (values: PropertyFormData) => {
        console.log("UPDATING", values)
    }

    const formClassName = `${styles['add-edit-property-form']} add-edit-property-form`

    const initialValues = isUpdatePropertyForm 
        ? {} 
        : {
            photos: '[]'
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
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default AddOrEditProperty
