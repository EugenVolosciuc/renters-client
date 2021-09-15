import { FC } from 'react'
import { Card } from "antd"
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import { capitalize } from "utils/parsers/string-manipulation"
import EntityInfoDisplay, { EntityInfoStructure } from 'components/misc/EntityInfoDisplay'
import { Contract } from 'types/Contract'

const { Meta } = Card

type Props = {
    contract: Contract
}

const ContractInfo: FC<Props> = ({ contract }) => {
    const { t } = useTranslation()

    const contractInfoStructureList: EntityInfoStructure[] = [
        {
            key: 'dueDate',
            label: t('property:due-date')
        },
        {
            key: 'startDate',
            label: t('property:signed-at'),
            render: (value) => dayjs(value as string).format('YYYY-MM-DD')
        },
        {
            key: 'expirationDate',
            label: t('property:expires-at'),
            render: (value) => dayjs(value as string).format('YYYY-MM-DD')
        }
    ]

    if (contract.url) {
        contractInfoStructureList.push({
            key: 'url',
            label: t('property:download-contract'),
        })
    }

    return (
        <Card>
            <Meta
                title={capitalize(t('property:contract'))}
                description={
                    <EntityInfoDisplay
                        entity={contract}
                        entityInfoStructureList={contractInfoStructureList}
                    />
                }
            />
        </Card>
    )
}

export default ContractInfo
