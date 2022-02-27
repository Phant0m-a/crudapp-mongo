const express = require('express');
const SubCatModal = require('../modals/subCatModal');
const subcatRouter = express.Router();


subcatRouter.get("/", async (req, res) => {
    const list = await SubCatModal.find({});
    try {

        res.status(200).send({ success: true, data: list });
    } catch (err) {
        res.status(300).send({ success: false, message: `something went wrong ${err}` });

    }
});


subcatRouter.post("/", async (req, res) => {
    const {
        title
    } = req.body;
    const newSubCat = SubCatModal({
        title: title
    });

    try {
        await newSubCat.save();
        res.status(200).send({ success: true, message: 'SubCatagory Added Successfully!' });
    }
    catch (err) {
        res.status(300).send({ success: false, message: `something went wrong! ${err}` });
    }



});


module.exports = subcatRouter;