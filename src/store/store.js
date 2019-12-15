import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'

const reducer = combineReducers({
    index: indexReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export const getServerStore = () => {
    // get store via dispatch
    return createStore(reducer, applyMiddleware(thunk))
}

export const getClientStore = () => {
    const defaultState = window.__context ? window.__context : {}
    return createStore(reducer, defaultState, applyMiddleware(thunk))
}