const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const port = 8000
const fs = require('fs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('view engine','ejs')

app.get('/',(req,res) => {
    res.render("login",{data:{message:"",login:false}})
})

app.post('/login',(req,res) => {
    const email = req.body.email
    const password = req.body.password
    let isLogin = false
    fs.readFile('./data/user.csv','utf-8',(err,data) => {
        if(err){
            res.render("login",{data:{message:"email or password are wrong",login:isLogin}})
        }else{
            const usersCsv = data.split('\n').slice(1)
            let users = []
            usersCsv.forEach(user => {
                users.push(user.split(','))
            })
            users.forEach(el => {
                const emailDb = el[0]
                const passDb = el[1]
                if(email === emailDb && password === passDb){
                    isLogin = true
                    return;
                }
            })
            if(!isLogin){
                res.render("login",{data:{message:"email or password are wrong",login:isLogin}})
            }else{
                res.render("home",{login:isLogin})
            }
        }
    })
})

app.listen(port,() => {
    console.log(`App running on port ${port}`)
})