import React from 'react'
import { Form, InputNumber } from 'antd'

const FloorArea = () => {
    return (
        <Form.Item
            name="floorArea"
            label="Floor area (m2)"
        >
            <InputNumber style={{ width: '100%' }} />
        </Form.Item>
    )
}

export default FloorArea
