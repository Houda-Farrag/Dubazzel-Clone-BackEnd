const {chatsModel} = require('../Models/chat')


const getAllProductChat = async(req,res,next)=>{
    try{
        const AllProductChat = await chatsModel.find({productID:req.params.prdId})
        res.status(200).json({"All Product Chat":AllProductChat})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


const deleteChatById = async(req,res,next)=>{
    // let {prdId} = req.params
    let {chatId} = req.params.chatId
    try{ 
        const deletedChat = await chatsModel.findOneAndDelete(chatId)
        res.status(200).json({message:"deleted Successfully","Deleted Chat":deletedChat})
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

const addChat = async(req,res,next)=>{
    let productID = req.params.prdId
    let {chat,sellerID,buyerID}  = req.body
    let chatObject = {chat,sellerID,buyerID,productID}
    try{
        const newchat = await chatsModel.create(chatObject)
        res.status(201).json({message:"chat added","Added chat":newchat})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {getAllProductChat,deleteChatById,addChat}