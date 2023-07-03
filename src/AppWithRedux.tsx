import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {
    changeTodolistFilterAC,
    createTodolistTC,
    deleteTodolistTC,
    FilterValueType,
    getTodolistsTC,
    TodolistDomainType,
    updateTodolistTitleTC,
} from "./state/todolists-reducer";
import {createTasksTC, deleteTasksTC, updateTasksTC} from "./state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "./state/store";
import {TaskStatuses, TasksType} from "./api/todolist-api";


export type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}


function AppWithRedux() : JSX.Element{
    console.log('App is called')

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)

    useEffect( () => {
        dispatch(getTodolistsTC())
    }, [] )


    const changeTodoListFilter = useCallback( (filter: FilterValueType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback( (todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    const changeTodoListTitle = useCallback( (todoListId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todoListId, title))
    }, [dispatch])

    const addTodolist = useCallback( (title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])



    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(createTasksTC(todoListId, title))
    }, [])
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(deleteTasksTC(todolistId, taskId))
    }
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTasksTC(todolistId, taskId, {status}))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        dispatch(updateTasksTC(todoListId, taskId, {title: newTitle}))
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
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
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
