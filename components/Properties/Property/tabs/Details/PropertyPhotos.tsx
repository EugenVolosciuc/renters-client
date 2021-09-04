import React, { FC } from 'react'
import Image from 'next/image'

import { Photo } from 'types/Photo'
import Carousel from 'components/misc/Carousel'

type Props = {
    photos: Photo[]
}

const PropertyPhotos: FC<Props> = ({ photos }) => {
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
