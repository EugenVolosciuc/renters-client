import { useState, FC } from 'react'
import Link from 'next/link'
import { Card, Typography, Modal, Menu, message } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import { Contract } from 'types/Contract'
import { USER_ROLES } from 'types/User'
import { useAuthedUser } from 'store/auth/slice'
import { useModifyPropertyMutation } from 'store/property/service'
import { useModifyContractMutation, useDeleteContractMutation } from 'store/contract/service'
import EntityInfoDisplay, { EntityInfoStructure } from 'components/misc/EntityInfoDisplay'
import styles from 'components/Properties/Property/tabs/RentalHistory/RentalHistory.module.less'
import ExtendContract from 'components/Properties/Property/tabs/RentalHistory/modals/ExtendContract'
import CardTitle from 'components/misc/CardTitle'
import KebabMenu from 'components/misc/KebabMenu'
import { handleError } from 'utils/handleError'

type Props = {
    contract: Contract
}

enum ModalTypes {
    TERMINATE = "TERMINATE",
    EXTEND = "EXTEND"
}

type ModalType = ModalTypes | null

const { Meta } = Card
const { Link: AntLink, Text } = Typography
const { confirm } = Modal

const ContractInfo: FC<Props> = ({ contract }) => {
    const [modalIsOpen, setModalIsOpen] = useState<ModalType>(null)
    const { t } = useTranslation()
    const authedUser = useAuthedUser()
    const [modifyProperty] = useModifyPropertyMutation()
    const [modifyContract] = useModifyContractMutation()
    const [deleteContract] = useDeleteContractMutation()

    const contractHasRenter = !!contract.renter
    const isPropertyAdmin = authedUser.role === USER_ROLES.PROPERTY_ADMIN

    const handleTerminateContract = () => {
        return new Promise<void>(async resolve => {
            try {
                // Remove renter from the property
                if (contractHasRenter) {
                    await modifyProperty({
                        id: contract.propertyId,
                        property: { renter: null }
                    })

                    // Set the expirationDate as today
                    await modifyContract({
                        contractId: contract.id,
                        propertyId: contract.propertyId,
                        contract: { expirationDate: new Date() }
                    })
                } else await deleteContract(contract.id)

                // TODO: needs same fix as written in ExtendContract component
                message.success(t('property:contract-terminated-successfully'))
            } catch (error) {
                handleError(error)
            }

            resolve()
        })
    }

    const showTerminateContractModal = () => {
        confirm({
            title: contractHasRenter
                ? t('property:want-terminate-contract-title')
                : t('property:want-delete-contract-title'),
            icon: <ExclamationCircleOutlined />,
            content: contractHasRenter
                ? t('property:want-terminate-contract-with-renter-content')
                : t('property:want-terminate-contract-without-renter-content'),
            okText: contractHasRenter ? t('property:terminate') : t('common:delete'),
            cancelText: t('common:cancel'),
            okButtonProps: { danger: true },
            onOk() { handleTerminateContract() }
        })
    }

    const toggleModal = (modalType: ModalType) => {
        switch (modalType) {
            case ModalTypes.TERMINATE:
                showTerminateContractModal()
                break
            default:
                setModalIsOpen(modalType)
                break
        }
    }

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
            render: (_value) => (
                <Link href="/" passHref>
                    <AntLink>{t('property:download-contract')}</AntLink>
                </Link>
            )
        })
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={() => toggleModal(ModalTypes.EXTEND)}>
                <Text>
                    {t('property:extend-contract')}
                </Text>
            </Menu.Item>
            <Menu.Item>
                <Text onClick={() => toggleModal(ModalTypes.TERMINATE)}>
                    {contractHasRenter
                        ? t('property:terminate-contract')
                        : t('property:delete-contract')
                    }
                </Text>
            </Menu.Item>
        </Menu>
    )

    return (
        <Card className={styles.card}>
            <ExtendContract
                visible={modalIsOpen === ModalTypes.EXTEND}
                handleCancel={() => toggleModal(null)}
                contractId={contract.id}
                propertyId={contract.propertyId}
                currentExpirationDate={dayjs(contract.expirationDate)}
            />
            <Meta
                title={
                    <CardTitle
                        title={t('property:current-contract-info')}
                        extra={isPropertyAdmin ? <KebabMenu menu={menu} /> : undefined}
                    />
                }
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
