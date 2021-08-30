import React from 'react'
import { Form, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'utils/string-manipulation'

const Rent = () => {
    const { t } = useTranslation()

    return (
        <Form.Item
            name="rentPrice"
            label={`${t('properties-common:monthly-rent-price')} (€)`}
            rules={[
                { required: true, message: t('properties-common:rent-price-required') }
            ]}
        >
            <InputNumber style={{ width: '100%' }} />
        </Form.Item>
    )
}

export default Rent
