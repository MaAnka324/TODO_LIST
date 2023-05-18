import React, {useReducer, useState} from 'react';
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

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function AppWithReducer() : JSX.Element{
    const todolistId_1 = v1()
    const todolistId_2 = v1()



    const [todoLists, dispatchTodoListsReducer] = useReducer(todolistsReducer,[
        {id: todolistId_1, title: "What to learn", filter: 'All'},
        {id: todolistId_2, title: "What to buy", filter: 'All'},
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "BREAD", isDone: true},
            {id: v1(), title: "MEAT", isDone: false}
        ]
    })


    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasksReducer(action)
    }
    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        const action = statusTaskAC(taskId, newIsDone, todolistId)
        dispatchToTasksReducer(action)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTitleTaskAC(taskId, newTitle, todoListId)
        dispatchToTasksReducer(action)
    }




    const changeTodoListFilter = (filter: FilterValueType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatchTodoListsReducer(action)
    }
    const removeTodoList = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }
    const changeTodoListTitle = (todoListId: string, title: string) => {
        const action = changeTodolistTitleAC(todoListId, title)
        dispatchTodoListsReducer(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }


    const getFilteredTasks = (tasks:Array<TaskType>, filter: FilterValueType) => {

        switch (filter){
            case 'Active':
                return tasks.filter(t => t.isDone === false)
            case 'Completed':
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return ( <div></div>
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
            <AddItemForm maxLengthUserName={15} addItem={addTodolist}/>
            {todoListsComponents}
        </div>
    )
}

export default AppWithReducer;
