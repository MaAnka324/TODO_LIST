import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}

type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() : JSX.Element{
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId_1, title: "What to learn", filter: 'All'},
        {id: todolistId_2, title: "What to buy", filter: 'All'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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


    // const removeTask = (taskId: string) => {
    //     const updatedTasks = tasks.filter(t => t.id !== taskId)
    //     setTasks(updatedTasks)
    // }

    const removeTask = (taskId: string, todolistId: string) => {
        // const tasksForUpdate = tasks[todolistId]
        // const updatedTasks = tasksForUpdate.filter(t => t.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })

    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        const tasksForUpdate: Array<TaskType> = tasks[todolistId]
        // const updatedTasks = [newTask, ...tasksForUpdate]
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks,
            [todolistId]: [newTask, ...tasksForUpdate]
        })
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todolistId]
        const updatedTasks = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: newIsDone}: t)
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updatedTasks
        setTasks(copyTasks)
        //
        setTasks({...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone}: t)
        })
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle}: t)})
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title}: tl))
    }

    const changeTodoListFilter = (filter: FilterValueType, todolistId: string) => {
        setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, filter: filter}: t))
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
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: 'All'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
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
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                filter={tl.filter}

                addTask={addTask}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}

                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
                changeTodoListTitle={changeTodoListTitle}
            />
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
