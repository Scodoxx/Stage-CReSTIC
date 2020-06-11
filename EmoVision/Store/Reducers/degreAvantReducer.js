const initialState = { sliderValueBefore: 0 }

function getDegreAvant(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_DEGRE_AVANT':
            nextState = {
                sliderValueBefore: action.value
            }
            return nextState || state
    default:
        return state
    }
}

export default getDegreAvant