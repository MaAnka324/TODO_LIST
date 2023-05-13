import {TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST':{
            return [...state, {id: v1(), title: 'New TodolistTitle', filter: 'All'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if(todolist){
                todolist.title = action.title
            }
            return [...state]
            // return [...state, {...state[0], title: action.title}]
        }
        default: throw new Error("I don't understand" )
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}