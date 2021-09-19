import { FC } from 'react'
import Link from 'next/link'
import { Card, Empty, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { User } from 'types/User'
import EntityInfoDisplay, { EntityInfoStructure } from 'components/misc/EntityInfoDisplay'
import { Property } from 'types/Property'
import styles from 'components/Properties/Property/tabs/RentalHistory/RentalHistory.module.less'
import { Contract } from 'types/Contract'

type Props = {
    user: User | undefined,
    isRenterInfo: boolean,
    propertyId: Property['id'],
    contractId: Contract['id']
}

const { Meta } = Card
const { Link: AntLink } = Typography

const RenterOrAdminInfo: FC<Props> = ({ user, isRenterInfo, propertyId, contractId }) => {
    const { t } = useTranslation()

    const userInfoStructureList: EntityInfoStructure[] = [
        {
            key: 'name',
            label: t('property:name-surname'),
            render: _value => (
                `${user?.firstName} ${user?.lastName}`
            )
        },
        {
            key: 'email',
            label: t('property:email'),
            // eslint-disable-next-line react/display-name
            render: value => (
                <a 
                    className={styles['contract-contact']} 
                    href={`mailto:${value}`}
                >
                    {value as string}
                </a>
            )
        },
        {
            key: 'phone',
            label: t('property:phone'),
            // eslint-disable-next-line react/display-name
            render: value => (
                <a 
                    className={styles['contract-contact']} 
                    href={`tel:${value}`}
                >
                    {value as string}
                </a>
            )
        }
    ]

    const sendInvitationAgainContent = (
        <>
            <p className={styles['no-renter-paragraph']}>{t('property:invitation-not-accepted-yet')}</p>
            <p className={styles['no-renter-paragraph']}>
                {t('property:want-to-send')}
                <Link
                    href={`/app/properties/[id]/add-renter?contractId=${contractId}`}
                    as={`/app/properties/${propertyId}/add-renter?contractId=${contractId}`}
                    passHref
                >
                    <AntLink>
                        {t('property:another-invitation')}
                    </AntLink>
                </Link>
            </p>
        </>
    )

    return (
        <Card>
            <Meta
                title={t(`property:${isRenterInfo ? 'current-renter-info' : 'owner-info'}`)}
                description={
                    user
                        ? <EntityInfoDisplay
                            entity={user}
                            entityInfoStructureList={userInfoStructureList}
                        />
                        : <Empty description={sendInvitationAgainContent} />
                }
            />
        </Card>
    )
}

export default RenterOrAdminInfo
