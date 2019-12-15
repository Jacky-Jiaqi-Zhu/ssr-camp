import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import {StaticRouter, matchPath, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '../src/App'
import {getServerStore} from '../src/store/store'

const store = getServerStore()
const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {
    // get rendered component based on route, also get data via loadData()

    // save request
    const promises = []

    routes.some(route=>{
        const match = matchPath(req.path, route)
        if(match) {
            const {loadData} = route.component
            if(loadData) {
                promises.push(loadData(store))
            }
        }
    })


    // wait for all requests
    Promise.all(promises).then(()=>{
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    {routes.map(route=><Route {...route}></Route>)}
                </StaticRouter>
            </Provider>
        )

        res.send(`
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>react ssr11</title>
            </head>

            <body>
                <div id="root">${content}</div>
                <script>
                    window.__context = ${JSON.stringify(store.getState())}
                </script>
            </body>
            <script src="/bundle.js"></script>


        </html>
        
        `)        
    })


})

app.listen(9093, ()=>{
    console.log('listening')
})