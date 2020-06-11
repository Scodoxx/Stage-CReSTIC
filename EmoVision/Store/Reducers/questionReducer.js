const initialState = { where: "", when: "" }

function getQuestion(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_QUESTION':
            nextState = {
                where: action.value.where,
                when: action.value.when
            }
            return nextState || state
    default:
        return state
    }
}

export default getQuestion