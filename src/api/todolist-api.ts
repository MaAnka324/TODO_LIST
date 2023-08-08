import axios, {AxiosResponse} from 'axios'
import {RequestStatusType} from "../app/app-reducer";
import {LoginType} from "../features/Login";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b2aa0181-7c4a-4cfb-9fa0-ad8f16fa6d5f',
    },
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})


export const authAPI = {
    me() {
        return instance.get<ResponseType<UserData>>(`auth/me`)
    },
    login(data: LoginType) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, LoginType>(
            `auth/login`,
            data
        )
    },
    logOut() {
        return instance.delete<ResponseType>(`auth/login`)
    }
}

type UserData = {
    id: number
    email: string
    login: string
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
    ERROR_CAPTCHA= 10
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TasksType = TaskType &{
    entityTaskStatus: RequestStatusType
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type GetTasksResponse = {
    error: string
    totalCount: string
    items: TasksType[]
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists`,)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>(
            `todo-lists`,
            {title: title}
        )

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(
            `todo-lists/${todolistId}`,
            {title: title}
        )
    },



    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        // return instance.post<ResponseType<{item: TasksType}>>(
        //     `todo-lists/${todolistId}/tasks`,
        //     {title: title}
        // )

        return instance.post<ResponseType<{ item: TasksType }>, AxiosResponse<ResponseType<{ item: TasksType }>>, { title: string }>(
            `todo-lists/${todolistId}/tasks`,
            {title})

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)

    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
        return instance.put<ResponseType<{ item: TasksType }>, AxiosResponse<ResponseType<{ item: TasksType }>>, UpdateTaskModel>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            model
        )
    },
}



