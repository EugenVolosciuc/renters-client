import { createContext, useContext, useEffect } from 'react'

import { RENTERS_SIDER_IS_OPEN } from 'constants/SIDER'

export type SiderContextType = {
    siderIsOpen: boolean;
    setSiderIsOpen: (isOpen: boolean) => void;
}

export const SiderContext = createContext<SiderContextType>({ siderIsOpen: true, setSiderIsOpen: isOpen => console.warn('No sider state provided') })
export const useSider = () => {
    const { siderIsOpen, setSiderIsOpen } = useContext(SiderContext)

    const toggleSider = () => {
        setSiderIsOpen(!siderIsOpen)
        window.localStorage.setItem(RENTERS_SIDER_IS_OPEN, String(!siderIsOpen))
    }

    useEffect(() => {
        const siderStateFromLocalStorage = window.localStorage.getItem(RENTERS_SIDER_IS_OPEN)

        if (siderStateFromLocalStorage !== null) setSiderIsOpen(siderStateFromLocalStorage === 'true')
    }, [setSiderIsOpen])

    return { siderIsOpen, toggleSider }
}