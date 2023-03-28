import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";
import EditableSpan from "./EditableSpan";
import ClearIcon, {HighlightOff} from '@material-ui/icons';
import {IconButton, List, ListItem} from "@material-ui/core";

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask : (taskId: string,  todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,  todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void

}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task)=> {

                const removeTask = () => props.removeTask(task.id, props.todoListId)
                const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)

                const changeTaskTitleHandler = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.todoListId)
                }

                return (
                    <ListItem key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeStatusHandler}
                        />

                        <EditableSpan
                            title={task.title}
                            spanClasses={`task ${task.isDone ? 'task-done' : ''}`}
                            changeTitle={changeTaskTitleHandler}
                        />
                        <IconButton
                            onClick={removeTask}
                            size='small'
                        >
                            <HighlightOff/>
                        </IconButton>

                    </ListItem>
                )
            })
            : <span>Your taskslist is empty</span>
    return (
        <List>
            {tasksItems}
        </List>
    );
};

export default TasksList;