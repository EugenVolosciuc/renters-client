import React from 'react'
import { Form, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'utils/parsers/string-manipulation'

const NumberOfRooms = () => {
    const { t } = useTranslation()
    const roomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <Form.Item
            name="rooms"
            label={capitalize(t('properties-common:room', { count: 0 }))}
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
