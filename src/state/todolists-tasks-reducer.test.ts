import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";


test('ids should be equal', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC({
        id: '1',
        title: 'new todo',
        addedDate: '',
        order: 1
    })

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id )

})


