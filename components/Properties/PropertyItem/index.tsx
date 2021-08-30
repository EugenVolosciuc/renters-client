import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, Typography, Tooltip } from 'antd'
import { EyeOutlined, EditOutlined, NotificationOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { Property } from 'types/Property'
import { Photo } from 'types/Photo'
import PropertyItemDescription from 'components/Properties/PropertyItem/PropertyItemDescription'
import styles from 'components/Properties/PropertyItem/PropertyItem.module.less'
import emptyCover from 'public/images/empty.jpg'

type Props = {
    property: Property
}

const { Meta } = Card
const { Link: AntLink } = Typography

const PropertyItem: FC<Props> = ({ property }) => {
    const { t } = useTranslation()

    const { photos, title, id } = property

    const hasPhotos = photos && photos.length > 0
    const coverImage = hasPhotos ? (photos as Photo[])[0].url : emptyCover
    const altText = hasPhotos ? (photos as Photo[])[0].title : t('properties:no-photo-available')

    const viewPropertyAction = (
        <Link
            key={`view-${id}`}
            href="/app/properties/[id]"
            as={`/app/properties/${id}`}
        >
            <Tooltip title={t('properties:view-property')}>
                <AntLink>
                    <EyeOutlined />
                </AntLink>
            </Tooltip>
        </Link>
    )

    const editPropertyAction = (
        <Link
            key={`edit-${id}`}
            href="/app/properties/[id]/edit"
            as={`/app/properties/${id}/edit`}
        >
            <Tooltip title={t('properties:edit-property')}>
                <AntLink>
                    <EditOutlined />
                </AntLink>
            </Tooltip>
        </Link>
    )

    const sendNotificationToRenterAction = (
        <Link
            key={`send-notification-to-renter-${id}`}
            href="/app/properties/[id]/bill-notification"
            as={`/app/properties/${id}/bill-notification`}
        >
            <Tooltip title={t('properties:send-bill-notification')}>
                <AntLink>
                    <NotificationOutlined />
                </AntLink>
            </Tooltip>
        </Link>
    )

    return (
        <Card
            className={styles.card}
            cover={
                <span className={styles['cover-container']}>
                    <Image src={coverImage} alt={altText} layout="fill" objectFit="cover" />
                </span>
            }
            actions={[
                viewPropertyAction,
                editPropertyAction,
                sendNotificationToRenterAction
            ]}
            hoverable
        >
            <Meta
                title={title}
                description={<PropertyItemDescription property={property} />}
            />
        </Card>
    )
}

export default PropertyItem
