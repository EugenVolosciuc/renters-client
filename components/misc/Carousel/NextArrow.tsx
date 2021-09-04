import React, { FC } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'

const NextArrow: FC<Record<string, any>> = ({ currentSlide, slideCount, ...props }) => {
    return <ArrowRightOutlined {...props} />
}

export default NextArrow
