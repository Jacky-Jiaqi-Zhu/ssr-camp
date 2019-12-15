import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from '../src/App'

const Page = <BrowserRouter>
    {App}
</BrowserRouter>

// hydrate
console.log(document)
console.log(document.getElementById("root"))
ReactDom.hydrate(Page, document.getElementById('root'))