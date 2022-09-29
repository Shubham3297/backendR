const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");
// const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Sign UP Api (store user information)
app.post("/regsister", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
    // resp.send(req.body);
    // resp.send("Api in progress......")
});

// Login Api (check correct user)
app.post("/login", async (req, resp) => {
    console.log(req.body);
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        } else {
            resp.send({ result: "No User Found" });
        }
    } else {
        resp.send({ result: "No User Found" });
    }
    // resp.send(req.body);
});

//Add Product Api
app.post("/add-product", async (req, resp) => {
    // resp.send("Api in progress.....");
    // console.log("Add", req.body);
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
    // console.log("Add....", result);
});


//Get Product List Api
app.get("/product-list", async (req, resp) => {
    // resp.send("Api in progress.....");
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No Products Found" });
    }
    // console.log("Get", products);
});

//Delete Product Api
app.delete("/product/:id", async (req, resp) => {
    // resp.send("Working....");
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
    // resp.send(req.params.id);
    console.log("Delete", result);
    // console.log("Delete....", req.params.id);

});

//prefill update Product Api
app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    console.log("result", result);
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No Product Found...." });
    }
});

// update product api  Working 3rd method
app.put("/product/:id", async (req, resp) => {
    // resp.send("Api in progress.....")
    let result = await Product.updateOne(
        { _id: req.body.id },
        { $set: req.body }
    )
    console.log("update", result);
    resp.send(result)
    console.log("update....", req.body)
});


// update product api // Working 1st method
// app.post("/product", async (req, resp) => {
//     resp.send("Api in progress.....")
//     console.log(req.body);
//     let result = await Product.updateOne(
//         { _id: req.body.id },
//         { $set: req.body }
//     )
//     console.log("update", result);
//     resp.send(result)
//     console.log("update....", req.body)
// });

// update product api  // Working 2nd method
// app.post("/product", async (req, resp) => {
//     resp.send("Api in progress.....")
//     console.log(req.body);
//     let result = await Product.updateOne(
//         { _id: req.body.id },
//         {
//             name: req.body.name,
//             price: req.body.price,
//             category: req.body.category,
//             company: req.body.company,
//         }
//     )
//     console.log("update", result);
//     resp.send(result)
//     console.log("update....", req.body)
// });

// const connectDB = async () => {
//     mongoose.connect('mongodb://localhost:27017/e-comm');
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('products', productSchema);
//     const data = await product.find();
//     console.log(data);
//     console.warn(data);
// }

// connectDB();

// app.get("/", (req, resp) => {
//     resp.send("App is working....");
// })


app.listen(5000);