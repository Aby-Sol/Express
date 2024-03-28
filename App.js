const express = require('express')
const path = require('path')
const app = express()
const port = 8000
// appel au dossier views
app.set('view engine', 'ejs')
// appel au dossier public
app.use(express.static(path.join(__dirname, 'public')))


// The web application is only available during working hours (Monday to Friday,  from 9 to 17)
app.use((req,res,next)=>{
    let hours=new Date().getHours()
    let dates=new Date().toString()
    // console.log(hours)
    // console.log(dates)
    if((hours<9 || hours>17) && (dates <'Monday' || dates >'Friday' )) {
        return res.render('close')
    }
    else next()
})


// ouvrir direct dans la page home
app.get('/',(req,res)=>{
    res.redirect('/home')
})

// page index
app.get('/index',(req,res)=>{
    res.render("index")
})


// go to service page with EJS and use render
app.get('/contact', (req,res)=>{
    res.render("contact")
})

app.get('/home', (req,res)=>{
    res.render("home")
})

app.get('/services', (req,res)=>{
    res.render("services")
})

app.get('/message', (req,res)=>{
    res.render("message")
})
// si la page n'existe pas
app.use((req,res)=>{
    res.status(404).send("sorry this page does not exist")
})
app.listen(port,()=> console.log(`application is excuted on port ${port}`) )


