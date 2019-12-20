import React, {useState}  from 'react'
import {Route} from 'react-router-dom'
import Index from './container/Index'
import About from './container/About'
import User from './container/User'
import './App.css'

// export default (
//     <div>
//         <Route path="/" exact component={Index}></Route>
//         <Route path="/about" exact component={About}></Route>
//     </div>
// )


// change to js config to get component
export default [
    {
        path: '/',
        component: Index,
        // loadData: Index, loadData,
        exact: true,
        key: 'index'
    },
    {
        path: '/about',
        component: About,
        exact: true,
        key: 'about'
    },
    {
        path: '/user',
        component: User,
        exact: true,
        key: 'user'
    },
]

