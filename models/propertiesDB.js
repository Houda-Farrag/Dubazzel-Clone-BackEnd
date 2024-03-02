const mongoose = require('mongoose');
// {"name": "mahmoud", "category":"category1","description":"aye haja","price":300 , "location":[{"latitude":"3232","longtude":"3232"}]}
const propertiesSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true,
    },
    "categoryId": {
        type: Number,
        required: true
    },
    "description": {
        type: String,
    },

    "price": {
        type: Number,
        required: true,
    },
    "location": [{
        "latitude": {
            type: String,
            required: true
        },
        "longtude": {
            type: String,
            required: true
        }, _id: false
    }],

}, { timestamps: true }, { collection: 'properties' });

const propertiesModel = mongoose.model("properties", propertiesSchema)

module.exports = { propertiesModel }

