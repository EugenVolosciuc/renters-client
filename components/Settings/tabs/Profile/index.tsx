import React, { useState } from 'react'
import { Row, Col, Card } from 'antd'
import UserData from 'components/Settings/tabs/Profile/UserData'
import EditUser from 'components/forms/EditUser'

const ProfileTab = () => {
    const [isEditMode, setIsEditMode] = useState(false)

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={10} xl={8} xxl={7}>
                    {isEditMode
                        ? <EditUser cancel={toggleEditMode} onSuccess={toggleEditMode} />
                        : <UserData toggleEditMode={toggleEditMode} />
                    }
                </Col>
            </Row>
        </Card>
    )
}

export default ProfileTab
