const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');



// CREATE
router.post('/newproduct', (req, res, next) => {

    const { price,
        description,
        title,
        localization,
        date } = req.body;

        const author = req.user
  
  
    // Check for non empty fields
    if (!price || !title || !date){
      next(res.json({mensaje:'You have to put tittle price and date!'}));
    }
  
    // Check if product exists in DB
    Product.findOne({ title })
    .then( foundUser => {
      if (foundUser) throw new Error('This already exists');
  
      return new Product({
        price,
        description,
        title,
        author,
        localization,
        date
      }).save();
    })
    .then( user => res.json({status: 'Created Product', user}))
    .catch(e => res.json({message:'./error', e}));
  });

  //EDIT

  router.post('/:title/edit', (req, res, next) => { 
    Product.updateOne({title: req.params.title}, req.body)
      .then(updated => {
        res.json(updated);
      })
      .catch(err => {
        res.json({message:'./error', err})
      })
  })

  //Delete

  router.post('/:id/delete', (req, res, next) => {
    Product.findByIdAndDelete({_id: req.params.id})
      .then(record => {
        res.json({message:"deleted",record});
      })
      .catch(err => {
        res.json({message:'./error', err})
      })
  })

  //All products

  router.get('/all', (req, res, next) => {
    Product.find({})
      .then(products => {
        res.json(products);
      })
      .catch(err => {
        res.json({message:'./error', err})
      })
  });

  // One product

  router.get('/:id/oneproduct', (req, res, next) => {
    Product.findOne({_id : req.params.id})
      .then(product => {
        res.json({message:'the product', product})
      })
      .catch(err => {
        res.json({message:'./error', err})
      })
  });



module.exports = router;