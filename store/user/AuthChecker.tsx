import React from 'react'

import { useCheckAuthCookie } from 'store/user/useCheckAuthCookie'

const AuthChecker = () => {
    useCheckAuthCookie()

    return null
}

export default AuthChecker
