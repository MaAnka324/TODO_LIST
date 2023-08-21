import {Dispatch} from 'redux'
import {
    SetErrorType,
    setInitializedAC,
    SetInitializedType,
    setLoadingStatusAC,
    SetLoadingStatusType
} from "../app/app-reducer";
import {LoginType} from "./Login";
import {authAPI} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error.utils";
import {clearTodolistsDataAC, ClearTodolistsDataType} from "../state/todolists-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setLoadingStatusAC('loading'))
        const res = await authAPI.login(data)
        if(res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setLoadingStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        const error = e as string
        handleServerNetworkError(dispatch, error)
    }
}


export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setLoadingStatusAC('loading'))
        const res = await authAPI.me()
        if(res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setLoadingStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        const error = e as string
        handleServerNetworkError(dispatch, error)
    } finally {
        dispatch(setInitializedAC(true))
    }
}


export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setLoadingStatusAC('loading'))
        const res = await authAPI.logOut()
        if(res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setLoadingStatusAC('succeeded'))
            dispatch(clearTodolistsDataAC())
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        const error = e as string
        handleServerNetworkError(dispatch, error)
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | SetLoadingStatusType
    | SetErrorType
    | SetInitializedType
    | ClearTodolistsDataType


