import React, { useState } from 'react'
import { Form, Input, Checkbox, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
import DatePicker from 'components/misc/antd-overwrites/DatePicker'
import dayjs from 'dayjs'

import styles from 'components/forms/AddOrEditProperty/AddOrEditProperty.module.less'

const dueDateMin = 1
const dueDateMax = 31

const AddRenter = () => {
    const [showRenterInputs, setShowRenterInputs] = useState(false)
    const { t } = useTranslation()

    const renterInputsClassName = `${styles['renter-input']} ${showRenterInputs ? styles.show : ''}`

    const toggleShowRenterInputs = () => setShowRenterInputs(!showRenterInputs)

    return (
        <>
            <Form.Item name="addRenter" valuePropName="checked">
                <Checkbox onChange={toggleShowRenterInputs}>{t('add-edit-property:add-renter')}</Checkbox>
            </Form.Item>
            <Form.Item
                name="renterName"
                label={t('add-edit-property:name-surname')}
                className={renterInputsClassName}
                rules={showRenterInputs
                    ? [{
                        required: true,
                        message: t('add-edit-property:name-required')
                    }]
                    : undefined
                }
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="renterEmail"
                label={t('add-edit-property:email')}
                className={renterInputsClassName}
                rules={showRenterInputs
                    ? [{
                        required: true,
                        message: t('add-edit-property:email-required')
                    }]
                    : undefined
                }
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="dueDate"
                label={t('add-edit-property:due-date')}
                className={renterInputsClassName}
                rules={showRenterInputs
                    ? [
                        { 
                            required: true, 
                            message: t('add-edit-property:due-date-required') 
                        },
                        { 
                            min: dueDateMin, 
                            type: 'number', 
                            message: t(
                                'common:cannot-be-less-than', 
                                { item: t('add-edit-property:due-date', { context: 'the'}), number: dueDateMin }
                            ) 
                        },
                        { 
                            max: dueDateMax, 
                            type: 'number',
                            message: t(
                                'common:cannot-be-greater-than', 
                                { item: t('add-edit-property:due-date', { context: 'the'}), number: dueDateMax }
                            ) 
                        }
                    ]
                    : undefined
                }
            >
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name="expirationDate"
                label={t('add-edit-property:expiration-date')}
                className={renterInputsClassName}
                initialValue={dayjs().add(1, 'year')}
                rules={showRenterInputs
                    ? [
                        {
                            required: true,
                            message: t('add-edit-property:expiration-date-required')
                        }
                    ]
                    : undefined
                }
            >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>
        </>
    )
}

export default AddRenter
