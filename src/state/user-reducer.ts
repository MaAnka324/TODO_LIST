
type StateType = {
    age: number
    childCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string] : any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT_AGE':
            return {
                ...state,
                age: state.age + 1
            }
            // state.age = state.age + 1
            // return state
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childCount: state.childCount + 1
            }
            // state.childCount = state.childCount + 1
            // return  state
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            }
        default: throw new Error("I don't understand" )
    }
}