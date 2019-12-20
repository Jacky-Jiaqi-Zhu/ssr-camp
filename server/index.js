import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import {StaticRouter, matchPath, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '../src/App'
import proxy from 'http-proxy-middleware'
import {getServerStore} from '../src/store/store'
import Header from '../src/component/Header'
import { ContextReplacementPlugin } from 'webpack'

const store = getServerStore()
const app = express()

app.use(express.static('public'))

// requests from client start with /api'
app.use('/api', proxy({target: 'http://localhost:9090', changeOrigin: true}))


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
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
    Promise.allSettled(promises).then(()=>{
        const context = {}
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <Header></Header>
                    <Switch>
                        {routes.map(route=><Route {...route}></Route>)}
                    </Switch>
                </StaticRouter>
            </Provider>
        )

        console.log('context', context)
        if(context.statuscode) {
            res.status(context.statuscode)
        }
        if(context.action == "REPLACE") {
            Response.redirect(301, context)
        }

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
    }).catch(()=>{
        res.send('error 500')
    })


})

app.listen(9093, ()=>{
    console.log('listening')
})