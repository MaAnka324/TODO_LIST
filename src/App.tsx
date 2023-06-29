import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {TaskPriorities, TaskStatuses, TasksType} from "./api/todolist-api";
import {FilterValueType, TodolistDomainType} from "./state/todolists-reducer";


export type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}

function App() : JSX.Element{
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todolistId_1, title: "What to learn", filter: 'All',
            addedDate: '', order: 0},
        {id: todolistId_2, title: "What to buy", filter: 'All',
            addedDate: '', order: 0},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML & CSS",
                status: TaskStatuses.Completed, todoListId: todolistId_1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "React & Redux",
                status: TaskStatuses.New, todoListId: todolistId_1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ],
        [todolistId_2]: [
            {id: v1(), title: "MILK",
                status: TaskStatuses.Completed, todoListId: todolistId_2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "BREAD",
                status: TaskStatuses.Completed, todoListId: todolistId_2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ]
    })


    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })

    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TasksType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todolistId_1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        }

        const tasksForUpdate: Array<TasksType> = tasks[todolistId]

        setTasks({...tasks,
            [todolistId]: [newTask, ...tasksForUpdate]
        })
    }
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        const tasksForUpdate: Array<TasksType> = tasks[todolistId]
        const updatedTasks = tasksForUpdate.map(t => t.id === taskId
            ? {...t, status: status}
            : t)
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updatedTasks
        setTasks(copyTasks)
        //
        setTasks({...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId
                ? {...t,status: status}
                : t)
        })
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? {...t, title: newTitle}
                : t)})
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, title: title}
            : tl))
    }

    const changeTodoListFilter = (filter: FilterValueType, todolistId: string) => {
        setTodoLists(todoLists.map(t => t.id === todolistId
            ? {...t, filter: filter}
            : t))
    }

    const removeTodoList = (todolistId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todolistId))
        // delete tasks[todolistId]
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }
    const addTodolist = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodolistDomainType = {
            id: newTodoListId,
            title: title,
            filter: 'All',
            addedDate: '',
            order: 0
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }


    const getFilteredTasks = (tasks:Array<TasksType>, filter: FilterValueType) => {

        switch (filter){
            case 'Active':
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            case 'Completed':
                return tasks.filter(t => t.status === TaskStatuses.New)
            default:
                return tasks
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TasksType> = getFilteredTasks(tasks[tl.id], tl.filter)
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

export default App;
