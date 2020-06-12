const initialState = { where: "", when: "", dejaRessenti: "" }

function getQuestion(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_QUESTION':
            nextState = {
                where: action.value.where,
                when: action.value.when
            }
            return nextState || state
        case 'GET_QUESTION':
            nextState = {
                dejaRessenti: action.value
            }
            return nextState || state
    default:
        return state
    }
}

export default getQuestion