import React from 'react'
import { Table, Typography, Tooltip, Row, Col, Button, Modal, message } from 'antd'
import {
    CheckOutlined,
    CloseOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'

import { CronJob } from 'types/CronJob'
import {
    useCancelNextCronJobInvocationMutation,
    useGetCronJobsQuery,
    useModifyCronJobMutation
} from 'store/cron/service'
import styles from 'styles/pages/CronJobs.module.less'
import { capitalize } from 'utils/string-manipulation'
import { handleError } from 'utils/handleError'

const cronTextWebsite = "https://crontab.guru/#"

const { Text, Link: AntLink } = Typography
const { confirm } = Modal

const CronJobsContainer = () => {
    const { data: cronJobs, isLoading: cronJobsAreLoading } = useGetCronJobsQuery()
    const [modifyCronJob] = useModifyCronJobMutation()
    const [cancelNextCronJobInvocation] = useCancelNextCronJobInvocationMutation()

    const handleToggleCronJob = async (cronJob: CronJob) => {
        const { id, isRunning } = cronJob

        try {
            await modifyCronJob({ id, isRunning: !isRunning })
            message.success(`Cron job ${isRunning ? 'stopped' : 'started'} successfully`)
        } catch (error) {
            handleError(error)
        }
    }

    const handleNextCronJobInvocationCancelation = async (cronJob: CronJob) => {
        const { id } = cronJob

        try {
            await cancelNextCronJobInvocation(id)
            message.success(`Next invocation of "${cronJob.title}" canceled successfully`)
        } catch (error) {
            handleError(error)
        }
    }

    const showStopCronJobConfirmation = (cronJob: CronJob) => {
        confirm({
            title: 'Are you sure you want to stop this cron job?',
            icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleToggleCronJob(cronJob)
            },
            onCancel() { }
        })
    }

    const showCancelNextCronJobConfirmation = (cronJob: CronJob) => {
        confirm({
            title: `Are you sure you want to cancel the next invocation of "${cronJob.title}"?`,
            icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleNextCronJobInvocationCancelation(cronJob)
            },
            onCancel() { }
        })
    }

    const columns = [
        {
            title: <Text className={styles.bold}>Title</Text>,
            dataIndex: 'title',
            key: 'title',
            render: (title: CronJob['title'], cronJob: CronJob) => (
                <Tooltip title={cronJob.description}>
                    <Text>{title}</Text>
                </Tooltip>
            )
        },
        {
            title: <Text className={styles.bold}>Interval</Text>,
            dataIndex: 'interval',
            key: 'interval',
            render: (interval: CronJob['interval']) => (
                <AntLink href={`${cronTextWebsite}${interval.replace(' ', '_')}`} target="_blank">
                    <Text>{interval}</Text>
                </AntLink>
            )
        },
        {
            title: <Text className={styles.bold}>Is running</Text>,
            dataIndex: 'isRunning',
            key: 'isRunning',
            render: (isRunning: CronJob['isRunning']) => {
                return isRunning ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />
            }
        },
        {
            title: <Text className={styles.bold}>Next invocation</Text>,
            dataIndex: 'nextInvocation',
            key: 'nextInvocation',
            render: (nextInvocation: CronJob['nextInvocation']) => {
                if (!nextInvocation) return '-'

                return capitalize(dayjs().to(dayjs(nextInvocation)))
            }
        },
        {
            title: <Text className={styles.bold}>Actions</Text>,
            dataIndex: 'actions',
            key: 'actions',
            render: (_: unknown, cronJob: CronJob) => {
                const handleToggleCronJobButtonClick = () => {
                    if (cronJob.isRunning) return showStopCronJobConfirmation(cronJob)

                    handleToggleCronJob(cronJob)
                }

                return (
                    <Row gutter={8}>
                        <Col>
                            <Button
                                onClick={() => showCancelNextCronJobConfirmation(cronJob)}
                                danger
                            >
                                Cancel next invocation
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={handleToggleCronJobButtonClick}
                                danger={cronJob.isRunning}
                            >
                                {cronJob.isRunning ? 'Stop' : 'Start'}
                            </Button>
                        </Col>
                    </Row>
                )
            }
        }
    ]

    return (
        <Table
            dataSource={cronJobs}
            columns={columns}
            loading={cronJobsAreLoading}
            rowKey="id"
            pagination={false}
        />
    )
}

export default CronJobsContainer
