const mongoose = require('mongoose');

const schema = mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },


});

const SubCatModal = mongoose.model("SubCat", schema);
module.exports = SubCatModal;