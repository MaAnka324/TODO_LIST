import {addTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, TodolistDomainType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {v1} from "uuid";


let todolistId1: string
let todolistId2: string
let startState: TasksStateType = {}
let startStateTodo: Array<TodolistDomainType>

beforeEach( () => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        'todolistId_1': [
            {id: '1', title: "HTML & CSS",
                status: TaskStatuses.Completed, todoListId: 'todolistId_1', startDate: '', entityTaskStatus: 'idle',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '2', title: "ES6 & TS",
                status: TaskStatuses.New, todoListId: 'todolistId_1', startDate: '', entityTaskStatus: 'idle',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ],
        'todolistId_2': [
            {id: '1', title: "MILK",
                status: TaskStatuses.New, todoListId: 'todolistId_2', startDate: '', entityTaskStatus: 'idle',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '2', title: "BREAD",
                status: TaskStatuses.Completed, todoListId: 'todolistId_2', startDate: '', entityTaskStatus: 'idle',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ]
    }


    startStateTodo = [
        {id: todolistId1, title: 'What to learn', filter: 'All',  entityStatus: "idle",
            addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'All',  entityStatus: "idle",
            addedDate: '', order: 0}
    ]


})



test('correct task should be deleted', () => {


    const action = removeTaskAC('2', 'todolistId_2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId_1'].length).toBe(3)
    expect(endState['todolistId_2'].length).toBe(2)
    expect(endState['todolistId_2'].every(t => t.id != '2')).toBeTruthy()
})


test('correct task should be added', () => {

    //const action = addTaskAC('JUCE', 'todolistId_2')
    const action = addTaskAC({
        todoListId: 'todolistId_2',
        title: 'JUCE',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'abc',
        entityTaskStatus: 'idle',
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId_1'].length).toBe(3)
    expect(endState['todolistId_2'].length).toBe(4)
    expect(endState['todolistId_2'][0].id).toBeDefined()
    expect(endState['todolistId_2'][0].title).toBe('JUCE')
    expect(endState['todolistId_2'][0].status).toBe(TaskStatuses.New)
})


test('status should be changed', () => {

    // const action = statusTaskAC('2', TaskStatuses.New, 'todolistId_2')
    //
    // const endState = tasksReducer(startState, action)
    //
    // expect(endState['todolistId_2'][1].status).toBe(TaskStatuses.New)
    // expect(endState['todolistId_1'][1].status).toBe(TaskStatuses.Completed)
})


test('title should be changed', () => {

    const action = changeTitleTaskAC('2', 'MilkyWay', 'todolistId_2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId_2'][1].title).toBe('MilkyWay')
    expect(endState['todolistId_1'][1].title).toBe("ES6 & TS")
})


test('new property with new array should be added when new todolist is added', () => {

    // const action = addTodolistAC('new todolist')
    //
    // const endState = tasksReducer(startState, action)
    //
    // const keys = Object.keys(endState)
    // const newKey = keys.find(k => k != 'todolistId_1' && k != 'todolistId_2')
    // if (!newKey) {
    //     throw Error('new key should be added')
    // }
    //
    // expect(keys.length).toBe(3)
    // expect(endState[newKey]).toEqual([])
})



test('property with todolist should be deleted', () => {

    const action = removeTodolistAC('todolistId_2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId_2']).toBeUndefined()
})


test('property with todolist should be deleted', () => {

    // const action = setTodolistsAC([
    //     {id: '1', title: 'What to learn', filter: 'All',
    //         addedDate: '', order: 0},
    //     {id: '2', title: 'What to buy', filter: 'All',
    //         addedDate: '', order: 0}
    // ])

    const action = setTodolistsAC(startStateTodo)

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})
