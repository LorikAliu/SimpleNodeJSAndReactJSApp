const express = require('express')
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const router = express.Router()

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // Split at the space
      const bearer = bearerHeader.split(" ");
      // Get token from array
      const bearerToken = bearer[1];
      // Parse token
      const showToken = JSON.parse(bearerToken);
      // Set the token
      req.token = showToken.token;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

router.get('/', async (req, res) => {
    try {
        if (req.query.title) {
            await Product.find({ productTitle: { $regex: req.query.title, $options: "i" } }).exec(function (err, products) {
                if (err) return err;
                res.status(200).json({products});
            });
        } else {
            await Product.find((err, products) => {
                if (err) return err;
                res.status(200).json({products});
            });
        }

    } catch (e) {
        // res.status(500).send(e)
        res.sendStatus(500)
    }
})

router.get('/:id', async (req, res) => {
    try {
        await Product.findById(req.params.id, (err, product) => {
            if (err) return err;
            return res.status(200).json({product});
        });
    } catch (e) {
        // res.sendStatus(500)
        // return res.status(500).json({ message: e.message })
        res.status(500).json({errorMsg: 'Product not found!'});
    }
})

router.post('/', verifyToken, async (req, res) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
        if (err) {
          console.log("Unaothorized User");
          res.sendStatus(403);
        } else {
            try {
                const productData = {
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
        }
    });
})

router.put('/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
        if (err) {
          console.log("Unaothorized User");
          res.sendStatus(403);
        } else {
            try {
                const productData = {};
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
        }
    });
})

router.delete("/:id", async (req, res) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
        if (err) {
          console.log("Unaothorized User");
          res.sendStatus(403);
        } else {
            try {
                await Product.findByIdAndDelete(req.params.id, (err, product) => {
                    if (err) return err;
                    res.status(200).json({successMsg: `Product has been deleted!`});
                });
            } catch (e) {
                // res.sendStatus(500)
                res.status(500).json({errorMsg: 'Product not found!'});
            }
        }
    });
});

module.exports = router
