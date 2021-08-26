import Router from 'next/router'
import { User, USER_ROLES } from "types/User"

export const redirectIfNotAuthed = (user: User | null): boolean => {
    let shouldBeRedirected = false

    if (!user) {
        Router.push('/auth/login')
        shouldBeRedirected = true
    }

    return shouldBeRedirected
}

export const redirectUserBasedOnRole = (user: User | null) => {
    if (user) {
        switch (user.role) {
            case USER_ROLES.PROPERTY_ADMIN:
                Router.push('/app/properties')
                break
            case USER_ROLES.RENTER:
                Router.push('/app/properties')
                break
            case USER_ROLES.SUPER_ADMIN:
                Router.push('/app/properties')
        }
    }
}

export const redirectUserBasedOnRequiredRole = (user: User | null, roles: USER_ROLES[]) => {
    const shouldBeRedirected = redirectIfNotAuthed(user)

    if (shouldBeRedirected) return

    if (!roles.includes((user as User).role)) {
        redirectUserBasedOnRole(user)
    }
}