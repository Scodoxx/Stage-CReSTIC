const initialState = { emotions: [], emotionFinale: "" }

function toggleEmotion(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_EMOTION':
            const emotionIndex = state.emotions.findIndex(item => item.id === action.value.id)
            if (emotionIndex !== -1) {
                //supression
                nextState = {
                    ...state,
                    emotions: state.emotions.filter( (item, index) => index !== emotionIndex)
                }
            }
            else {
                //ajouter
                nextState = {
                    ...state,
                    emotions: [ ...state.emotions, action.value ]
                }
            }
            return nextState || state
        case 'GET_EMOTION_FINALE':
            nextState = {
                emotionFinale: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleEmotion