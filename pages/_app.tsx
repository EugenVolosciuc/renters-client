import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import AuthChecker from 'store/auth/AuthChecker'
import { store } from 'store'
import 'styles/fonts.css'

require('styles/antd-overrides.less')

dayjs.extend(relativeTime)

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AuthChecker />
            <Component {...pageProps} />
        </Provider>
    )
}
export default appWithTranslation(MyApp)
