import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux'
import { configureStore, combineReducers, Action, AnyAction, Reducer, ThunkAction } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import authReducer from 'store/auth/slice'

import { baseApi } from 'store/baseApi'
import { errorHandlerMiddleware } from 'store/middleware/errorHandlerMiddleware'

export const STORE_RESET_ACTION_TYPE = 'RESET_STORE'

const combinedReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer
})

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === STORE_RESET_ACTION_TYPE) {
        state = {} as RootState
    }
    return combinedReducer(state, action)
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([
            baseApi.middleware,
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