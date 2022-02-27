const express = require('express');
const CatModal = require('../modals/catModal');
const catRouter = express.Router();


catRouter.get("/", async (req, res) => {
    const list = await CatModal.find({});
    try {

        res.status(200).send({ success: true, data: list });
    } catch (err) {
        res.status(300).send({ success: false, message: `something went wrong ${err}` });

    }
});


catRouter.post("/", async (req, res) => {
    const {
        title
    } = req.body;
    const newCat = CatModal({
        title: title
    });

    try {
        await newCat.save();
        res.status(200).send({ success: true, message: 'Catagory Added Successfully!' });
    }
    catch (err) {
        res.status(300).send({ success: false, message: `something went wrong! ${err}` });
    }



});


module.exports = catRouter;