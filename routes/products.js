const express = require("express");
const router = express.Router();
const {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProdBySub_CategoryName, 
  getSellerAds
} = require("../Controllers/products");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/get/:id", getProduct);
router.get("/getUserAds/:userId", getSellerAds);
router.get("/getbysubcateboryname",getProdBySub_CategoryName)
router.get("/get", getAllProducts);
router.post("/add", verifyJWT ,postProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
