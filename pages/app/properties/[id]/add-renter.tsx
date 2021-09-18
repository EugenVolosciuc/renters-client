import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Form, Button, Row, Col, message } from 'antd'
import { Dayjs } from 'dayjs'

import AdminLayout from 'components/layouts/AdminLayout'
import ListLoader from 'components/misc/loaders/ListLoader'
import { AddRenter } from 'components/forms/AddOrEditProperty/inputs'
import { useAuthRedirect } from 'store/auth/useAuthRedirect'
import { useGetPropertyQuery } from 'store/property/service'
import { useSendSignupInvitationToRenterMutation } from 'store/auth/service'
import { useCreateContractMutation } from 'store/contract/service'
import { useNotFoundRedirect } from 'utils/userRedirects'
import { USER_ROLES } from 'types/User'
import { EntityTypes } from 'types/misc'
import { Property, PropertyFormData, PROPERTY_LABELS } from 'types/Property'
import { handleError } from 'utils/handleError'

const AddRenterForProperty = ({ propertyId, contractId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: property, isError, isLoading } = useGetPropertyQuery(propertyId)
    const [sendSignupInvitationToRenter, { isLoading: sendingInvitation }] = useSendSignupInvitationToRenterMutation()
    const [createContract, { isLoading: contractLoading }] = useCreateContractMutation()
    // TODO: add modify contract mutation hook to update contract

    useNotFoundRedirect(isError, EntityTypes.PROPERTY)
    useAuthRedirect([USER_ROLES.PROPERTY_ADMIN])

    const [form] = Form.useForm()

    const handleAddRenter = async (values: Partial<PropertyFormData>) => {
        try {
            const { renterEmail, renterName, dueDate, startDate, expirationDate } = values

            let contractIdToUse: number

            const haveContractId = !!contractId

            if (haveContractId) {
                contractIdToUse = contractId

                // TODO: update contract
            } else {
                const contract = await createContract({
                    propertyId: (property as Property).id,
                    dueDate: dueDate as number,
                    startDate: (startDate as Dayjs).toDate(),
                    expirationDate: (expirationDate as Dayjs).toDate()
                }).unwrap()
                
                contractIdToUse = contract.id
            }

            await sendSignupInvitationToRenter({
                renterEmail: renterEmail as string,
                renterName: renterName as string,
                contractId: contractIdToUse,
                propertyTitle: (property as Property).title,
                propertyType: PROPERTY_LABELS[(property as Property).type]
            })

            message.success(t('add-edit-property:rental-invitation-sent'))
            router.push('/app/properties/[id]', `/app/properties/${propertyId}`)
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <AdminLayout header={{ title: t('add-edit-property:add-a-renter-for', { propertyTitle: property?.title }) }}>
            {isLoading
                ? <ListLoader />
                : (
                    <Form
                        form={form}
                        name="add-renter"
                        layout="vertical"
                        requiredMark="optional"
                        onFinish={handleAddRenter}
                    >
                        <Row gutter={8}>
                            <Col xs={24} md={18} lg={12} xl={6} xxl={5}>
                                <AddRenter withAddCheckbox={false} />
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={sendingInvitation || contractLoading}
                                    >
                                        {t('add-edit-property:add-renter')}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )
            }
        </AdminLayout >
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale, params, query } = context

    if (!params?.id || typeof params.id !== "string") return { notFound: true }

    return {
        props: {
            propertyId: parseInt(params.id as string, 10),
            ...(query.contractId && { contractId: parseInt(query.contractId as string, 10) }),
            ...(await serverSideTranslations(
                locale as string,
                ['common', 'properties-common', 'add-edit-property']
            ))
        }
    }
}

export default AddRenterForProperty