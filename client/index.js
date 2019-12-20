import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '../src/App'
import {getClientStore} from '../src/store/store'
import Header from '../src/component/Header'

const store = getClientStore()

const Page = <Provider store={store}>
    <BrowserRouter>
        <Header></Header>
        <Switch>
            {routes.map(route=><Route {...route}></Route>)}  
        </Switch>
    </BrowserRouter>
</Provider>

// hydrate
console.log(document)
console.log(document.getElementById("root"))
ReactDom.hydrate(Page, document.getElementById('root'))