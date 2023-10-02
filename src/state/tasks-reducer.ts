
import {
    AddTodolistActionType,
    ClearTodolistsDataType,
    RemoveTodolistActionType,
    SetTodolistsType
} from "./todolists-reducer";
import {ResultCode, TaskPriorities, TaskStatuses, TasksType, todolistAPI, UpdateTaskModel} from "../api/todolist-api";
import {AppRootState, AppThunk} from "./store";
import {RequestStatusType, setAppErrorAC, setLoadingStatusAC, SetLoadingStatusType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error.utils";
import axios, {AxiosError} from "axios";

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
    | ReturnType<typeof changeEntityTaskStatusAC>
    | SetLoadingStatusType
    | ClearTodolistsDataType

const initialState = {} as TasksStateType
type InitialStateType = typeof initialState

export type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}


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
                [action.todoId]: action.tasks.map(el => {
                    return { ...el, entityTaskStatus: 'idle'  }
                })
            }
        }
        case "CHANGE-ENTITY-TASK-STATUS": {
            const stateCopy = {...state}
            const task = stateCopy[action.todoId]
            stateCopy[action.todoId] = task.map(t => t.id === action.taskId
            ? {...t, entityTaskStatus: action.entityStatus}
            : t)
            return stateCopy
        }
        case "CLEAR-DATA": {
            return {}
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
export const changeEntityTaskStatusAC = (todoId: string, taskId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'CHANGE-ENTITY-TASK-STATUS',
        todoId,
        taskId,
        entityStatus
    } as const
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
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.getTasks(todoId)
            .then((res) => {
                dispatch(setTasksAC(todoId, res.data.items))
                dispatch(setLoadingStatusAC('succeeded'))
            })
    }
}

export const deleteTasksTC = (todoId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        dispatch(changeEntityTaskStatusAC(todoId, taskId, 'loading'))
        todolistAPI.deleteTask(todoId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todoId))
                dispatch(setLoadingStatusAC('succeeded'))
            })
            .catch(() => {
                dispatch(changeEntityTaskStatusAC(todoId, taskId, 'failed'))
            })
    }
}

export const _createTasksTC = (todoId: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setLoadingStatusAC('loading'))
        todolistAPI.createTask(todoId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setLoadingStatusAC('succeeded'))
            })
    }
}

type ErrorType = {
    'statusCode': number
    'message': string[]
    'error': string
}

export const createTasksTC = (todoId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.createTask(todoId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setLoadingStatusAC('succeeded'))
            } else {
                handleServerAppError<{ item: TasksType }>(dispatch, res.data)
            }
        })
        .catch((e: AxiosError<ErrorType>) => {
            const err = e.response ? e.response.data.message[0] : e.message
            handleServerNetworkError(dispatch, err)
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

export const updateTasksTC = (todolistId: string, taskId: string, data: FlexType): AppThunk =>
    async (dispatch, getState: () => AppRootState) => {

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
            dispatch(setLoadingStatusAC('loading'))
            dispatch(changeEntityTaskStatusAC(todolistId, taskId, 'loading'))

            try {
                const res = await todolistAPI.updateTask(todolistId, taskId, model)
                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(statusTaskAC(taskId, model, todolistId))
                    dispatch(setLoadingStatusAC('succeeded'))
                    dispatch(changeEntityTaskStatusAC(todolistId, taskId, 'succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))
                    }
                    dispatch(setLoadingStatusAC('failed'))
                }
            } catch (e) {
                let errorMessage: string
                if(axios.isAxiosError<ErrorType>(e)) {
                    // isAxiosError проверяет или этот error был сгенерирован
                    // при axios запросе либо при синхронном коде // true or false
                    errorMessage = e.response!.data.message[0]
                } else {
                    errorMessage = (e as Error).message
                }
                handleServerNetworkError(dispatch, errorMessage)
            }

            // todolistAPI.updateTask(todolistId, taskId, model)
            //     .then((res) => {
            //         if (res.data.resultCode === ResultCode.SUCCESS) {
            //             dispatch(statusTaskAC(taskId, model, todolistId))
            //             dispatch(setLoadingStatus('succeeded'))
            //         } else {
            //             if (res.data.messages.length) {
            //                 dispatch(setAppError(res.data.messages[0]))
            //             } else {
            //                 dispatch(setAppError('Some error occurred'))
            //             }
            //             dispatch(setLoadingStatus('failed'))
            //         }
            //
            //     })
            //     .catch((e) => {
            //         handleServerNetworkError(dispatch, e)
            //     })
        }

    }