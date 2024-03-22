const { productModel } = require("../Models/products");

const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById({ _id: id }).populate({
      path: "sellerId",
      select: "-refreshToken",
    });
    res.status(200).json({ product });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong while fetching the product." });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    console.log(req.user);
    console.log(req.roles);
    const products = await productModel.find({});
    res.status(201).json(products);
  } catch (err) {
    res
      .status(401)
      .json({ MSG: "There is something went wrong in getting all proucts" });
  }
};

const getProductsBySearch = async (req, res, next) => {
  try {
    const searchQuery = req.query.name.toLowerCase();
    const sortedSearchQuery = searchQuery
      .split(" ")
      .map((word) => word.split("").sort().join(""))
      .join(" ");

    const products = await productModel.find().lean();

    const matchedProducts = products.filter((product) => {
      const sortedProductName = product.name
        .toLowerCase()
        .split(" ")
        .map((word) => word.split("").sort().join(""))
        .join(" ");
      return sortedProductName.includes(sortedSearchQuery);
    });

    res.json({matchedProducts: matchedProducts});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postProduct = async (req, res, next) => {
  const data = req.body;
  const userID = req.userId;
  console.log(data, userID);
  try {
    const newProduct = new productModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: req.body.images,
      sellerId: userID,
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
      brand: req.body.brand,
      model: req.body.model,
    });
    await newProduct.save();
    res.status(201).json({ success: 1, product: newProduct });
  } catch (err) {
    res
      .status(400)
      .json({ MSG: "there is something wrong in your inserted data" });
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id },
      updates,
      { new: true, runValidators: true }
    );
    res
      .status(201)
      .json({ MSG: "Update Succesfully", UpdatedProduct: updatedProduct });
  } catch (err) {
    res.status(401).send("Something Went Wrong in updating");
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productModel.deleteOne({ _id: id });
    res.json({ MSG: `Your selected product with id : ${id} is now deleted` });
  } catch (err) {
    res.json({ MSG: "Can not delete your selected product please try again" });
  }
};

const getProdBySub_CategoryName = async (req, res, next) => {
  const { sub_category } = req.body;
  if (!sub_category) res.json({ Msg: "enter sub category name" });
  try {
    const productData = await productModel.find({ subCategory: sub_category });
    res.json(productData);
  } catch (error) {
    res.json(error);
  }
};

const getSellerAds = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) res.json({ Msg: "please send user ID" });
  try {
    const Ads = await productModel.find({ sellerId: userId });
    res.json({ Ads: Ads });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  postProduct,
  getProduct,
  getSellerAds,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProdBySub_CategoryName,
  getProductsBySearch,
};
