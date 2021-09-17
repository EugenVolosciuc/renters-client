import { FC } from 'react'
import Link from 'next/link'
import { Card, Typography } from "antd"
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import { capitalize } from "utils/parsers/string-manipulation"
import EntityInfoDisplay, { EntityInfoStructure } from 'components/misc/EntityInfoDisplay'
import { Contract } from 'types/Contract'

const { Meta } = Card
const { Link: AntLink } = Typography

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
            // eslint-disable-next-line react/display-name
            render: (value) => dayjs(value as string).format('YYYY-MM-DD')
        },
        {
            key: 'expirationDate',
            label: t('property:expires-at'),
            // eslint-disable-next-line react/display-name
            render: (value) => dayjs(value as string).format('YYYY-MM-DD')
        }
    ]

    if (contract.url) {
        contractInfoStructureList.push({
            key: 'url',
            label: '',
            valueAsLabel: true,
            // eslint-disable-next-line react/display-name
            render: (value) => (
                <Link href="/" passHref>
                    <AntLink>{t('property:download-contract')}</AntLink>
            </Link>
            )
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
