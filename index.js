const path = require('path');
const mongooseConnect = require("mongoose")
const express = require('express')
const multer = require('multer');
const cookieParser = require('cookie-parser');
const app = express()
const cors = require('cors')
app.use(cookieParser());
const { ordersRoute } = require('./routes/ordersRoute')
const { propertiesRoute } = require('./routes/propertiesRoute')
const { shoppingRoute } = require('./routes/shoppingRoute')
const { adminsRoute } = require('./routes/adminsRoute')
const productRoute = require('./routes/products');
const categoryRoute = require('./routes/categories');
const userRoute = require('./routes/users');
const regiserRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout')
const refreshRoute = require('./routes/refreshToken')
const registerAdminRoute = require('./routes/registerAdmin')
const loginAdminRoute = require('./routes/loginAdmin')
const logoutAdminRoute = require('./routes/logoutAdmin')
const routerSubCategory = require('./Routes/sub-categories')
const RatingReviewsrouter = require('./routes/ReviewsAndRatings')
const Chatrouter = require('./routes/chat')
// const importcompany=require("./Routes/company.js")
// ---------------- connect to database local and 
const DBlocal = "mongodb://localhost:27017/Dubazzile_Version_2"
const DBurl = 'mongodb+srv://Mena:dubizzle123456@dubizzle.udouey4.mongodb.net/Dubizzle?retryWrites=true&w=majority'

mongooseConnect.connect(DBurl).then((data) => {
    console.log('connected to dubizzle in atlas')

}).catch((err) => {
    console.log('error' + err)
})


app.set('views', 'views');


app.use(cors()) // search (cors origins)
app.use(express.json())

app.use("/api/register", regiserRoute)
app.use('/registerAdmin', registerAdminRoute);
app.use("/api/login", loginRoute);
app.use('/loginAdmin', loginAdminRoute);
app.use("/refreshToken", refreshRoute)
app.use("/api/logout", logoutRoute)
app.use('/logoutAdmin', logoutAdminRoute)


// Multer Setup for storing imaegs
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage })


// creating upload endpoint
app.use('/images', express.static('./upload/images'))

app.post('/upload', upload.array('product', 10), (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: 0, message: 'Internal server error' });
    }
});

app.use('/orders', ordersRoute)
app.use('/shoppings', shoppingRoute)
app.use('/properties', propertiesRoute)
app.use('/admins', adminsRoute)
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
app.use('/products', productRoute);
// app.use("/company",importcompany)

app.use('/reviews-rating', RatingReviewsrouter);
app.use('/sub-category', routerSubCategory);
app.use('/chat', Chatrouter);

app.all('*', (req, res, next) => {
    res.send(`<h1> welcom Dubazzel server you don't select any path</h1><br/> <a href="http://localhost:3000/properties/alldata"></a>`)
})



// app.all('/', (req, res, next) => {
//     res.send('sorry this path not supported now')
// })








//--------------- error handling midle ware --------------
app.use((err, req, res, next) => {
    res.json({ msg: err })
})



const port = 3000
app.listen(port, () => {
    console.log("server connected port : " + port)
})


