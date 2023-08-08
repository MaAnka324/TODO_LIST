export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    isInitialized: false,
    status: 'loading',
    error: null
}

type InitialStateType = {
    isInitialized: boolean
    status: RequestStatusType
    error: null | string
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}


export const setLoadingStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setAppErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: "APP/SET-INITIALIZED",
        isInitialized
    } as const
}

export type SetLoadingStatusType = ReturnType<typeof setLoadingStatusAC>
export type SetErrorType = ReturnType<typeof setAppErrorAC>
export type SetInitializedType = ReturnType<typeof setInitializedAC>

export type AppActionType = SetLoadingStatusType | SetErrorType | SetInitializedType


