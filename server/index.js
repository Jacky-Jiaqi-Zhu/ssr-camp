import path from 'path'
import fs from 'fs'
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

function csrRender(res) {
    const filename = path.resolve(process.cwd(), 'public/index.csr.html')
    const html = fs.readFileSync(filename, 'utf-8')
    return res.send(html)
}

app.get('*', (req, res) => {
    if(req.query._mode=='csr') {
        console.log('url param enable csr fallback')
        return csrRender(res)
    }




    // manual switch csr\
    // overload trigger csr

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
        const context = {
            css: []
        }
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <Header></Header>
                    <Switch>
                        {routes.map(route=><Route key={route.key} {...route}></Route>)}
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

        const css = context.css.join('\n')


        res.send(`
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>react ssr11</title>
                <style>
                    ${css}
                </style>
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