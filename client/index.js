import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from '../src/App'
import store from '../src/store/store'

const Page = <Provider store={store}>
    <BrowserRouter>
        {App}
    </BrowserRouter>
</Provider>

// hydrate
console.log(document)
console.log(document.getElementById("root"))
ReactDom.hydrate(Page, document.getElementById('root'))