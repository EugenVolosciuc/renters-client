import React from 'react'
import { Form, Input } from 'antd'

const Title = () => {
    return (
        <Form.Item
            name="title"
            label="Title"
            rules={[
                { required: true, message: 'Title is required' }
            ]}
        >
            <Input />
        </Form.Item>
    )
}

export default Title
