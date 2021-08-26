import React, { FC } from 'react'
import { Skeleton, SkeletonProps } from 'antd'

import { useAppSelector } from 'store'
import { selectAuthedUser } from 'store/auth/slice'

type Props = {
    loaderProps?: SkeletonProps
}

const defaultLoaderProps: SkeletonProps = {
    title: { width: 150 },
    paragraph: { rows: 0 },
    active: true
}

const UserLoader: FC<Props> = ({ children, loaderProps = defaultLoaderProps }) => {
    const user = useAppSelector(selectAuthedUser)

    if (user) return <>{children}</>

    return <Skeleton  {...loaderProps} />
}

export default UserLoader
