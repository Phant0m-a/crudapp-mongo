const express = require('express');
const OrderModal = require('../modals/orderModal');
const CatModal = require('../modals/catModal');
const ProductModal = require('../modals/productModal');
const orderRouter = express.Router();


orderRouter.get("/", async (req, res) => {
    const orders = await OrderModal.find({});
    // error needs fixing showing NULL order fields
    // const cats = await CatModal.find({});
    // const products = await ProductModal.find({}).populate('category').exec();
    try {

        res.status(200).send({
            success: true, data: orders
            // , products, cats 
        });
    } catch (err) {
        res.status(300).send({ success: false, message: `something went wrong ${err}` });

    }
});

// post
orderRouter.post("/", async (req, res) => {
    let {
        user,
        id,
        price,
        category,
        status,
        paymentMethod
    } = req.body;

    let totalPrice = 0;
    totalPrice = totalPrice + price;

    const newOrder = OrderModal({
        user: user,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
        products: [{
            id: id,
            price: price,
            category: category,
            status: status
        }]
    });

    try {
        await newOrder.save();
        res.status(200).send({ success: true, message: '1 Order Added Successfully!' });
    }
    catch (err) {
        res.status(300).send({ success: false, message: `something went wrong! ${err}` });
    }

});


// put - add/push one product in the ORDER
orderRouter.put("/product", async (req, res) => {
    let {
        id,
        price,
        category,
        status,
    } = req.body;
  
    try {
        const order = await OrderModal.findById(id);
        order.totalPrice = order.totalPrice+parseInt(price);
        order.products.push({
                id: id,
                price: price,
                category: category,
                status: status
        })
        await order.save();
        res.status(200).send({ success: true, message: `One product pushed in order id:${id} updated Successfully!` });
    }
    catch (err) {
        res.status(300).send({ success: false, message: `something went wrong! ${err}` });
    }

});


// delete one product from ORDER
orderRouter.delete("/product", async (req, res) => {

    const {
        id,
        index
    } = req.body;

    try {
        const order = await OrderModal.findById(id);
        // check if right
        order.totalPrice = order.totalPrice - order.products[parseInt(index)].price;
        order.products.splice(parseInt(index), 1);
        await order.save();
        res.status(200).send({ success: true, message: `product from order with index:${index} is deleted Successfully!` });
    }
    catch (err) {
        res.status(300).send({ success: false, message: `something went wrong! ${err}` });
    }

});


// delete whole ORDER
orderRouter.delete('/', async (req, res) => {

    const {
        id
    } = req.body;

    const order = await OrderModal.findById(id);

    try {
        await order.remove();
        res.status(200).send({ success: true, message: `Whole order id:${id} Deleted successfully!` });
    } catch (err) {

        res.status(300).send({ success: false, message: 'Some thing went wrong!', error: err });
    }
})


module.exports = orderRouter;



