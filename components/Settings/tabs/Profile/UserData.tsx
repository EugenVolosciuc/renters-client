import React, { FC, MouseEventHandler } from 'react'
import { Row, Col, Button } from 'antd'
import { useTranslation } from 'react-i18next'

import EntityInfoDisplay, { EntityInfoStructure } from 'components/misc/EntityInfoDisplay'
import UserLoader from 'components/misc/loaders/UserLoader'
import { useAuthedUser } from 'store/auth/slice'
import { User } from 'types/User'

type Props = {
    toggleEditMode: MouseEventHandler<HTMLButtonElement>
}

const UserData: FC<Props> = ({ toggleEditMode }) => {
    const { t } = useTranslation()
    const user = useAuthedUser() as User

    const userInfoStructureList: EntityInfoStructure[] = [
        {
            key: 'name',
            label: t('auth:name-surname'),
            direction: "vertical",
            render: (_value) => (
                `${user.firstName} ${user.lastName}`
            )
        },
        {
            key: 'email',
            label: t('auth:email'),
            direction: "vertical"
        },
        {
            key: 'phone',
            label: t('auth:phone'),
            direction: "vertical"
        }
    ]

    return (
        <UserLoader>
            <Row gutter={[8, 16]}>
                <Col span={24}>
                    <EntityInfoDisplay
                        entity={user}
                        entityInfoStructureList={userInfoStructureList}
                    />
                </Col>
                <Col span={24}>
                    <Button 
                        type="primary"
                        onClick={toggleEditMode}
                    >
                        {t('settings:edit-profile')}
                    </Button>
                </Col>
            </Row>
        </UserLoader>
    )
}

export default UserData
