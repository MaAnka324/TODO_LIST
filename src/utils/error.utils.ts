import {setAppErrorAC, SetErrorType, setLoadingStatusAC, SetLoadingStatusType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";


export const handleServerAppError = <T> (dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setLoadingStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: string ) => {
    dispatch(setAppErrorAC(error))
    dispatch(setLoadingStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetLoadingStatusType | SetErrorType>