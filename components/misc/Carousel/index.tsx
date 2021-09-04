import React, { FC } from 'react'
import { Carousel as AntCarousel } from 'antd'

import PrevArrow from 'components/misc/Carousel/PrevArrow'
import NextArrow from 'components/misc/Carousel/NextArrow'

type Props = {
    arrows?: boolean
}

// https://stackoverflow.com/questions/63638782/how-to-solve-warning-react-does-not-recognize-the-currentslide-slidecount
const Carousel: FC<Props> = ({ children, arrows = true }) => {
    return (
        <AntCarousel 
            arrows={arrows} 
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
        >
            {children}
        </AntCarousel>
    )
}

export default Carousel
