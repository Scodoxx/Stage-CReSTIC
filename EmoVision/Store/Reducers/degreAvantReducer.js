const initialState = { sliderValue: 0 }

function getDegreAvant(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_DEGRE_AVANT':
            nextState = 0
            return nextState || state
    default:
        return state
    }
}

export default getDegreAvant