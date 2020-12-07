const express = require('express')
const Product = require("../models/Product");
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        await Product.find((err, products) => {
            if (err) return err;
            res.status(200).json(products);
        });
    } catch (e) {
        // res.status(500).send(e)
        res.sendStatus(500)
    }
})

router.get('/:id', async (req, res) => {
    try {
        await Product.findById(req.params.id, (err, product) => {
            if (err) return err;
            return res.status(200).json(product);
        });
    } catch (e) {
        // res.sendStatus(500)
        // return res.status(500).json({ message: e.message })
        res.status(500).json({errorMsg: 'Product not found!'});
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

        await Product.create(productData, (err, product) => {
            if (err) return err;
            res.status(200).json({successMsg: 'Product has been added successfuly!'});
        });
    } catch (e) {
        res.sendStatus(500)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const productData = {};
        // if (req.body.eventPhoto) productData.eventPhoto = req.body.eventPhoto;
        if (req.body.productTitle) productData.productTitle = req.body.productTitle;
        if (req.body.productPrice) productData.productPrice = req.body.productPrice;
        if (req.body.productStock) productData.productStock = req.body.productStock;

        await Product.findByIdAndUpdate(req.params.id, productData, (err, product) => {
            if (err) return err;
            res.status(200).json({successMsg: 'Product has been updated successfuly!'});
        });
    } catch (e) {
        // res.sendStatus(500)
        res.status(500).json({errorMsg: 'Product not found!'});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id, (err, product) => {
            if (err) return err;
            res.status(200).json({successMsg: `Product has been deleted!`});
        });
    } catch (e) {
        // res.sendStatus(500)
        res.status(500).json({errorMsg: 'Product not found!'});
    }
  });

module.exports = router
