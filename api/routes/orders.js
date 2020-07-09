const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
  //list orders 
  res.status(200).json({
    message: 'Handling GET reqs'
  })
})

router.post('/', (req, res, next)=>{
  //add product status 201
  const order ={
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res.status(200).json({
    message: 'You got here!',
    order: order
  })
})

router.get('/:orderId', (req, res, next)=>{
  //show one individual order
})

router.delete('/:productId',(req, res, next)=>{
  //delete one order
})

module.exports = router