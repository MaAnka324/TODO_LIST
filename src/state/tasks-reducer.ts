import {TasksStateType} from "../App";
import {v1} from "uuid";

import {
    AddTodolistActionType,
    RemoveTodolistActionType, setTodolistsAC,
    SetTodolistsType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TasksType, todolistAPI, UpdateTaskModel} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TasksType
}

type ChangeStatusActionType = {
    type: 'CHANGE-STATUS-TASK',
    model: UpdateTaskModel,
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
    | AddTaskActionType
    | ChangeStatusActionType
    | ChangeTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
    | ReturnType<typeof setTasksAC>

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
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'CHANGE-STATUS-TASK': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId
                ? {...t, ...action.model}
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
        case "SET-TASKS": {
            return {
                ...state,
                [action.todoId]: action.tasks
            }
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

export const addTaskAC = (task: TasksType): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        task
    }
}

export const statusTaskAC = (taskId: string, model: UpdateTaskModel, todolistId: string): ChangeStatusActionType => {
    return {
        type: 'CHANGE-STATUS-TASK',
        model,
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

export const setTasksAC = (todoId: string, tasks: TasksType[]) => {
    return {
        type: 'SET-TASKS',
        todoId,
        tasks
    } as const
}



export const getTasksTC = (todoId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todoId)
            .then((res) => {
                dispatch(setTasksAC(todoId, res.data.items))
            })
    }
}

export const deleteTasksTC = (todoId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todoId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todoId))
            })
    }
}

export const createTasksTC = (todoId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todoId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

interface FlexType  {
    title?: string
    deadline?: string
    startDate?: string
    priority?: TaskPriorities
    description?: string
    status?: TaskStatuses
}

export const updateTasksTC = (todolistId: string, taskId: string, data: FlexType) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if(task) {
            const model = {
                title: task.title,
                deadline: task.deadline,
                startDate: task.startDate,
                priority: task.priority,
                description: task.deadline,
                status: task.status,
                ...data
            }
            todolistAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(statusTaskAC(taskId, model, todolistId))
                })
        }
    }
}