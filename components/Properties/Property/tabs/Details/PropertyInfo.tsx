import React, { FC, ReactNode } from 'react'
import { Row, Col, Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import { Property } from 'types/Property'
import { capitalize, parseDBArray } from 'utils/string-manipulation'
import LabelValuePresentation from 'components/misc/info-presentation/LabelValuePresentation'

type Props = {
    property: Property
}

type PropertyInfoStructure = {
    key: string,
    label: string | number | ReactNode,
    direction?: 'horizontal' | 'vertical',
    valueAsLabel?: boolean
    render?: (value: unknown) => string | number | ReactNode
}

const PropertyInfo: FC<Props> = ({ property }) => {
    const { t } = useTranslation()

    const propertyInfoStructureList: PropertyInfoStructure[] = [
        {
            key: 'type',
            label: t('properties-common:property-type'),
            render: (value) => (
                capitalize(
                    t(`properties-common:property-types.${(value as string).toLowerCase()}`)
                )
            )
        },
        {
            key: 'title',
            label: capitalize(t('properties-common:title'))
        },
        {
            key: 'address',
            label: capitalize(t('properties-common:address'))
        },
        {
            key: 'floor',
            label: capitalize(t('properties-common:floor'))
        },
        {
            key: 'floors',
            label: t('properties-common:total-floors')
        },
        {
            key: 'rooms',
            label: capitalize(t('properties-common:room', { count: 2 }))
        },
        {
            key: 'floorArea',
            label: t('properties-common:floor-area')
        },
        {
            key: 'billTypes',
            label: capitalize(t('properties-common:bill-type', { count: 2 })),
            direction: 'vertical',
            render: (value) => {
                const parsedBillTypesArray = parseDBArray(value as string)
                
                return parsedBillTypesArray.map(billType => (
                    <Tag style={{ marginBottom: '4px' }} key={`${billType}-billType`}>
                        {capitalize(t(`properties-common:bill-types.${billType.toLowerCase()}`))}
                    </Tag>
                ))
            }
        },
        {
            key: 'description',
            label: capitalize(t('properties-common:description')),
            direction: 'vertical'
        }
    ]

    return (
        <Row gutter={[8, 8]}>
            {propertyInfoStructureList.map(({ key, label, render, direction, valueAsLabel }) => {
                const hasCustomRender = !!render

                const initValue = (property as Record<string, any>)[key]

                const value = hasCustomRender
                    ? render(initValue)
                    : initValue

                return <Col span={24} key={`${key}-${label}`}>
                    <LabelValuePresentation
                        label={valueAsLabel ? value : label}
                        value={valueAsLabel ? undefined : value}
                        direction={direction}
                    />
                </Col>
            })}
        </Row>
    )
}

export default PropertyInfo
