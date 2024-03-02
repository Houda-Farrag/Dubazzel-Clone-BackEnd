const express=require('express');
const router=express.Router()

// const{getAllCompanies,getById,saveCompany, updateCompanyById,}=require("../controllers/company.js")


router.get("/",getAllCompanies)

       //get by id
 router.get('/:id',getById)

 router.post("/",saveCompany)
 router.patch("/",updateCompanyById)

 module.exports=router