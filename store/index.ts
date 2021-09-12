import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux'
import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import authReducer from 'store/auth/slice'

import { authApi } from 'store/auth/service'
import { photoApi } from 'store/photos/service'
import { propertyApi } from 'store/property/service'
import { cronApi } from 'store/cron/service'
import { contractApi } from 'store/contract/service'
import { errorHandlerMiddleware } from 'store/middleware/errorHandlerMiddleware'

export const store = configureStore({
    reducer: {
        [photoApi.reducerPath]: photoApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [propertyApi.reducerPath]: propertyApi.reducer,
        [cronApi.reducerPath]: cronApi.reducer,
        [contractApi.reducerPath]: contractApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([
            photoApi.middleware,
            authApi.middleware,
            propertyApi.middleware,
            cronApi.middleware,
            contractApi.middleware,
            errorHandlerMiddleware
        ])
    }
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector