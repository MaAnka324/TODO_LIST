import {TasksStateType} from "../App";

import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsType} from "./todolists-reducer";
import {ResultCode, TaskPriorities, TaskStatuses, TasksType, todolistAPI, UpdateTaskModel} from "../api/todolist-api";
import {AppRootState, AppThunk} from "./store";
import {setAppError, setLoadingStatus, SetLoadingStatusType} from "../app/app-reducer";

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

export type TasksActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusActionType
    | ChangeTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
    | ReturnType<typeof setTasksAC>
    | SetLoadingStatusType

const initialState = {} as TasksStateType
type InitialStateType = typeof initialState


export const tasksReducer = (state = initialState, action: TasksActionType): InitialStateType => {
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
            stateCopy[action.todolist.id] = []
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


export const getTasksTC = (todoId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setLoadingStatus('loading'))
        todolistAPI.getTasks(todoId)
            .then((res) => {
                dispatch(setTasksAC(todoId, res.data.items))
                dispatch(setLoadingStatus('succeeded'))
            })
    }
}

export const deleteTasksTC = (todoId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setLoadingStatus('loading'))
        todolistAPI.deleteTask(todoId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todoId))
                dispatch(setLoadingStatus('succeeded'))
            })
    }
}

export const _createTasksTC = (todoId: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setLoadingStatus('loading'))
        todolistAPI.createTask(todoId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setLoadingStatus('succeeded'))
            })
    }
}



export const createTasksTC = (todoId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setLoadingStatus('loading'))
    todolistAPI.createTask(todoId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setLoadingStatus('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppError(res.data.messages[0]))
                } else {
                    dispatch(setAppError('Some error occurred'))
                }
                dispatch(setLoadingStatus('failed'))
            }
        })
}

interface FlexType {
    title?: string
    deadline?: string
    startDate?: string
    priority?: TaskPriorities
    description?: string
    status?: TaskStatuses
}

export const updateTasksTC = (todolistId: string, taskId: string, data: FlexType): AppThunk => {
    return (dispatch, getState: () => AppRootState) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            const model = {
                title: task.title,
                deadline: task.deadline,
                startDate: task.startDate,
                priority: task.priority,
                description: task.deadline,
                status: task.status,
                ...data
            }
            dispatch(setLoadingStatus('loading'))
            todolistAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(statusTaskAC(taskId, model, todolistId))
                    dispatch(setLoadingStatus('succeeded'))
                })
        }
    }
}