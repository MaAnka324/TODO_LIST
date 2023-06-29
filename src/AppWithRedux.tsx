import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistsThunk, FilterValueType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTitleTaskAC, removeTaskAC, statusTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootState, useAppDispatch} from "./state/store";
import {TaskStatuses, TasksType, todolistAPI} from "./api/todolist-api";


export type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}


function AppWithRedux() : JSX.Element{
    console.log('App is called')
    const dispatch = useAppDispatch()
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    useEffect( () => {
        dispatch(fetchTodolistsThunk())
    }, [] )



    const changeTodoListFilter = useCallback( (filter: FilterValueType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback( (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback( (todoListId: string, title: string) => {
        const action = changeTodolistTitleAC(todoListId, title)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback( (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])



    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        const action = statusTaskAC(taskId, status, todolistId)
        dispatch(action)
    }




    const todoListsComponents = todoLists.map(tl => {
        // const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        let allTodolistTasks = tasks[tl.id]
        let tasksForTodolist = allTodolistTasks

        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                filter={tl.filter}
                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
                changeTodoListTitle={changeTodoListTitle}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm maxLengthUserName={15} addItem={addTodolist} className='addItemForm'/>
            <div className={'todolists'}>
                {todoListsComponents}
            </div>
        </div>
    )
}

export default AppWithRedux;
