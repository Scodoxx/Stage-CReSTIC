const initialState = { currentIndex: 0 }

function getBird(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_BIRD':
            nextState = 0
            return nextState || state
    default:
        return state
    }
}

export default getBird