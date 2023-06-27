import React, {ChangeEvent, FC, RefObject, useCallback, useRef, useState} from 'react';
import TasksList from "./TasksList";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
// import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
// import  {Fingerprint, HighlightOff} from '@material-ui/icons';
import {addTaskAC, changeTitleTaskAC, removeTaskAC, statusTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TasksStateType} from "./AppWithRedux";
import {Button, IconButton} from "@mui/material";
import {HighlightOff} from "@mui/icons-material";

type TodoListPropsType = {
    todoListId: string
    filter: FilterValueType
    title: string
    tasks: TaskType[]

    // removeTask : (taskId: string, todoListId: string) => void
    // addTask: (title:string, todoListId: string) => void
    // changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    // changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void

    changeTodoListFilter: (filter: FilterValueType, todoListId: string) => void
    removeTodoList: (todolistId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList: FC<TodoListPropsType> = React.memo( (props): JSX.Element => {
    console.log('TodoList is called')
    const dispatch = useDispatch()
    // const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todoListId ])
    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }
    const addTask = useCallback( (title: string) => {
        dispatch(addTaskAC(title, props.todoListId))
    }, [dispatch, props.todoListId])


    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        const action = statusTaskAC(taskId, newIsDone, todolistId)
        dispatch(action)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTitleTaskAC(taskId, newTitle, todoListId)
        dispatch(action)
    }


    const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    console.log(addTaskInput)

    // const addTask = (title: string) =>{
    //     const action = addTaskAC(title, todolistId)
    //     dispatch(action)
    // }, [)

    const setAllFilterValue = useCallback( () => props.changeTodoListFilter('All', props.todoListId), [props.changeTodoListFilter, props.todoListId])
    const setActiveFilterValue = useCallback( () => props.changeTodoListFilter('Active', props.todoListId), [props.changeTodoListFilter, props.todoListId])
    const setCompletedFilterValue = useCallback( () => props.changeTodoListFilter('Completed', props.todoListId), [props.changeTodoListFilter, props.todoListId])
    // const changeTodoListTitle = (title:string) => props.changeTodoListTitle({todlistId: props.todoListId})
    const changeTodoListTitle = useCallback( (title: string) => props.changeTodoListTitle(props.todoListId, title), [props.changeTodoListTitle, props.todoListId])

    let tasksForTodolist = props.tasks

    if (props.filter === 'Active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }


    return (
        <div className={"todolist"}>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                <IconButton
                    onClick={() => props.removeTodoList(props.todoListId)}
                    size='small'
                >
                    <DeleteIcon/>

                </IconButton>

            </h3>
            <AddItemForm maxLengthUserName={15} addItem={addTask}/>
            <TasksList
                todoListId={props.todoListId}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
            <div className='filter-buttons'>
                <Button
                    size='small'
                    variant='contained'
                    disableElevation
                    color={props.filter === 'All' ? 'primary' : 'success'}
                    // className={props.filter === 'All' ? 'active-filter' : 'filter-btn'}
                    onClick={setAllFilterValue}
                >All</Button>
                <Button
                    size='small'
                    variant='contained'
                    disableElevation
                    color={props.filter === 'Active' ? 'primary' : 'success'}
                    // className={props.filter === 'Active' ? 'active-filter' : 'filter-btn'}
                    onClick={setActiveFilterValue}
                >Active</Button>
                <Button
                    size='small'
                    variant='contained'
                    disableElevation
                    color={props.filter === 'Completed' ? 'primary' : 'success'}
                    // className={props.filter === 'Completed' ? 'active-filter' : 'filter-btn'}
                    onClick={setCompletedFilterValue}
                >Completed</Button>
            </div>
        </div>
    );
});

export default TodoList;