import React from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'utils/parsers/string-manipulation'

const Address = () => {
    const { t } = useTranslation()

    return (
        <Form.Item
            name="address"
            label={capitalize(t('properties-common:address'))}
            rules={[
                { required: true, message: t('properties-common:address-required') }
            ]}
        >
            <Input />
        </Form.Item>
    )
}

export default Address
