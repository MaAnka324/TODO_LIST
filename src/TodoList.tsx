import React, {FC, RefObject, useCallback, useEffect, useRef} from 'react';
import TasksList from "./TasksList";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {getTasksTC} from "./state/tasks-reducer";
import {Button, IconButton} from "@mui/material";
import {FilterValueType} from "./state/todolists-reducer";
import {TaskStatuses, TasksType} from "./api/todolist-api";
import {useAppDispatch} from "./state/store";
import {RequestStatusType} from "./app/app-reducer";

type TodoListPropsType = {
    todoListId: string
    filter: FilterValueType
    title: string
    tasks: TasksType[]
    entityStatus: RequestStatusType

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void

    changeTodoListFilter: (filter: FilterValueType, todoListId: string) => void
    removeTodoList: (todolistId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }


const TodoList: FC<TodoListPropsType> = React.memo((props): JSX.Element => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.todoListId))
    }, [])

    // const dispatch = useDispatch()
    // const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todoListId ])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const removeTask = (taskId: string, todolistId: string) => {
        props.removeTask(taskId, todolistId)
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        props.changeTaskTitle(taskId, newTitle, todoListId)
    }

    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        props.changeTaskStatus(taskId, status, todolistId)
    }


    const addTaskInput: RefObject<HTMLInputElement> = useRef(null)

    const setAllFilterValue = useCallback(() => props.changeTodoListFilter('All', props.todoListId), [props.changeTodoListFilter, props.todoListId])
    const setActiveFilterValue = useCallback(() => props.changeTodoListFilter('Active', props.todoListId), [props.changeTodoListFilter, props.todoListId])
    const setCompletedFilterValue = useCallback(() => props.changeTodoListFilter('Completed', props.todoListId), [props.changeTodoListFilter, props.todoListId])
    // const changeTodoListTitle = (title:string) => props.changeTodoListTitle({todlistId: props.todoListId})
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(props.todoListId, title), [props.changeTodoListTitle, props.todoListId])

    let tasksForTodolist = props.tasks

    if (props.filter === 'Active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    return (
        <div className={"todolist"}>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                <IconButton
                    onClick={() => props.removeTodoList(props.todoListId)}
                    size='small'
                    disabled={props.entityStatus === 'loading'}
                >
                    <DeleteIcon/>
                </IconButton>

            </h3>
            <AddItemForm
                maxLengthUserName={15}
                addItem={addTask}
                disabled={props.entityStatus === 'loading'}
            />
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