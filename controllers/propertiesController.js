const { propertiesModel } = require('../Models/propertiesDB')

// CRUD properties

const createProperties = async (req, res, next) => {
    let propertiesData = req.body
    try {
        if (!propertiesData) {
            throw new Error("data not inserted")

        }
        let propD = await propertiesModel.create(propertiesData)
        res.status(200).send("create prop succefuly")
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const getAllProperties = async (req, res, next) => {
    try {
        let propData = await propertiesModel.find()
        console.log(propData)
        res.status(200).json(propData)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

const updateProperties = async (req, res, next) => {
    let body = req.body
    let { id } = req.params
    try {
        if (!id || !body) {
            throw new Error("data not inserted")
            res.status(400).send('enter data')
        }
        const newprop = await propertiesModel.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        console.log(newprop)
        res.status(200).send('update properties succeccfully')

    } catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}

const deleteProperties = async (req, res, next) => {
    let { id } = req.params
    console.log('delete propertes')

    try {
        if (!id) {
            throw new Error("id not inserted")
            res.status(400).send('enter data')
        }
        const propOld = await propertiesModel.findOneAndDelete({ _id: id }).then((dd) => {
            console.log(dd)
        }).catch((e) => {

            throw new Error("not found in database")
        })

        res.status(200).json({ msg: 'deleted propOld successful' })

    } catch (err) {
        next(err)
    }
}
// *******************************************
const getPropByID = async (req, res, next) => {
    let { id } = req.params
    try {
        if (!id) {
            res.send('id not added in route')
        }
        let propData = await propertiesModel.findOne({ _id: id })
        if (!propData) {
            res.send('properties not found')
            throw new Error('property not in DB')
        }
        res.status(200).json({ property: propData })

    } catch (error) {
        next(error)
    }
}

module.exports = { createProperties, getAllProperties, updateProperties, deleteProperties ,getPropByID}