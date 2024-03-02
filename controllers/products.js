const {productModel} = require("../models/products")

const getProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById({ _id: id });
        console.log(product)
        res.status(201).json({product}); 
    } catch (err) {
        res.status(401).json({ MSG: "There is something went wrong in your product id" });
    }
}

const getAllProducts =  async (req, res, next) => {
    try {
        console.log(req.user);
        console.log(req.roles);
        const products = await productModel.find({});
        res.status(201).json({ products });

    } catch (err) {
        res.status(401).json({ MSG: "There is something went wrong in getting all proucts" });
    }
}

const postProduct = async (req,res,next) =>{
    const data = req.body
    console.log(data);
    try{
        const products = await productModel.find({});
        let id;
        if (products.length > 0) {
          let last_product_array = products.slice(-1);
          let last_product = last_product_array[0];
          id = last_product.id + 1;
        } else {
          id = 1;
        }
        const newProduct = new productModel({
          id: id,
          name: req.body.name,
          description: req.body.description,
          images: req.body.images,
          sellerData: req.body.sellerData,
          price_type: req.body.price_type,
          category: req.body.category,
          price: req.body.price,
          location: req.body.location,
          subCategory: req.body.subCategory,
        });
        await newProduct.save();
        res.status(201).json({ success: 1, product: newProduct });
    }
    catch(err){
        res.status(400).json({MSG:'there is something wrong in your inserted data'})
    }
}

const updateProduct = async (req,res,next)=>{
    const {id} = req.params;
    const updates = req.body
    try{
        const updatedProduct = await productModel.findOneAndUpdate({_id:id},updates,{new:true , runValidators:true})
        res.status(201).json({MSG:'Update Succesfully' , UpdatedProduct:updatedProduct})
    }
    catch(err){
        res.status(401).send('Something Went Wrong in updating')
    }
}

const deleteProduct =async (req,res,next)=>{
    const {id}=req.params
    try{
        const deletedProduct = await productModel.deleteOne({_id:id})
        res.json({MSG:`Your selected product with id : ${id} is now deleted`})
    }
    catch(err){
        res.json({MSG:'Can not delete your selected product please try again'})
    }
}

module.exports = {postProduct , getProduct , deleteProduct , updateProduct , getAllProducts}
