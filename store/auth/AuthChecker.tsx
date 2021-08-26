import React from 'react'

import { useCheckAuthCookie } from 'store/auth/useCheckAuthCookie'

const AuthChecker = () => {
    useCheckAuthCookie()

    return null
}

export default AuthChecker
