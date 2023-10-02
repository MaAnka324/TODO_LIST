import React, {ChangeEvent, FC, useCallback} from 'react';
import EditableSpan from "./EditableSpan";
import {IconButton, List, ListItem} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TasksType} from "./api/todolist-api";
import {RequestStatusType} from "./app/app-reducer";


type TasksListPropsType = {
    todoListId: string
    tasks: TasksType[]

    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void

}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => <Task
                    key={task.id}
                    task={task}
                    entityTaskStatus={task.entityTaskStatus}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todoListId={props.todoListId}
                />
            )
            : <span>Your taskslist is empty</span>
    return (
        <List>
            {tasksItems}
        </List>
    );
};


type TaskPropsType = {
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    task: TasksType
    todoListId: string
    entityTaskStatus: RequestStatusType
}


export const Task = React.memo((props: TaskPropsType) => {

    const disable = props.entityTaskStatus === 'loading'

    const removeTask = () => props.removeTask(props.task.id, props.todoListId)
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        props.changeTaskStatus(props.task.id, status, props.todoListId)
    }

    const changeTaskTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    }, [props.task.id, props.changeTaskTitle, props.todoListId])

    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    console.log(disable)

    return (
        <ListItem key={props.task.id}>

            <Checkbox {...label} defaultChecked
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={changeStatusHandler}
                      disabled={disable}
            />
            <EditableSpan
                title={props.task.title}
                spanClasses={`task ${props.task.status ? 'task-done' : ''}`}
                changeTitle={changeTaskTitleHandler}
                disabled={disable}
            />
            <IconButton
                onClick={removeTask}
                size='small'
                disabled={disable}
            >
                <ClearIcon/>
            </IconButton>
        </ListItem>
    )
})


export default TasksList;