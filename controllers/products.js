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
        const newProduct = new productModel({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          images: req.body.images,
          sellerId: req.body.sellerId,
          price_type: req.body.price_type,
          location: req.body.location,
          subCategoryId: req.body.subCategoryId,
          contact_type: req.body.contact_type,
          phoneNumber: req.body.phoneNumber,
          propertyType: req.body.propertyType,
          area: req.body.area,
          amenities: req.body.amenities,
          bedRooms: req.body.bedRooms,
          bathRooms: req.body.bathRooms,
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
