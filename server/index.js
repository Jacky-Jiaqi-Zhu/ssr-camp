import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from '../src/App'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    const content = renderToString(App)

    res.send(`
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>react ssr11</title>
        </head>

        <body>
            <div id="root">${content}</div>
        </body>
        <script src="/bundle.js"></script>


    </html>
    
    `)

})

app.listen(9093, ()=>{
    console.log('listening')
})