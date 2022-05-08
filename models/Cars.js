const mongoose = require('mongoose');

const Cars = mongoose.model('Cars', {
    brand: String,
    model: String,
    sign: String,
    fabrication: Number,
    type: String,
    version: String,
    form: String,
});

module.exports = Cars;