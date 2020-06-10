const initialState = { emotions: [] }

function toggleEmotion(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_EMOTION':
            console.log(action)
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
        default:
            return state
    }
}

export default toggleEmotion