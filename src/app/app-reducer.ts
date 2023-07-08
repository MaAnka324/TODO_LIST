
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

type InitialStateType = typeof initialState



export const appReducer = (state: InitialStateType, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return {...state}
    }
}


export const setLoadingStatus = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    }
}

type SetLoadingStatusType = ReturnType<typeof setLoadingStatus>

type AppActionsType = SetLoadingStatusType