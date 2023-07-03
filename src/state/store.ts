import {AnyAction, applyMiddleware, combineReducers,} from "redux";
import { legacy_createStore as createStore} from 'redux'
import {TodolistsActionType, todolistsReducer} from "./todolists-reducer";
import {TasksActionType, tasksReducer} from "./tasks-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppDispatchType = ThunkDispatch<AppRootState, any, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

export type AppActionsType = TodolistsActionType | TasksActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

export type AppRootState = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

