const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productsRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

mongoose
.connect(
  'mongodb://localhost:27017/restfulApi',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: true,
  }
)
.then(()=>console.log('MongoDB Connected'))
.catch(err=> console.log(err))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req,res, next)=>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if(req.method === 'OPTIONS'){
    res.header('Access-Constrol-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
})

app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

app.use((req, res, next)=>{
  const error = new Error('not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next)=>{
  res.status(error.status || 500)
  res.json({
    error:{
      message: error.message
    }
  })
})

module.exports = app