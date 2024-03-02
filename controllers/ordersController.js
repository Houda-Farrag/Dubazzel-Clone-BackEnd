const { OrdersModel } = require('../Models/ordersDB')

// CRUD orders

const createOrder = async (req, res, next) => {

    let orderData = req.body
    try {
        if (!orderData) {
            throw new Error("data not inserted")
        }
        let ordD = await OrdersModel.create(orderData)
        res.status(200).send("create order Succeccfuly")
    } catch (err) {
        console.log(err)
        next(err)
    }

}

const getAllOrders = async (req, res, next) => {
    try {
        let ordersData = await OrdersModel.find({})
        console.log(ordersData)
        res.status(200).json({ data: ordersData })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

const updateOrders = async (req, res, next) => {

    let body = req.body
    let { id } = req.params
    try {
        if (!id || !body) {
            throw new Error("data not inserted")
        }
        const orderUser = await OrdersModel.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        console.log(orderUser)
        res.status(200).send("order was updated")

    } catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}

const deleteOrders = async (req, res, next) => {
    let { id } = req.params
    try {
        if (!id) {
            throw new Error("data not inserted")
        }
        const orderOld = await OrdersModel.findOneAndDelete({ _id: id }).then((dd) => {
            console.log(dd)
        }).catch((e) => {
            throw new Error("not found in database")
        })

        res.status(200).send('deleted order successful')

    } catch (err) {
        next(err)
    }
}

// **************************************************
const getOrderByID = async (req, res, next) => {
    let { id } = req.params
    try {
        if (!id) {
            res.send('id not added in route')
        }
        let orderData = await OrdersModel.findOne({ _id: id })
        if (!orderData) {
            res.send('order not found')
            throw new Error('not in DB')
        }
        res.status(200).json({ order: orderData })

    } catch (error) {
        next(error)
    }
}



module.exports = { createOrder, getAllOrders, updateOrders, deleteOrders, getOrderByID }
