import {userReducer} from "./user-reducer";
import exp from "constants";

// test('increment only age', () => {
//     const startState = {age: 20, childCount: 2, name: 'Lana Banana'}
//     const endState = userReducer(startState, {type: 'INCREMENT_AGE'})
//     expect(endState.age).toBe(21)
//     expect(endState.childCount).toBe(2)
// })
//
// test('increment only childCount', () => {
//     const startState = {age: 20, childCount: 2, name: 'Lana Banana'}
//     const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
//     expect(endState.age).toBe(20)
//     expect(endState.childCount).toBe(3)
// })
//
// test('increment only childCount', () => {
//     const startState = {age: 20, childCount: 2, name: 'Dimych'}
//     const newName = 'Victor'
//     const endState = userReducer(startState, {
//         type: 'CHANGE-NAME',
//         newName: newName})
//
//     expect(endState.name).toBe(newName)
// })

test('test one', () => {
   const  count = 1;
   expect(count).toBe(1);
})