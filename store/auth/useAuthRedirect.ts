import { useAppSelector } from 'store'
import { USER_ROLES } from 'types/User'
import { selectAuthedUser } from 'store/auth/slice'
import { 
    redirectIfNotAuthed, 
    redirectUserBasedOnRole, 
    redirectUserBasedOnRequiredRole 
} from 'utils/userRedirects'

type AuthRule = USER_ROLES[] | boolean

// true: user has to be logged in to see this page, no login = redirect to login page
// false: user has to be logged out to see this page, logged in = redirect to page specific to user role
// USER_ROLES[]: user has to be of specified role to see this page, 
// if logged in but not specified role = redirect to page specific to user role, if not logged in = redirect to login page
export const useAuthRedirect = (authRule: AuthRule ) => {
    const isServer = typeof window === 'undefined'

    if (!isServer) {
        const user = useAppSelector(selectAuthedUser)

        switch (authRule) {
            case true: // all good here
                redirectIfNotAuthed(user)
                break
            case false: // should be good here
                redirectUserBasedOnRole(user)
                break
            default:
                redirectUserBasedOnRequiredRole(user, authRule)
                break
        }
    }
}