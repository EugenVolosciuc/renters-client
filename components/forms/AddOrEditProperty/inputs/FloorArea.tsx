import React from 'react'
import { Form, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'

const FloorArea = () => {
    const { t } = useTranslation()

    return (
        <Form.Item
            name="floorArea"
            label={`${t('properties-common:floor-area')} (m2)`}
        >
            <InputNumber style={{ width: '100%' }} />
        </Form.Item>
    )
}

export default FloorArea
