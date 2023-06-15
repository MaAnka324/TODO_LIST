import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.createTodolist('SOME NEW TITLE>>>>>><<<<<<<')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = "19478f5c-39fa-41b8-a6e8-f0ef6bc5c391"

        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "1cb104d5-a54e-464f-bddc-e0de827fcf7a"
        // axios
        //     .put(
        //         `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
        //         {title: 'REACT>>>>>>>>>>>>>>>>>>>'},
        //         settings
        //     )
        //     .then((res) => {
        //         setState(res.data)
        //     })
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1cb104d5-a54e-464f-bddc-e0de827fcf7a'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1cb104d5-a54e-464f-bddc-e0de827fcf7a'
        todolistAPI.createTask(todolistId, '<<<<Anna Task>>>>')
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1cb104d5-a54e-464f-bddc-e0de827fcf7a'
        const taskId = '02fd360b-3740-43f8-b527-8a6a2cb85ff0'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1cb104d5-a54e-464f-bddc-e0de827fcf7a'
        const taskId = '7321c160-ac88-4ec0-9741-ac3c7d570486'
        todolistAPI.updateTask(todolistId, taskId, 'NEW TASK)))))))))')
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

