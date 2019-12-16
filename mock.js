const express = require('express')
const app = express()



app.get('/api/user/info', (req, res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.json({
        code: 0,
        data: {
            name: 'kaikeba',
            best: 'da sheng'
        }
    })

})



app.get('/api/course/list', (req, res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.json({
        code: 0,
        list: [
            {name: 'web full stack', id: 1},
            {name: 'js advance', id: 2},
            {name: 'web jouner', id: 3},
            {name: 'java', id: 4}
        ]
    })

})

app.listen(9090, ()=>{
    console.log('mock started')
})