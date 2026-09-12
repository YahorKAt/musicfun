import {errorToast} from "@/common/utils/errorToast";
import {isErrorWithDetailArray} from "@/common/utils/isErrorWithDetailArray";
import {isErrorWithProperty} from "@/common/utils/isErrorWithProperty";
import {trimToMaxLength} from "@/common/utils/trimToMaxLength";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export const handleErrors = (error: FetchBaseQueryError) => {
    switch (error.status) {
        case 'PARSING_ERROR':
        case 'CUSTOM_ERROR':
        case 'FETCH_ERROR':
        case 'TIMEOUT_ERROR':
            errorToast(error.error)
            break
        case 400:
        case 403:
            if (isErrorWithDetailArray(error.data)) {
                errorToast(trimToMaxLength(error.data.errors[0].detail))
            } else {
                errorToast(JSON.stringify(error.data))
            }
            break

        case 404:
            if (isErrorWithProperty(error.data, 'error')) {
                errorToast(error.data.error)
            } else {
                errorToast(JSON.stringify(error.data))
            }
            break

        case 401:
        case 429:
            if (isErrorWithProperty(error.data, 'message')) {
                errorToast(error.data.message)
            } else {
                errorToast(JSON.stringify(error.data))
            }
            break

        default:
            errorToast('Some error occurred.')
    }
}
