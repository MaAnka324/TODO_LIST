export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: 'loading',
    error: null
}

type InitialStateType = {
    status: RequestStatusType
    error: null | string
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export type AppActionType = SetLoadingStatusType | SetErrorType


export const setLoadingStatus = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export type SetLoadingStatusType = ReturnType<typeof setLoadingStatus>

export const setAppError = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export type SetErrorType = ReturnType<typeof setAppError>

