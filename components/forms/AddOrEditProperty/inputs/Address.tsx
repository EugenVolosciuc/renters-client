import React from 'react'
import { Form, Input } from 'antd'

const Address = () => {
    return (
        <Form.Item
            name="address"
            label="Address"
            rules={[
                { required: true, message: 'Address is required' }
            ]}
        >
            <Input />
        </Form.Item>
    )
}

export default Address
