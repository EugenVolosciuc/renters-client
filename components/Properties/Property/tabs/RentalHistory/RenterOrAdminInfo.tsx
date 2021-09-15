import { FC } from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

import { User } from 'types/User'
import EntityInfoDisplay, { EntityInfoStructure } from 'components/misc/EntityInfoDisplay'

type Props = {
    user: User,
    isRenterInfo: boolean
}

const { Meta } = Card

const RenterOrAdminInfo: FC<Props> = ({ user, isRenterInfo }) => {
    const { t } = useTranslation()

    const userInfoStructureList: EntityInfoStructure[] = [
        {
            key: 'name',
            label: t('property:name-surname'),
            render: (_value) => (
                `${user.firstName} ${user.lastName}`
            )
        },
        {
            key: 'email',
            label: t('property:email'),
        },
        {
            key: 'phone',
            label: t('property:phone'),
        }
    ]

    return (
        <Card>
            <Meta
                title={t(`property:${isRenterInfo ? 'current-renter-info' : 'owner-info'}`)}
                description={
                    <EntityInfoDisplay 
                        entity={user}
                        entityInfoStructureList={userInfoStructureList}
                    />
                }
            />
        </Card>
    )
}

export default RenterOrAdminInfo
