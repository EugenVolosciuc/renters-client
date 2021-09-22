import { FC } from 'react'
import Link from 'next/link'
import { Table, Typography, Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import { User } from 'types/User'
import { Property } from 'types/Property'
import { Contract } from 'types/Contract'
import { PaginatedPageQuery } from 'types/misc'
import { useGetPropertyAdminRentersQuery } from 'store/user/service'
import ListLoader from 'components/misc/loaders/ListLoader'
import { checkContractIsExpired } from 'utils/contract-helpers'
import dayjs from 'dayjs'
import { capitalize } from 'utils/parsers/string-manipulation'

type Props = {
    query: PaginatedPageQuery
}

const { Link: AntLink } = Typography

const RentersContainer: FC<Props> = ({ query }) => {
    const { t } = useTranslation()

    const { data: paginatedContracts, isLoading: contractsLoading } = useGetPropertyAdminRentersQuery(query)

    const columns = [
        {
            title: t('property:name-surname'),
            dataIndex: 'name',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                const { firstName, lastName } = contract.renter as User

                return (
                    <Link 
                        href="/app/properties/[id]?type=RENTER" 
                        as={`/app/properties/${contract.propertyId}?type=RENTER`} 
                        passHref
                    >
                        <AntLink>
                            {`${firstName} ${lastName}`}
                        </AntLink>
                    </Link>
                )
            }
        },
        {
            title: t('property:email'),
            dataIndex: 'email',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                const { email } = contract.renter as User

                return <a href={`mailto:${email}`}>{email}</a>
            }
        },
        {
            title: t('property:phone'),
            dataIndex: 'phone',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                const { phone } = contract.renter as User

                return <a href={`tel:${phone}`}>{phone}</a>
            }
        },
        {
            title: capitalize(t('common:property')),
            dataIndex: 'property',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                const { title, id } = contract.property as Property

                return (
                    <Link href="/app/properties/[id]" as={`/app/properties/${id}`} passHref>
                        <AntLink>
                            {title}
                        </AntLink>
                    </Link>
                )
            }
        },
        {
            title: t('property:currently-renting'),
            dataIndex: 'isRenting',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                const contractIsExpired = checkContractIsExpired(contract)

                return (
                    <Tag color={contractIsExpired ? "red" : "green"}>
                        {capitalize(t(`common:${contractIsExpired ? 'no' : 'yes'}`))}
                    </Tag>
                )
            }
        },
        {
            title: t('property:rents-until'),
            dataIndex: 'rentsUntil',
            // eslint-disable-next-line react/display-name
            render: (_value: unknown, contract: Contract) => {
                const contractIsExpired = checkContractIsExpired(contract)

                return contractIsExpired ? '-' : dayjs(contract.expirationDate).format('YYYY-MM-DD')
            }
        }
    ]

    if (contractsLoading || !paginatedContracts) return <ListLoader />

    return (
        <Table
            dataSource={paginatedContracts.data}
            rowKey="id"
            columns={columns}
            pagination={{
                current: query.page,
                pageSize: query.pageSize,
                total: paginatedContracts.total
            }}
        />
    )
}

export default RentersContainer
