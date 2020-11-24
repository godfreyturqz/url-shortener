const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const URLModel = require('./models/URLModel')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs')

app.get('/', async (req,res)=>{
    const URLs = await URLModel.find()
    res.render('index', {URLs})
})
app.post('/shortUrl', async(req,res)=>{
    await URLModel.create({ originalUrl: req.body.originalUrl })
    res.redirect('/')
})

app.get('/:shortUrl', async(req,res)=>{
    const data = await URLModel.findOne({shortUrl : req.params.shortUrl})
    if(data == null) return res.status(404)

    data.clicks++
    data.save()
    // console.log(data)
    res.redirect(data.originalUrl)
})


const url = 'mongodb+srv://freecodecamp:greencross123@cluster0.t5wb4.mongodb.net/free?retryWrites=true&w=majority'
mongoose.connect( url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(app.listen(5000 , ()=> console.log('connected')))
.catch(error => console.log(error))
