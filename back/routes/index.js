const express = require('express')
const mongoose = require('mongoose');
const Product = require("../models/Product");
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        Product.find((err, products) => {
            // if (err) return next(err);
            if (err) return err;
            res.status(200).json(products);
        });
        // res.status(200).json({msg: 'All Products'})
    } catch (e) {
        // res.status(500).send(e)
        res.sendStatus(500)
    }
})

// router.get('/:id', async (req, res) => {
router.get('/product/:id', async (req, res) => {
    try {
        await Product.exists({ _id: req.params.id }, (err, result) => {
            if(result) {
                Product.findById(req.params.id, (err, product) => {
                    if (err) return err;
                    return res.status(200).json(product);
                });
            } else {
                return res.status(404).json({errorMsg: 'Product not found!', successMsg: false});
            }
        })
    } catch (e) {
        res.sendStatus(500)
    }
})

router.post('/', async (req, res) => {
    try {
        const productData = {
            // eventPhoto: uploadName,
            productTitle: req.body.productTitle,
            productPrice: req.body.productPrice,
            productStock: req.body.productStock
        };

        Product.create(productData, (err, product) => {
            if (err) return err;
            res.status(200).json({errorMsg: false, successMsg: 'Data added successfuly!'});
        });
    } catch (e) {
        res.sendStatus(500)
    }
})

module.exports = router