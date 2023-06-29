import React, {ChangeEvent, FC, useCallback} from 'react';
import EditableSpan from "./EditableSpan";
import {IconButton, List, ListItem} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TasksType} from "./api/todolist-api";


type TasksListPropsType = {
    todoListId: string
    tasks: TasksType[]
    removeTask : (taskId: string,  todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses,  todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void

}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task)=> <Task
                    key={task.id}
                    task={task}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todoListId={props.todoListId}
                />

                // const removeTask = () => props.removeTask(task.id, props.todoListId)
                // const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                //
                // const changeTaskTitleHandler = (title: string) => {
                //     props.changeTaskTitle(task.id, title, props.todoListId)
                // }
                //
                // return (
                //     <ListItem key={task.id}>
                //         <input
                //             type="checkbox"
                //             checked={task.isDone}
                //             onChange={changeStatusHandler}
                //         />
                //
                //         <EditableSpan
                //             title={task.title}
                //             spanClasses={`task ${task.isDone ? 'task-done' : ''}`}
                //             changeTitle={changeTaskTitleHandler}
                //         />
                //         <IconButton
                //             onClick={removeTask}
                //             size='small'
                //         >
                //             <HighlightOff/>
                //         </IconButton>
                //
                //     </ListItem>
                // )
            )
            : <span>Your taskslist is empty</span>
    return (
        <List>
            {tasksItems}
        </List>
    );
};


type TaskPropsType = {
    removeTask : (taskId: string,  todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses,  todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    task: TasksType
    todoListId: string
}


export const Task = React.memo( (props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.task.id, props.todoListId)
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
         const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;

        props.changeTaskStatus(props.task.id, status, props.todoListId)
    }

    const changeTaskTitleHandler = useCallback( (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    }, [props.task.id, props.changeTaskTitle, props.todoListId])

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <ListItem key={props.task.id}>

            <Checkbox {...label} defaultChecked
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={changeStatusHandler}
            />
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    checked={props.task.isDone}*/}
            {/*    onChange={changeStatusHandler}*/}
            {/*/>*/}

            <EditableSpan
                title={props.task.title}
                spanClasses={`task ${props.task.status ? 'task-done' : ''}`}
                changeTitle={changeTaskTitleHandler}
            />
            <IconButton
                onClick={removeTask}
                size='small'
            >
                <ClearIcon/>
            </IconButton>

        </ListItem>
    )

})


export default TasksList;