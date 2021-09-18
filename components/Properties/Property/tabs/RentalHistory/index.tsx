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
import { getRenterContract } from 'utils/getRenterContract'

type Props = {
    property: Property
}

const { Link: AntLink } = Typography

const RentalHistory: FC<Props> = ({ property }) => {
    const { t } = useTranslation()
    const authedUser = useAuthedUser()

    const authedUserIsRenter = authedUser?.role === USER_ROLES.RENTER

    const addRenterHere = (
        <>
            {t('property:can-add-renter')}
            {' '}
            <Link 
                href="/app/properties/[id]/add-renter" 
                as={`/app/properties/${property.id}/add-renter`} 
                passHref
            >
                <AntLink>
                    {t('property:here')}
                </AntLink>
            </Link>
        </>
    )

    if (!property.contracts || property.contracts.length < 1) {
        return <Empty description={
            <>
                {t('property:no-contracts')}
                {' '}
                {addRenterHere}
            </>
        } />
    }

    const mainContractToDisplay = authedUserIsRenter
        ? getRenterContract(authedUser, property.contracts)
        : getCurrentContractFromAllContracts(property.contracts)

    const noCurrentContractContent = (
        <Col span={24}>
            <Empty description={
                <>
                    {t('property:no-current-contract')}
                    {' '}
                    {addRenterHere}
                </>
            } />
        </Col>
    )

    return (
        <Row gutter={[16, 16]}>
            {mainContractToDisplay
                ? (
                    <>
                        <Col xs={24} md={12}>
                            <RenterOrAdminInfo
                                user={
                                    authedUserIsRenter
                                        ? property.administrator
                                        : mainContractToDisplay.renter
                                }
                                isRenterInfo={!authedUserIsRenter}
                                propertyId={property.id}
                                contractId={mainContractToDisplay.id}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <ContractInfo contract={mainContractToDisplay} />
                        </Col>
                    </>
                )
                : noCurrentContractContent
            }
            {!authedUserIsRenter &&
                <Col xs={24}>
                    <History contracts={property.contracts} />
                </Col>
            }
        </Row>

    )
}

export default RentalHistory
