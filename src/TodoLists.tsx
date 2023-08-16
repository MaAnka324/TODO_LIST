import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./state/store";
import {
    changeTodolistFilterAC, createTodolistTC,
    deleteTodolistTC,
    FilterValueType,
    getTodolistsTC,
    TodolistDomainType, updateTodolistTitleTC
} from "./state/todolists-reducer";
import {createTasksTC, deleteTasksTC, updateTasksTC} from "./state/tasks-reducer";
import {TaskStatuses} from "./api/todolist-api";
import TodoList from "./TodoList";
import {TasksStateType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import {Navigate} from "react-router-dom";

const TodoLists = () => {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    useEffect(() => {
        if(!isLoggedIn) return
        dispatch(getTodolistsTC())
    }, [])


    const changeTodoListFilter = useCallback((filter: FilterValueType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todoListId, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
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
        let tasksForTodolist = tasks[tl.id]


        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                entityStatus={tl.entityStatus}
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

    if(!isLoggedIn) return <Navigate to={'/login'}/>

    return (
        <div>
            <AddItemForm maxLengthUserName={15} addItem={addTodolist} className='addItemForm'/>
            <div className={'todolists'}>
                {todoListsComponents}
            </div>
        </div>
    );
};

export default TodoLists;