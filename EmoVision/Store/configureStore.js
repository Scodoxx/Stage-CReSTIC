import { createStore } from 'redux'
import getDegreAvant from './Reducers/degreAvantReducer'
import toggleEmotion from './Reducers/emotionReducer'

export default createStore(toggleEmotion)