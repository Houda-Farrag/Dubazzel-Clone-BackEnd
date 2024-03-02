const reviewModel = require('../Models/ReviewsAndRatings')

const getAllReviews = async(req,res,next)=>{
    let {id} = req.params
    try{
        const reviews = await reviewModel.find({productID:id})
        res.status(200).json({allReviews:reviews})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const createNewReview = async (req,res,next) => {
    let review = req.body
    try{
       let newReview = await reviewModel.create(review)
       res.status(201).json({message:"created successfully",review:newReview})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const deleteReview = async (req,res,next)=>{
    let {id} = req.params
    try{
        let deletedReview = await reviewModel.findByIdAndDelete(id)
        res.status(200).json({message:"deleted successfully",deletedReview:deletedReview})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const updateReview = async (req,res,next) =>{
    let {id} = req.params
    let review = req.body
    try{
        let updatedReview = await reviewModel.findByIdAndUpdate(id,review,{new:true,runValidator:true})
        res.status(200).json({message:"updated successfully",updatedReview:updatedReview})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {getAllReviews,createNewReview,deleteReview,updateReview}