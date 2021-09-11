import React from 'react'
import { Form, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'utils/parsers/string-manipulation'

const Floor = () => {
    const { t } = useTranslation()
    
    const floorOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

    return (
        <Form.Item
        name="floor"
        label={capitalize(t('properties-common:floor'))}
    >
        <Select>
            {floorOptions.map(option => (
                <Select.Option key={`floor-${option}-option`} value={option}>
                    {
                        option === 0
                            ? capitalize(t('add-edit-property:ground-floor'))
                            : option
                    }
                </Select.Option>
            ))}
        </Select>
    </Form.Item>
    )
}

export default Floor
