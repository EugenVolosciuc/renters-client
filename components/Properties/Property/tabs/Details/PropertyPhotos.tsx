import React, { FC } from 'react'
import Image from 'next/image'
import { Carousel } from 'antd'

import { Photo } from 'types/Photo'

type Props = {
    photos: Photo[]
}

const PropertyPhotos: FC<Props> = ({ photos }) => {
    console.log('photos', photos)
    return (
        <Carousel>
            {photos.map(photo => (
                <div key={photo.public_id}>
                    <Image 
                        width={400}
                        height={250}
                        src={photo.url} 
                        alt={photo.title} 
                        layout="responsive"
                        objectFit="contain"
                    />
                </div>
            ))}
        </Carousel>
    )
}

export default PropertyPhotos
