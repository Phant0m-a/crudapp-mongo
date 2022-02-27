const express = require('express');
const CatModal = require('../modals/catModal');
const SubCatModal = require('../modals/subCatModal');
const ProductModal = require('../modals/productModal');
const {
    saveVideo,
    saveImage,
    saveFile,
    deleteFile
} = require('../utils/file_handler');
const productRouter = express.Router();

// get
productRouter.get("/", async (req, res) => {
    const cats = await CatModal.find({});

    const products = await ProductModal.find({}).populate('category').exec();
    res.send({ products, cats });
})
// post
productRouter.post("/", async (req, res) => {

    const {
        category,
        subCategory,
        name,
        price,
        inStock,
        enable,
    } = req.body;

    let image = '';
    if (req.files) {
        if (req.files.image) {

            let url = await saveImage(req.files.image);
            if (url != false)
                image = url;
        }
    }

    const newProduct = ProductModal({
        category: category,
        subcategory: subCategory,
        name: name,
        image: image,
        price: price,
        inStock: inStock ?? 3,
        enable: enable,
    });


    try {
        await newProduct.save();
        res.status(200).send({ success: true, message: 'Product added successfully!' });
    } catch (err) {

        res.status(300).send({ success: false, message: 'Some thing went wrong!', error: err });
    }
});


// put
productRouter.put('/', async (req, res) => {

    const {
        id,
        name,
        category,
        price,
        enable
    } = req.body;

    const product = await ProductModal.findById(id);



    if (req.files && req.files.image) {
        await deleteFile(`${product.image}`);
        let url = await saveImage(req.files.image);
        if (url != false) {
            product.image = url;
        }
    }


    product.name = name ?? product.name;
    product.id = id ?? product.id;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.enable = enable ?? product.enable;




    try {
        await product.save();
        res.status(200).send({ success: true, message: 'Product updated successfully!' });
    } catch (err) {

        res.status(300).send({ success: false, message: 'Some thing went wrong!', error: err });
    }
})


// delete
productRouter.delete('/', async (req, res) => {

    const {
        id
    } = req.body;

    const product = await ProductModal.findById(id);

    await deleteFile(`${product.image}`);

    try {
        await product.remove();
        res.status(200).send({ success: true, message: 'Product Deleted successfully!' });
    } catch (err) {

        res.status(300).send({ success: false, message: 'Some thing went wrong!', error: err });
    }
})

module.exports = productRouter;