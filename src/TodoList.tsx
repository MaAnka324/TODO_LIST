        import React, {ChangeEvent, FC, RefObject, useRef, useState} from 'react';
import TasksList from "./TasksList";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import ClearIcon, {HighlightOff} from '@material-ui/icons';

type TodoListPropsType = {
    todoListId: string
    filter: FilterValueType
    title: string
    tasks: TaskType[]

    removeTask : (taskId: string, todoListId: string) => void
    addTask: (title:string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void

    changeTodoListFilter: (filter: FilterValueType, todoListId: string) => void
    removeTodoList: (todolistId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props): JSX.Element => {
    // const [title, setTitle] = useState<string>("")
    // const [error, setError] = useState<boolean>(false)
    const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    console.log(addTaskInput)
    // const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     error && setError(false)
    //     setTitle((e.currentTarget.value))
    //     }

    const addTask = (title: string) =>{
        props.addTask(title, props.todoListId)
    }

    // const userMaxLength = title.length > 15 && <div style={{color: 'hotpink'}}>Task title is to long</div>
    // const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required</div>
    const setAllFilterValue = () => props.changeTodoListFilter('All', props.todoListId)
    const setActiveFilterValue = () => props.changeTodoListFilter('Active', props.todoListId)
    const setCompletedFilterValue = () => props.changeTodoListFilter('Completed', props.todoListId)

    const changeTodoListTitle = (title:string) => props.changeTodoListTitle(title, props.todoListId)

    return (
        <div className={"todolist"}>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={()=>props.removeTodoList(props.todoListId)}>x</button>*/}
                <IconButton
                    onClick={()=>props.removeTodoList(props.todoListId)}
                    size='small'
                >
                    <HighlightOff/>
                </IconButton>
            </h3>
            <AddItemForm maxLengthUserName={15} addItem={addTask}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        value={title}*/}
            {/*        placeholder='Please, enter title'*/}
            {/*        onChange={changeLocalTitle}*/}
            {/*        onKeyDown={(e)=> e.key  === 'Enter' && addTask()}/>*/}
            {/*    <button disabled={title.trim().length === 0} onClick={addTask}>+</button>*/}
            {/*    {userMaxLength}*/}
            {/*    {userErrorMessage}*/}
            {/*</div>*/}
            <TasksList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
            <div>
                <Button
                    size='small'
                    variant='contained'
                    disableElevation
                    color={props.filter === 'All' ? 'secondary' : 'primary'}
                    className={props.filter === 'All' ? 'active-filter' : 'filter-btn'}
                    onClick={setAllFilterValue}
                >All</Button>
                <Button
                    size='small'
                    variant='contained'
                    disableElevation
                    color={props.filter === 'Active' ? 'secondary' : 'primary'}
                    className={props.filter === 'Active' ? 'active-filter' : 'filter-btn'}
                    onClick={setActiveFilterValue}
                >Active</Button>
                <Button
                    size='small'
                    variant='contained'
                    disableElevation
                    color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                    className={props.filter === 'Completed' ? 'active-filter' : 'filter-btn'}
                    onClick={setCompletedFilterValue}
                >Completed</Button>
            </div>
        </div>
    );
};

export default TodoList;