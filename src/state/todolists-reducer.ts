import {todolistAPI, TodolistType} from "../api/todolist-api";
import {AppActionsType, AppRootState, AppThunk} from "./store";
import {RequestStatusType, setLoadingStatus, SetLoadingStatusType} from "../app/app-reducer";

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




export const _getTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const getTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.getTodolist()
        dispatch(setTodolistsAC(res.data))
        dispatch(setLoadingStatus('succeeded'))
    }
    catch (e) {
        throw new Error()
    }
}

export const deleteTodolistTC = (todoId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setLoadingStatus('loading'))
        todolistAPI.deleteTodolist(todoId)
            .then((res) => {
                dispatch(removeTodolistAC(todoId))
                dispatch(setLoadingStatus('succeeded'))
            })
    }
}

export const createTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setLoadingStatus('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setLoadingStatus('succeeded'))
            })
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch, getState: () => AppRootState) => {

        const todolist = getState().todolists.find(tl => tl.id === todolistId)

        if (todolist) {
            dispatch(setLoadingStatus('loading'))
            todolistAPI.updateTodolist(todolistId, title)
                .then((res) => {
                    dispatch(changeTodolistTitleAC(todolistId, title))
                    dispatch(setLoadingStatus('succeeded'))
                })
        }
    }
}