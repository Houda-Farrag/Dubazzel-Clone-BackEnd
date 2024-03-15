const express = require("express");
const router = express.Router();
const {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProdBySub_CategoryName
} = require("../Controllers/products");

router.get("/get/:id", getProduct);
router.get("/getbysubcateboryname",getProdBySub_CategoryName)
router.get("/get", getAllProducts);
router.post("/add", postProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
