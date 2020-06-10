const initialState = { sliderValueBefore: 3 }

function getDegreAvant(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_DEGRE_AVANT':
            console.log(action.value[0])
            nextState = action.value[0]
            return nextState || state
    default:
        return state
    }
}

export default getDegreAvant