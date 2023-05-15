import {TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";

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

type ActionType = RemoveTaskActionType | Action2Type

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            const stateCopy = {...state}
            const task = state[action.todolistId]
            const filteredTasks = task.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case'ADD-TASK':{
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        default: throw new Error("I don't understand" )
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
