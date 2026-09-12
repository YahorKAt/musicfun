import {baseApi} from "@/app/api/baseApi";
import type {MeResponse} from "@/features/auth/api/authApi.types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<MeResponse, void>({
            query: () => 'auth/me',
            providesTags: ['PlayList'],
        }),
    })
})

export const {useGetMeQuery} = authApi