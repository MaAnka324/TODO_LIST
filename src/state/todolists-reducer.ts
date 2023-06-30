
import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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

// export type SetTodolistActionType = {
//     type: 'SET-TODOLIST'
//     todolists: Array<TodolistDomainType>
// }

type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsType

const initialState = [] as Array<TodolistDomainType>
type InitialStateType = typeof initialState

export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}


export const todolistsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [ {
                id: action.todolistId,
                title: action.title,
                filter: 'All',
                addedDate: '',
                order: 0
            }, ...state]
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
                    filter: "All"
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

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
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



export const getTodosTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
