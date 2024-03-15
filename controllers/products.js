const { productModel } = require("../Models/products")

const getProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById({ _id: id });
        console.log(product)
        res.status(201).json({ product });
    } catch (err) {
        res.status(401).json({ MSG: "There is something went wrong in your product id" });
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        console.log(req.user);
        console.log(req.roles);
        const products = await productModel.find({});
        res.status(201).json(products);

    } catch (err) {
        res.status(401).json({ MSG: "There is something went wrong in getting all proucts" });
    }
}

const postProduct = async (req, res, next) => {
    const data = req.body
    console.log(data);
    try {
        const products = await productModel.find({});
        // let id;
        // if (products.length > 0) {
        //     let last_product_array = products.slice(-1);
        //     let last_product = last_product_array[0];
        //     id = last_product.id + 1;
        // } else {
        //     id = 1;
        // }
        const newProduct = new productModel({

            name: req.body.name,
            description: req.body.description,
            images: req.body.images,
            sellerData: req.body.sellerData,
            price: req.body.price,
            location: req.body.location,
            subCategoryId: req.body.subCategoryId,
            contact_type: req.body.contact_type
            // price_type: req.body.price_type,
            // category: req.body.category,
        });
        await newProduct.save();
        res.status(201).json({ success: 1, product: newProduct });
    }
    catch (err) {
        res.status(400).json({ MSG: 'there is something wrong in your inserted data' })
    }
}

const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body
    try {
        const updatedProduct = await productModel.findOneAndUpdate({ _id: id }, updates, { new: true, runValidators: true })
        res.status(201).json({ MSG: 'Update Succesfully', UpdatedProduct: updatedProduct })
    }
    catch (err) {
        res.status(401).send('Something Went Wrong in updating')
    }
}

const deleteProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedProduct = await productModel.deleteOne({ _id: id })
        res.json({ MSG: `Your selected product with id : ${id} is now deleted` })
    }
    catch (err) {
        res.json({ MSG: 'Can not delete your selected product please try again' })
    }
}

const getProdBySub_CategoryName = async (req, res, next) => {
    const { sub_category } = req.body
    if (!sub_category) res.json({ Msg: "enter sub category name" })
    try {
        const productData = await productModel.find({ subCategory: sub_category })
        res.json(productData)

    } catch (error) {
        res.json(error)
    }
}

module.exports = { postProduct, getProduct, deleteProduct, updateProduct, getAllProducts, getProdBySub_CategoryName }
