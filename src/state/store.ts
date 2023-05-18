import {combineReducers, } from "redux";
import { legacy_createStore as createStore} from 'redux'
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer"; 

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


export const store = createStore(rootReducer)
export type AppRootState = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

