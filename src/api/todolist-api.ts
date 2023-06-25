import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7d3c398b-2b30-4da2-a118-f5a83f07d318',
    },
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

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

export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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
    // completed: required(boolean)
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
        return instance.post<ResponseType<{ item: TodolistType }>>(
            `todo-lists`,
            {title: title}
        )

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title}
        )
    },


    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseType>(
            `todo-lists/${todolistId}/tasks`,
            {title: title}
        )
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)

    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            model
        )
    },
}



