import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTitleTaskAC, removeTaskAC, statusTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

// const Fake = React.memo((props:any) => {
//     console.log('Fake is called')
//     return <h1>{props.count}</h1>
// })

function AppWithRedux() : JSX.Element{
    console.log('App is called')
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    console.log('todoLists', todoLists)

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


    // const getFilteredTasks = (tasks:Array<TaskType>, filter: FilterValueType) => {
    //     switch (filter){
    //         case 'Active':
    //             return tasks.filter(t => t.isDone === false)
    //         case 'Completed':
    //             return tasks.filter(t => t.isDone === true)
    //         default:
    //             return tasks
    //     }
    // }

    const todoListsComponents = todoLists.map(tl => {
        // const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        let allTodolistTasks = tasks[tl.id]
        let tasksForTodolist = allTodolistTasks




        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                // tasks={filteredTasks}
                tasks={tasksForTodolist}
                filter={tl.filter}

                // addTask={addTask}
                // removeTask={removeTask}
                // changeTaskTitle={changeTaskTitle}
                // changeTaskStatus={changeTaskStatus}

                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm maxLengthUserName={15} addItem={addTodolist}/>
            {todoListsComponents}
        </div>
    )
}

export default AppWithRedux;
