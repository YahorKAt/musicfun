import {baseQueryWithReauth} from "@/app/api/baseQueryWithReauth";
import {createApi} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['PlayList', 'Tracks', 'Auth'],
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    // skipSchemaValidation: process.env.NODE_ENV !== 'production',
    // keepUnusedDataFor: 30,
    // refetchOnFocus: true,
    // refetchOnReconnect: true,
})