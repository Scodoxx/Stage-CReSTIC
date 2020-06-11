const initialState = { sensation: "", localisation: "" }

function getSensation(state = initialState, action) {
    let nextState
    console.log(state)
    switch (action.type) {
        case 'GET_SENSATION':
            nextState = {
                sensation: action.value.sensation,
                localisation: action.value.localisation
            }
            return nextState || state
    default:
        return state
    }
}

export default getSensation