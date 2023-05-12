import {TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string] : any
}

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