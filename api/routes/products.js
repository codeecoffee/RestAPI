const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/products')

router.get('/', (req, res, next)=>{
  //list products 
  res.status(200).json({
    message: 'Handling GET reqs'
  })
})

router.post('/', (req, res, next)=>{
  //add product 
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product
    .save()
    .then(result => {
      console.log(result)
    })
    .catch(err=> console.log(err))

  res.status(201).json({
    message: 'Handling Post req to products',
    createdProduct: product
  })
})

router.post('/:productId', (req, res, next)=>{
  const id= req.params.productId
  if(id === 'special'){
    res.status(200).json({
      message: 'Reached',
      id:id
    })
  }else{

  }
})

router.patch('/:productId',(req, res, next)=>{
  //update one product
})
router.delete('/:productId',(req, res, next)=>{
  //delete one product
})

module.exports = router