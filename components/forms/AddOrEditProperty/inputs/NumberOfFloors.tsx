import React from 'react'
import { Form, Select } from 'antd'
import { useTranslation } from 'react-i18next'

const NumberOfFloors = () => {
    const { t } = useTranslation()

    const floorOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <Form.Item
        name="floors"
        label={t('properties-common:total-floors')}
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
