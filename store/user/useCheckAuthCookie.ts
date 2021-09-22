import { useEffect } from 'react'

import { useCheckAuthQuery } from 'store/user/service'
import { User } from 'types/User'
import { useAppDispatch } from 'store'
import { setUser } from 'store/user/slice'

export const useCheckAuthCookie = () => {
    const dispatch = useAppDispatch()
    const { data: user } = useCheckAuthQuery()

    useEffect(() => {
        if (user) dispatch(setUser({ user: user as User }))
    }, [user])
}