const { ShoppingModel } = require('../Models/shoppingDB')


// CRUD shopping

const createShopping = async (req, res, next) => {
    let shoppingData = req.body
    try {
        if (!shoppingData) {
            throw new Error("data not inserted")

        }
        let shoD = await ShoppingModel.create(shoppingData)
        res.status(200).send("create shopping succefuly")
    } catch (err) {
        console.log(err)
        next(err)
    }

}

const getAllShopping = async (req, res, next) => {
    console.log(ShoppingModel)
    try {
        let ordersData = await ShoppingModel.find()
        console.log(ordersData)
        res.json(ordersData)
    } catch (e) {
        console.log(e)
    }
}

const updateShopping = async (req, res, next) => {
    let body = req.body
    let { id } = req.params
    try {
        if (!id || !body) {
            throw new Error("data not inserted")
        }
        const newShop = await ShoppingModel.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        console.log(newShop)
        res.status(200).send("update shopping succeccfuly")

    } catch (err) {
        next(err)
    }

}

const deleteShopping = async (req, res, next) => {

    let { id } = req.params
    console.log('delete shopping')
    try {
        const shopOld = await ShoppingModel.findOneAndDelete({ _id: id }).then((dd) => {
            console.log(dd)
        }).catch((e) => {

            throw new Error("not found in database")
        })

        res.status(200).json({ msg: 'deleted shopping successful' })

    } catch (err) {
        next(err)

    }
}
// ***************************************
const getShopByID = async (req, res, next) => {
    let { id } = req.params
    try {
        if (!id) {
            res.send('id not added in route')
        }
        let shopData = await ShoppingModel.findOne({ _id: id })
        if (!shopData) {
            res.send('shopping not found')
            throw new Error('not in DB')
        }
        res.status(200).json({ shopping: shopData })

    } catch (error) {
        next(error)
    }
}

module.exports = { createShopping, getAllShopping, updateShopping, deleteShopping, getShopByID }