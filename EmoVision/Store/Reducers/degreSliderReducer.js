const initialState = { sliderValueBefore: 0, sliderValueAfter: 0, sliderEmotion: 0 }

function getSliderValue(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_DEGRE_AVANT':
            nextState = {
                ...state,
                sliderValueBefore: action.value
            }
            return nextState || state
        case 'GET_DEGRE_APRES':
            nextState = {
                ...state,
                sliderValueAfter: action.value
            }
            return nextState || state
        case 'GET_DEGRE_EMOTION':
            nextState = {
                ...state,
                sliderEmotion: action.value
            }
            return nextState || state
    default:
        return state
    }
}

export default getSliderValue