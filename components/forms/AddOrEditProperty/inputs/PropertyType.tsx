import React from 'react'
import { Form, Select } from 'antd'

import { PROPERTY_TYPES, getPropertyTypeValueAndLabel } from 'types/Property'

const PropertyType = () => {
    const typesArray = Object.keys(PROPERTY_TYPES) as Array<keyof typeof PROPERTY_TYPES>

    return (
        <Form.Item
            name="type"
            label="Property type"
            rules={[
                { required: true, message: 'Property type is required' }
            ]}
        >
            <Select>
                {typesArray.map(type => {
                    const typeValueAndLabel = getPropertyTypeValueAndLabel(type as PROPERTY_TYPES)

                    return <Select.Option key={`type-${type}-option`} value={type}>
                        {typeValueAndLabel.label}
                    </Select.Option>
                })}
            </Select>
        </Form.Item>
    )
}

export default PropertyType
