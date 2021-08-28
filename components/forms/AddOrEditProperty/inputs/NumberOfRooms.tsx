import React from 'react'
import { Form, Select } from 'antd'

const NumberOfRooms = () => {
    const roomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <Form.Item
            name="rooms"
            label="Rooms"
        >
            <Select>
                {roomOptions.map(option => (
                    <Select.Option key={`room-${option}-option`} value={option}>
                        {option}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default NumberOfRooms
