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
        // const limit = parseInt(6);
        const limit = parseInt(10);


        if (req.query.title && req.query.page) {
            const lengthQuery = await Product.find({ productTitle: { $regex: req.query.title, $options: "i" } }).countDocuments().exec();
            let pagesNo;
            if(lengthQuery > 1) {
                pagesNo = Math.ceil(lengthQuery / limit)
            } else {
                pagesNo = lengthQuery
            }
            let page = parseInt(req.query.page);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
        
            if (endIndex < lengthQuery) {
                results.next = {
                page: page + 1,
                };
            }
            if (startIndex > 0) {
                results.previous = {
                page: page - 1,
                };
            }
            await Product.find({ productTitle: { $regex: req.query.title, $options: "i" } })
            .limit(limit)
            .skip(startIndex)
            .exec((err, products) => {
                if (err) return err;
                let prevB = null;
                let currentB = page;
                // let nextB = 2;
                let nextB;
        
                if (typeof results.previous !== "undefined") {
                    prevB = results.previous.page;
                }
                if (typeof results.next !== "undefined") {
                    nextB = results.next.page;
                } else {
                    nextB = null;
                }
                res.status(200).json({
                    products,
                    prevB: prevB,
                    currentB: currentB,
                    nextB: nextB,
                    lengthB: pagesNo,
                    pgResult: true,
                });
            });

        } else if (req.query.page) {
            const lengthQuery = await Product.find().countDocuments().exec();
            let pagesNo;
            if(lengthQuery > 1) {
                pagesNo = Math.ceil(lengthQuery / limit)
            } else {
                pagesNo = lengthQuery
            }
            let page = parseInt(req.query.page);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
        
            if (endIndex < lengthQuery) {
                results.next = {
                page: page + 1,
                };
            }
            if (startIndex > 0) {
                results.previous = {
                page: page - 1,
                };
            }
            await Product.find()
            .limit(limit)
            .skip(startIndex)
            .exec((err, products) => {
                if (err) return err;
                let prevB = null;
                let currentB = page;
                let nextB;
        
                if (typeof results.previous !== "undefined") {
                    prevB = results.previous.page;
                }
                if (typeof results.next !== "undefined") {
                    nextB = results.next.page;
                } else {
                    nextB = null;
                }
                res.status(200).json({
                    products,
                    prevB: prevB,
                    currentB: currentB,
                    nextB: nextB,
                    lengthB: pagesNo,
                    pgResult: true,
                });
            });
        } else if (req.query.title) {
            const lengthQuery = await Product.find({ productTitle: { $regex: req.query.title, $options: "i" } }).countDocuments().exec();
            let pagesNo;
            if(lengthQuery > 1) {
                pagesNo = Math.ceil(lengthQuery / limit)
            } else {
                pagesNo = lengthQuery
            }
            let page = 1;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
        
            if (endIndex < lengthQuery) {
                results.next = {
                page: page + 1,
                };
            }
            if (startIndex > 0) {
                results.previous = {
                page: page - 1,
                };
            }
            await Product.find({ productTitle: { $regex: req.query.title, $options: "i" } })
            .limit(limit)
            .skip(startIndex)
            .exec((err, products) => {
                if (err) return err;
                let prevB = null;
                let currentB = page;
                let nextB;
        
                if (typeof results.previous !== "undefined") {
                    prevB = results.previous.page;
                }
                if (typeof results.next !== "undefined") {
                    nextB = results.next.page;
                } else {
                    nextB = null;
                }
                res.status(200).json({
                    products,
                    prevB: prevB,
                    currentB: currentB,
                    nextB: nextB,
                    lengthB: pagesNo,
                    pgResult: true,
                });
            });
        } else {
            const lengthQuery = await Product.find().countDocuments().exec();
            let pagesNo;
            if(lengthQuery > 1) {
                pagesNo = Math.ceil(lengthQuery / limit)
            } else {
                pagesNo = lengthQuery
            }
            let page = 1;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
        
            if (endIndex < lengthQuery) {
                results.next = {
                page: page + 1,
                };
            }
            if (startIndex > 0) {
                results.previous = {
                page: page - 1,
                };
            }
            await Product.find()
            .limit(limit)
            .skip(startIndex)
            .exec((err, products) => {
                if (err) return err;
                let prevB = null;
                let currentB = page;
                let nextB;
        
                if (typeof results.previous !== "undefined") {
                    prevB = results.previous.page;
                }
                if (typeof results.next !== "undefined") {
                    nextB = results.next.page;
                } else {
                    nextB = null;
                }
                res.status(200).json({
                    products,
                    prevB: prevB,
                    currentB: currentB,
                    nextB: nextB,
                    lengthB: pagesNo,
                    pgResult: true,
                });
            });
        }

    } catch (e) {
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
                res.status(500).json({errorMsg: 'Product not found!'});
            }
        }
    });
})

router.delete("/:id", verifyToken, async (req, res) => {
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
                res.status(500).json({errorMsg: 'Product not found!'});
            }
        }
    });
});

module.exports = router
