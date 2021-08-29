import React, { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Card } from 'antd'

import { Property } from 'types/Property'
import styles from 'components/Properties/PropertyItem/PropertyItem.module.less'
import { Photo } from 'types/Photo'
import emptyCover from 'public/images/empty.jpg'

type Props = {
    property: Property
}

const { Meta } = Card

const PropertyItem: FC<Props> = ({ property }) => {
    const router = useRouter()
    const { photos, title, rentPrice, address, id } = property

    const hasPhotos = photos && photos.length > 0
    const coverImage = hasPhotos ? (photos as Photo[])[0].url : emptyCover
    const altText = hasPhotos ? (photos as Photo[])[0].title : 'No photo available'

    const handleClick = () => {
        router.push('/app/properties/[id]', `/app/properties/${id}`)
    }

    return (
        <Card
            onClick={handleClick}
            className={styles.card}
            cover={
                <span className={styles['cover-container']}>
                    <Image src={coverImage} alt={altText} layout="fill" objectFit="cover" />
                </span>
            }
            hoverable
        >
            <Meta
                title={title}
                description={`${rentPrice}€ / ${address}`}
            />
        </Card>
    )
}

export default PropertyItem
