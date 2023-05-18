import {TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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
    isDone: boolean,
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
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-STATUS-TASK': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            // const tasksForUpdate = stateCopy[action.todolistId]
            // const updatedTasks = tasksForUpdate.find(t => t.id === action.taskId)
            // if (updatedTasks) {
            //     updatedTasks.isDone = action.isDone
            // }
            return stateCopy
        }
        case 'CHANGE-TITLE-TASK': {
            const stateCopy = {...state}
            const tasksForUpdate = stateCopy[action.todolistId]
            const updatedTasks = tasksForUpdate.find(t => t.id === action.taskId)
            if (updatedTasks) {
                updatedTasks.title = action.title
            }
            return stateCopy
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

export const statusTaskAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
    return {
        type: 'CHANGE-STATUS-TASK',
        isDone,
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