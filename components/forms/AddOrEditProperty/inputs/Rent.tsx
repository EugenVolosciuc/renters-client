import React from 'react'
import { Form, InputNumber } from 'antd'

const Rent = () => {
    return (
        <Form.Item
            name="rentPrice"
            label="Rent price (€, monthly)"
            rules={[
                { required: true, message: 'Rent price is required' }
            ]}
        >
            <InputNumber style={{ width: '100%' }} />
        </Form.Item>
    )
}

export default Rent
