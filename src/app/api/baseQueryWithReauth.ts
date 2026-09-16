import {baseApi} from "@/app/api/baseApi";
import {baseQuery} from "@/app/api/baseQuery";
import {AUTH_KEYS} from '@/common/constants'
import {handleErrors, isTokens} from '@/common/utils'
import {type BaseQueryFn, type FetchArgs, type FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import {Mutex} from 'async-mutex'

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args, api, extraOptions) => {

    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken)

                const refreshResult = await baseQuery(
                    {url: '/auth/refresh', method: 'post', body: {refreshToken}},
                    api,
                    extraOptions
                )

                if (refreshResult.data && isTokens(refreshResult.data)) {
                    localStorage.setItem(AUTH_KEYS.refreshToken, refreshResult.data.refreshToken)
                    localStorage.setItem(AUTH_KEYS.accessToken, refreshResult.data.accessToken)
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    // @ts-expect-error
                    api.dispatch(baseApi.endpoints.logout.initiate())
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }

    if (result.error && result.error.status !== 401) {
        handleErrors(result.error)
    }

    return result
}