import {addTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";

test('correct task should be deleted', () => {

    const startState = {
        'todolistId_1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "ES6 & TS", isDone: true},
            {id: '3', title: "React & Redux", isDone: false}
        ],
        'todolistId_2': [
            {id: '1', title: "MILK", isDone: true},
            {id: '2', title: "BREAD", isDone: true},
            {id: '3', title: "MEAT", isDone: false}
        ]
    }

    const action = removeTaskAC('2', 'todolistId_2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId_1'].length).toBe(3)
    expect(endState['todolistId_2'].length).toBe(2)
    expect(endState['todolistId_2'].every(t => t.id != '2')).toBeTruthy()
})


test('correct task should be added', () => {

    const startState: TasksStateType = {
        'todolistId_1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "ES6 & TS", isDone: true},
            {id: '3', title: "React & Redux", isDone: false}
        ],
        'todolistId_2': [
            {id: '1', title: "MILK", isDone: true},
            {id: '2', title: "BREAD", isDone: true},
            {id: '3', title: "MEAT", isDone: false}
        ]
    }

    const action = addTaskAC('JUCE', 'todolistId_2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId_1'].length).toBe(3)
    expect(endState['todolistId_2'].length).toBe(4)
    expect(endState['todolistId_2'][0].id).toBeDefined()
    expect(endState['todolistId_2'][0].title).toBe('JUCE')
    expect(endState['todolistId_2'][0].isDone).toBe(false)
})

