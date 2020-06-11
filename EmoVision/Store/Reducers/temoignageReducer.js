const initialState = { temoignage: "" }

function getTemoignage(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_TEMOIGNAGE':
            nextState = {
                temoignage: action.value
            }
            return nextState || state
    default:
        return state
    }
}

export default getTemoignage