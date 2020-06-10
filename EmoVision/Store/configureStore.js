import { combineReducers } from 'redux'
import getDegreAvant from './Reducers/degreAvantReducer'
import toggleEmotion from './Reducers/emotionReducer'

export default combineReducers({toggleEmotion, getDegreAvant})
