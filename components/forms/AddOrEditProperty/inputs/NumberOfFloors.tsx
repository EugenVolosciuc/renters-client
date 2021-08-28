import React from 'react'
import { Form, Select } from 'antd'

const NumberOfFloors = () => {
    const floorOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <Form.Item
        name="floors"
        label="Floors (total)"
    >
        <Select>
            {floorOptions.map(option => (
                <Select.Option key={`floors-${option}-option`} value={option}>
                    {option}
                </Select.Option>
            ))}
        </Select>
    </Form.Item>
    )
}

export default NumberOfFloors
