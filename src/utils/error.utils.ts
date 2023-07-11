import {setAppError, SetErrorType, setLoadingStatus, SetLoadingStatusType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";


export const handleServerAppError = <T> (dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setLoadingStatus('failed'))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: string ) => {
    dispatch(setAppError(error))
    dispatch(setLoadingStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetLoadingStatusType | SetErrorType>