import React from 'react'
import { Form, Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { PROPERTY_TYPES, getPropertyTypeValueAndLabel } from 'types/Property'
import { capitalize } from 'utils/parsers/string-manipulation'

const PropertyType = () => {
    const { t } = useTranslation()

    const typesArray = Object.keys(PROPERTY_TYPES) as Array<keyof typeof PROPERTY_TYPES>

    return (
        <Form.Item
            name="type"
            label={t('properties-common:property-type')}
            rules={[
                { required: true, message: t('properties-common:property-type-required') }
            ]}
        >
            <Select>
                {typesArray.map(type => {
                    const typeValueAndLabel = getPropertyTypeValueAndLabel(type as PROPERTY_TYPES)

                    return <Select.Option key={`type-${type}-option`} value={type}>
                        {capitalize(t(`properties-common:property-types.${typeValueAndLabel.label}`))}
                    </Select.Option>
                })}
            </Select>
        </Form.Item>
    )
}

export default PropertyType
