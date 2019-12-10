import React from 'react'
import ReactDom from 'react-dom'

import App from '../src/App'


// hydrate
console.log(document)
console.log(document.getElementById("root"))
ReactDom.hydrate(App, document.getElementById('root'))