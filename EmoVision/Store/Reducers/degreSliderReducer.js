const initialState = { sliderValueBefore: 0, sliderValueAfter: 0 }

function getSliderValue(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_DEGRE_AVANT':
            nextState = {
                sliderValueBefore: action.value
            }
            return nextState || state
        case 'GET_DEGRE_APRES':
            nextState = {
                sliderValueAfter: action.value
            }
            return nextState || state
    default:
        return state
    }
}

export default getSliderValue