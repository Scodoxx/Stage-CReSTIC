import { createStore } from 'redux'
import getBird from './Reducers/birdReducer'

export default createStore(getBird)