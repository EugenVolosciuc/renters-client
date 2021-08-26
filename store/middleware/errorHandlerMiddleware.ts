import Router from 'next/router'
import {
    MiddlewareAPI,
    isRejectedWithValue,
    Middleware,
} from '@reduxjs/toolkit'
import { message } from 'antd'


const isDevel = process.env.NODE_ENV === "development"

export const errorHandlerMiddleware: Middleware = (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
        const errorMessage = action.payload.data?.error || action.payload.data?.message || 'An error occured'

        if (isDevel) console.error("Caught in redux middleware", action.payload)

        if (action.payload.status === 401) Router.push('/auth/login')

        if (typeof errorMessage === "string") {
            message.error(errorMessage)
        }
    }

    return next(action)
}