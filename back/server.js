const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const productsRoute = require("./routes/products");

const app = express()

// //Set up default mongoose connection
const DATABASE_URL = 'mongodb://localhost:27017/StarlabsDB';
mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
const db = mongoose.connection
// db.on('error', (error) => console.error(error))
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));