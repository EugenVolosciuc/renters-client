import React from 'react'
import { Form, Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { capitalize } from 'utils/string-manipulation'
import { BILL_TYPES, getBillTypeValueAndLabel } from 'types/Bill'

const BillTypes = () => {
    const { t } = useTranslation()
    // Removing rent type because it will always be selected
    const billTypesArray = (Object.keys(BILL_TYPES) as Array<keyof typeof BILL_TYPES>).filter(billType => billType !== BILL_TYPES.RENT)

    return (
        <Form.Item
            name="billTypes"
            label={t('properties-common:bill-type', { count: 0 })}
        >
            <Select mode="multiple">
                {billTypesArray.map(type => {
                    const billTypeValueAndLabel = getBillTypeValueAndLabel(type as BILL_TYPES)

                    return <Select.Option key={`bill-type-${type}-option`} value={type}>
                        {capitalize(t(`properties-common:bill-types.${billTypeValueAndLabel.label}`))}
                    </Select.Option>
                })}
            </Select>
        </Form.Item>
    )
}

export default BillTypes
