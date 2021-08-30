import React from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'utils/string-manipulation'

const Description = () => {
    const { t } = useTranslation()

    return (
        <Form.Item
            name="description"
            label={capitalize(t('properties-common:description'))}
        >
            <Input.TextArea />
        </Form.Item>
    )
}

export default Description
