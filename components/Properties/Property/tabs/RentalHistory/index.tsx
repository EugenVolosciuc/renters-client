import { FC } from 'react'
import Link from 'next/link'
import { Row, Col, Empty, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { Property } from 'types/Property'
import RenterOrAdminInfo from 'components/Properties/Property/tabs/RentalHistory/RenterOrAdminInfo'
import ContractInfo from 'components/Properties/Property/tabs/RentalHistory/ContractInfo'
import History from 'components/Properties/Property/tabs/RentalHistory/History'
import { getCurrentContractFromAllContracts } from 'utils/getCurrentContractFromAllContracts'
import { useAuthedUser } from 'store/auth/slice'
import { User, USER_ROLES } from 'types/User'

type Props = {
    property: Property
}

const { Link: AntLink } = Typography

const RentalHistory: FC<Props> = ({ property }) => {
    const { t } = useTranslation()

    const authedUser = useAuthedUser()

    const authedUserIsRenter = authedUser.role === USER_ROLES.RENTER

    if (!property.contracts || property.contracts.length < 1) {
        return <Empty description={t('properties:no-properties')} />
    }

    const currentContract = getCurrentContractFromAllContracts(property.contracts)

    const noCurrentContractContent = (
        <Col span={24}>
            <Empty description={
                <>
                    {t('properties:no-contracts')}
                    {' '}
                    {t('properties:can-add-renter')}
                    {' '}
                    <Link href="/" passHref>
                        <AntLink>
                            {/* TODO: add link */}
                            {t('')}
                        </AntLink>
                    </Link>
                </>
            } />
        </Col>
    )

    return (
        <Row gutter={[16, 16]}>
            {currentContract
                ? (
                    <>
                        <Col xs={24} md={12} xxl={6}>
                            <RenterOrAdminInfo 
                                user={
                                    authedUserIsRenter
                                        ? property.administrator
                                        : currentContract.renter as User
                                } 
                                isRenterInfo={!authedUserIsRenter} 
                            />
                        </Col>
                        <Col xs={24} md={12} xxl={6}>
                            <ContractInfo contract={currentContract} />
                        </Col>
                    </>
                )
                : noCurrentContractContent
            }
            <Col xs={24} xxl={12}>
                <History />
            </Col>
        </Row>

    )
}

export default RentalHistory
