import React, { FC } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'

const PrevArrow: FC<Record<string, any>> = ({ currentSlide, slideCount, ...props }) => {
    return <ArrowLeftOutlined {...props} />
}

export default PrevArrow
