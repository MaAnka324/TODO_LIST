import React from 'react'
import { Provider } from 'react-redux';
import {AppRootState, store} from "../../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../../state/todolists-reducer";
import {tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


const initialGlobalState = {
    todolists: [
        {id: "todolistId_1", title: "What to learn", filter: 'All',
            addedDate: '', order: 0},
        {id: "todolistId_2", title: "What to buy", filter: 'All',
            addedDate: '', order: 0},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS",
                status: TaskStatuses.Completed, todoListId: "todolistId_1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "JS",
                status: TaskStatuses.Completed, todoListId: "todolistId_1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk",
                status: TaskStatuses.Completed, todoListId: "todolistId_1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "React Book",
                status: TaskStatuses.Completed, todoListId: "todolistId_1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ]
    },
    app: {
        status: 'idle',
        error: null
    }
};

// export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState);
//
// export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
//     return <Provider store={storyBookStore}>{storyFn()}</Provider>
// }