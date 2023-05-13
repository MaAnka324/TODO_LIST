import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,

    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {TodoListType} from "../App";

test('correct todolist should be removed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const newTodolistTitle = 'New TodolistTitle'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('All')
})


test('correct todolist should change title name', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const newTitleName = 'New title'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const action = changeTodolistTitleAC(todolistId1, newTitleName)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitleName)
})