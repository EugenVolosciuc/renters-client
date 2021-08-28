import React, { useState } from 'react'
import { Row, Col, Form, Input, Checkbox } from 'antd'

import styles from 'components/forms/AddOrEditProperty/AddOrEditProperty.module.less'

const AddRenter = () => {
    const [showRenterInputs, setShowRenterInputs] = useState(false)
    const renterInputsClassName = `${styles['renter-input']} ${showRenterInputs ? styles.show : ''}`

    const toggleShowRenterInputs = () => setShowRenterInputs(!showRenterInputs)

    return (
        <>
            <Form.Item name="addRenter" valuePropName="checked">
                <Checkbox onChange={toggleShowRenterInputs}>Add a renter profile</Checkbox>
            </Form.Item>
            <Form.Item
                name="renterName"
                label="Name"
                className={renterInputsClassName}
                rules={showRenterInputs 
                    ? [{
                        required: true, 
                        message: "Renter's name is required"
                    }] 
                    : undefined
                }
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="renterEmail"
                label="Email"
                className={renterInputsClassName}
                rules={showRenterInputs 
                    ? [{
                        required: true, 
                        message: "Renter's email is required"
                    }] 
                    : undefined
                }
            >
                <Input />
            </Form.Item>
        </>
    )
}

export default AddRenter
