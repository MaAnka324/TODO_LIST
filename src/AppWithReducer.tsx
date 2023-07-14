import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {FilterValueType, todolistsReducer} from "./state/todolists-reducer";
import {tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TasksType} from "./api/todolist-api";


export type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}

function AppWithReducer(): JSX.Element {
    const todolistId_1 = v1()
    const todolistId_2 = v1()


    const [todoLists, dispatchTodoListsReducer] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: "What to learn", filter: 'All',  entityStatus: "idle",
            addedDate: '', order: 0},
        {id: todolistId_2, title: "What to buy", filter: 'All',  entityStatus: "idle",
            addedDate: '', order: 0},
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId_1]: [
            {
                id: v1(), title: "HTML & CSS", entityTaskStatus: 'idle',
                status: TaskStatuses.New, todoListId: todolistId_1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "ES6 & TS", entityTaskStatus: 'idle',
                status: TaskStatuses.Completed, todoListId: todolistId_1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "React & Redux", entityTaskStatus: 'idle',
                status: TaskStatuses.Completed, todoListId: todolistId_1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Hi, description: ''
            },
        ],
        [todolistId_2]: [
            {
                id: v1(), title: "MILK", entityTaskStatus: 'idle',
                status: TaskStatuses.Completed, todoListId: todolistId_2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "BREAD", entityTaskStatus: 'idle',
                status: TaskStatuses.New, todoListId: todolistId_2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ]
    })


    // const removeTask = (taskId: string, todolistId: string) => {
    //     const action = removeTaskAC(taskId, todolistId)
    //     dispatchToTasksReducer(action)
    // }
    // const addTask = (title: string, todolistId: string) => {
    //     const action = addTaskAC(todolistId, title)
    //     dispatchToTasksReducer(action)
    // }
    // const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
    //     const action = statusTaskAC(taskId, status, todolistId)
    //     dispatchToTasksReducer(action)
    // }
    // const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
    //     const action = changeTitleTaskAC(taskId, newTitle, todoListId)
    //     dispatchToTasksReducer(action)
    // }


    // const changeTodoListFilter = (filter: FilterValueType, todolistId: string) => {
    //     const action = changeTodolistFilterAC(todolistId, filter)
    //     dispatchTodoListsReducer(action)
    // }
    // const removeTodoList = (todolistId: string) => {
    //     const action = removeTodolistAC(todolistId)
    //     dispatchTodoListsReducer(action)
    //     dispatchToTasksReducer(action)
    // }
    // const changeTodoListTitle = (todoListId: string, title: string) => {
    //     const action = changeTodolistTitleAC(todoListId, title)
    //     dispatchTodoListsReducer(action)
    // }
    // const addTodolist = (title: string) => {
    //     const action = addTodolistAC(title)
    //     dispatchTodoListsReducer(action)
    //     dispatchToTasksReducer(action)
    // }


    const getFilteredTasks = (tasks: Array<TasksType>, filter: FilterValueType) => {

        switch (filter) {
            case 'Active':
                return tasks.filter(t =>  t.status === TaskStatuses.New)
            case 'Completed':
                return tasks.filter(t =>  t.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TasksType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return (<div></div>
            // <TodoList
            //     key={tl.id}
            //     todoListId={tl.id}
            //     title={tl.title}
            //     tasks={filteredTasks}
            //     filter={tl.filter}
            //
            //     addTask={addTask}
            //     removeTask={removeTask}
            //     changeTaskTitle={changeTaskTitle}
            //     changeTaskStatus={changeTaskStatus}
            //
            //     removeTodoList={removeTodoList}
            //     changeTodoListFilter={changeTodoListFilter}
            //     changeTodoListTitle={changeTodoListTitle}
            // />
        )
    })

    return (
        <div className="App">
            {/*<AddItemForm maxLengthUserName={15} addItem={addTodolist}/>*/}
            {/*{todoListsComponents}*/}
        </div>
    )
}

export default AppWithReducer;
