import {TasksStateType} from "../App";
import {v1} from "uuid";

import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TasksType} from "../api/todolist-api";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type Action2Type = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

type ChangeStatusActionType = {
    type: 'CHANGE-STATUS-TASK',
    status: TaskStatuses,
    todolistId: string
    taskId: string
}

type ChangeTitleActionType = {
    type: 'CHANGE-TITLE-TASK',
    title: string,
    todolistId: string
    taskId: string
}

type ActionType = RemoveTaskActionType
    | Action2Type
    | ChangeStatusActionType
    | ChangeTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType

const initialState = {} as TasksStateType
type InitialStateType = typeof initialState


export const tasksReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const task = state[action.todolistId]
            const filteredTasks = task.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask: TasksType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-STATUS-TASK': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId
                ? {...t, status: action.status}
                : t)
            return stateCopy
        }
        case 'CHANGE-TITLE-TASK': {
            const tasksForUpdate = state[action.todolistId]
            state[action.todolistId] = tasksForUpdate.map(t => t.id === action.taskId
                ? {...t, title: action.title}
                : t)
            return ({...state})
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLIST": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    }
}

export const addTaskAC = (title: string, todolistId: string): Action2Type => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    }
}

export const statusTaskAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeStatusActionType => {
    return {
        type: 'CHANGE-STATUS-TASK',
        status,
        todolistId,
        taskId
    }
}

export const changeTitleTaskAC = (taskId: string, title: string, todolistId: string): ChangeTitleActionType => {
    return {
        type: 'CHANGE-TITLE-TASK',
        title,
        todolistId,
        taskId
    }
}