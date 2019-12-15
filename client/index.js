import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '../src/App'
import {getClientStore} from '../src/store/store'

const store = getClientStore()

const Page = <Provider store={store}>
    <BrowserRouter>
        {routes.map(route=><Route {...route}></Route>)}
    </BrowserRouter>
</Provider>

// hydrate
console.log(document)
console.log(document.getElementById("root"))
ReactDom.hydrate(Page, document.getElementById('root'))