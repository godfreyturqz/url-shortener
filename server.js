const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const URLModel = require('./models/URLModel')
require('dotenv/config')

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + "/public"))

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
    if(data == null) return res.status(404).send('Website not found on the database.')

    data.clicks++
    data.save()
    res.redirect(data.originalUrl)
})


const PORT = process.env.MONGO_URI || 5000
mongoose.connect( PORT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(app.listen(5000 , ()=> console.log('connected')))
.catch(error => console.log(error))
