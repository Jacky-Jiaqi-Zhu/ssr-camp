import React, {useState}  from 'react'
import {Route} from 'react-router-dom'
import Index from './component/container/Index'
import About from './component/container/About'



export default (
    <div>
        <Route path="/" exact component={Index}></Route>
        <Route path="/about" exact component={About}></Route>
    </div>
)

