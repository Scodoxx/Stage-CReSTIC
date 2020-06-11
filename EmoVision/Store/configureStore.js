import { combineReducers, createStore } from 'redux'
import getSliderValue from './Reducers/degreSliderReducer'
import toggleEmotion from './Reducers/emotionReducer'
import getTemoignage from './Reducers/temoignageReducer'

const rootReducer = combineReducers  ({
                                toggleEmotion,
                                getSliderValue,
                                getTemoignage
                                })

export default createStore(rootReducer)
