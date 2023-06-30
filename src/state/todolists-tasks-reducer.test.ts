import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodolistDomainType,

    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equal', () => {
    // const startTaskState: TasksStateType = {}
    // const startTodolistsState: Array<TodolistDomainType> = []
    //
    // const action = addTodolistAC('new todolist')
    //
    // const endTaskState = tasksReducer(startTaskState, action)
    // const endTodolistsState = todolistsReducer(startTodolistsState, action)
    //
    // const keys = Object.keys(endTaskState)
    // const idFromTasks = keys[0]
    // const idFromTodolists = endTodolistsState[0].id
    //
    // expect(idFromTasks).toBe(action.todolistId)
    // expect(idFromTodolists).toBe(action.todolistId )

})


