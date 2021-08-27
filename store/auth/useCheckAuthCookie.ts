import { useEffect } from 'react'

import { useCheckAuthQuery } from 'store/auth/service'
import { User } from 'types/User'
import { redirectUserBasedOnRole } from 'utils/userRedirects'
import { useAppDispatch } from 'store'
import { setUser } from 'store/auth/slice'

export const useCheckAuthCookie = () => {
    const dispatch = useAppDispatch()
    const { data: user } = useCheckAuthQuery(null)

    useEffect(() => {
        if (user) dispatch(setUser({ user: user as User }))
        // redirectUserBasedOnRole(user as User | null)
    }, [user])
}