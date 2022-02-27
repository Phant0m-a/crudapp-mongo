const express = require('express');
const bcrypt = require("bcryptjs");
const {
    isAuth,
    generateToken
} = require('../utils/util');
const orderModal = require('../modals/orderModal');
const { User } = require('mongoose/node_modules/mongodb');
const AdminAccount = require('../modals/userModal');
const mongoose = require('mongoose')
const authRouter = express.Router();

authRouter.post('/', async (req, res) => {
    const {
        userid
    } = req.body;

    //   
    const userOrders = await AdminAccount.aggregate([
        {
            $match: {
                _id: { $eq: mongoose.Types.ObjectId(userid) }
            }
        },
        {
            $lookup: {
                from: "orders",
                "localField": "_id",
                "foreignField": "user",
                "as": "orders"
            },
        }
    ]).exec();

    // 

    try {

        res.status(200).send({ success: true, message: userOrders });
    } catch (err) {
        res.status(500).send({ success: false, message: `something went wrong! ${err}` });
    }


});


authRouter.post("/login", async (req, res) => {

    const {
        email,
        password
    } = req.body;

    const user = await UserAccount.findOne({
        email: email
    });

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.cookie('token', token);
            res.status(200).send({ success: true, message: "Login Successfully", user: user });

        } else {
            res.status(401).send({ success: false, message: "User record not found!" });
        }
    } else {
        res.status(401).send({ success: false, message: "User record not found!" });
    }
});

authRouter.get('/logout', async (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ success: true, message: 'logged out and cookies cleared!' });
});


authRouter.post("/register", async (req, res) => {

    try {
        const user = await UserAccount.findOne({
            email: req.body.email
        });

        if (user) {
            res.status(401).send({ success: false, message: 'User already Registered with this email!' });
        } else {

            const ePassword = await bcrypt.hashSync(req.body.password, 8);
            const newUser = UserAccount({
                name: req.body.name,
                email: req.body.email,
                password: ePassword
            })
            await newUser.save();
            res.status(200).send({ success: true, message: 'Registered user Successfully!' });

        }

    }
    catch (err) {
        console.log(err);
    }

});
// auth end
module.exports = authRouter;