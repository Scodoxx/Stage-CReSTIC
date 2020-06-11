import { combineReducers, createStore } from 'redux'
import getSliderValue from './Reducers/degreSliderReducer'
import toggleEmotion from './Reducers/emotionReducer'
import getTemoignage from './Reducers/temoignageReducer'
import getSensation from './Reducers/sensationPhysiqueReducer'

const rootReducer = combineReducers  ({
                                toggleEmotion,
                                getSliderValue,
                                getTemoignage,
                                getSensation
                                })

export default createStore(rootReducer)
