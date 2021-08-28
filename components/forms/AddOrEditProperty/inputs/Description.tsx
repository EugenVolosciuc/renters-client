import React from 'react'
import { Form, Input } from 'antd'

const Description = () => {
    return (
        <Form.Item
            name="description"
            label="Description"
        >
            <Input.TextArea />
        </Form.Item>
    )
}

export default Description
