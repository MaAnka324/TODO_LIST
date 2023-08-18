import {ResultCode, todolistAPI, TodolistType} from "../api/todolist-api";
import {AppRootState, AppThunk} from "./store";
import {RequestStatusType, setAppErrorAC, setLoadingStatusAC, SetLoadingStatusType} from "../app/app-reducer";
import {handleServerAppError} from "../utils/error.utils";
import {getTasksTC} from "./tasks-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

export type TodolistsActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsType
    | SetLoadingStatusType
    | ReturnType<typeof changeEntityStatusAC>

const initialState = [] as Array<TodolistDomainType>
type InitialStateType = typeof initialState

export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}


export const todolistsReducer = (state = initialState, action: TodolistsActionType): InitialStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {
                ...action.todolist,
                filter: "All",
                entityStatus: 'idle'
            }
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const stateCopy = [...state]
            const todolist = stateCopy.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return stateCopy

            // return state.map(todolist => todolist.id === action.id ? {
            //     ...todolist,
            //     title: action.title
            // } : todolist)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            // const stateCopy = [...state]
            // const todolist = stateCopy.find(tl => tl.id === action.id)
            // if (todolist) {
            //     todolist.filter = action.filter
            // }
            // return stateCopy

            return state.map(todolist => todolist.id === action.id ? {
                ...todolist,
                filter: action.filter
            } : todolist)
        }
        case "SET-TODOLIST": {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: "All",
                    entityStatus: 'idle'
                }
            })
        }
        case "CHANGE-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.todoId
                ? {...tl, entityStatus: action.entityStatus}
                : tl)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    }
}

export const changeEntityStatusAC = (todoId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'CHANGE-ENTITY-STATUS',
        todoId,
        entityStatus
    } as const
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    }
}

export type SetTodolistsType = ReturnType<typeof setTodolistsAC>

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLIST',
        todolists
    } as const
}


export type ClearTodolistsDataType = ReturnType<typeof setTodolistsAC>

export const clearTodolistsDataAC = () => {
    return {
        type: 'CLEAR-DATA'
    } as const
}


export const getTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                return res.data
            })
            .then((todos) => {
                console.log(todos)
                todos.forEach((tl) => {
                    dispatch(getTasksTC(tl.id))
                })
            })
    }
}

export const _getTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.getTodolist()
        dispatch(setTodolistsAC(res.data))
        dispatch(setLoadingStatusAC('succeeded'))
    } catch (e) {
        throw new Error()
    }
}

export const deleteTodolistTC = (todoId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        dispatch(changeEntityStatusAC(todoId, 'loading'))
        todolistAPI.deleteTodolist(todoId)
            .then((res) => {
                dispatch(removeTodolistAC(todoId))
                dispatch(setLoadingStatusAC('succeeded'))
            })
            .catch(() => {
                dispatch(changeEntityStatusAC(todoId, 'failed'))
                dispatch(setLoadingStatusAC('failed'))
                dispatch(setAppErrorAC('Something wrong, return later'))
            })
    }
}

export const createTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setLoadingStatusAC('succeeded'))
                } else {
                    handleServerAppError<{ item: TodolistType }>(dispatch, res.data)
                }
            })
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch, getState: () => AppRootState) => {

        const todolist = getState().todolists.find(tl => tl.id === todolistId)

        if (todolist) {
            dispatch(setLoadingStatusAC('loading'))
            todolistAPI.updateTodolist(todolistId, title)
                .then((res) => {
                    dispatch(changeTodolistTitleAC(todolistId, title))
                    dispatch(setLoadingStatusAC('succeeded'))
                })
        }
    }
}