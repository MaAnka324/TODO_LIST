import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,

    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach( () => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All',
            addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'All',
            addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', () => {

    const newTodolistTitle = 'New TodolistTitle'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('All')
})


test('correct todolist should change title name', () => {

    const newTitleName = 'New title'

    const action = changeTodolistTitleAC(todolistId1, newTitleName)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitleName)
})


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = "Completed"

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})










