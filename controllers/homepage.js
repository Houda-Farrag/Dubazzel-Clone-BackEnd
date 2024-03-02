const {productModel} = require('../models/products');
// const {categoryModel} = require ('../models/categories.js')

const getAllProducts = async (req, res, next) => {
    try {
        let products = await productModel.find({});
        let categories = await categoryModel.find({})
        if (!products) {
            return res.json({ MSG: 'There is something wrong' });
        }
        res.render('home',{products , categories})
    } catch (err) {
        res.status(401).json({ MSG: "Can not load products" });
    }
}

module.exports = { getAllProducts };
