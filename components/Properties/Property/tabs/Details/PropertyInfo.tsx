import { FC } from 'react'
import { Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import { Property } from 'types/Property'
import { capitalize, parseDBArray } from 'utils/string-manipulation'
import EntityInfoDisplay, { EntityInfoStructure } from 'components/misc/EntityInfoDisplay'

type Props = {
    property: Property
}

const PropertyInfo: FC<Props> = ({ property }) => {
    const { t } = useTranslation()

    const propertyInfoStructureList: EntityInfoStructure[] = [
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
            key: 'address',
            label: capitalize(t('properties-common:address')),
            direction: 'vertical'
        },
        {
            key: 'description',
            label: capitalize(t('properties-common:description')),
            direction: 'vertical'
        }
    ]

    return <EntityInfoDisplay
        entity={property}
        entityInfoStructureList={propertyInfoStructureList}
        title={property.title}
    />
}

export default PropertyInfo
