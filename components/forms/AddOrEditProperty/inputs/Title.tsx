import React from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'utils/string-manipulation'

const Title = () => {
    const { t } = useTranslation()

    return (
        <Form.Item
            name="title"
            label={capitalize(t('properties-common:title'))}
            rules={[
                { required: true, message: t('properties-common:title-required') }
            ]}
        >
            <Input />
        </Form.Item>
    )
}

export default Title
