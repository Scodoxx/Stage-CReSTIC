import { combineReducers, createStore } from 'redux'
import getSliderValue from './Reducers/degreSliderReducer'
import toggleEmotion from './Reducers/emotionReducer'

const rootReducer = combineReducers  ({
                                toggleEmotion,
                                getSliderValue
                                })

export default createStore(rootReducer)
