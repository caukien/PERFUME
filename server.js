const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const exLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('./middleware/session.js')

const authorRouter = require("./routers/authRoute");
const userRoute = require("./routers/userRoute");
const cateRoute = require("./routers/cateRoute.js");
const proRoute = require("./routers/productRoute.js");
const cartRoute = require('./routers/cartRoute.js');
const orderRoute = require('./routers/orderRoute.js');
const orderDetailRoute = require('./routers/orderDetailRoute.js');
const path = require('path');
dotenv.config();

// app.use(exLayout)
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.set('layout', './admin/home')
app.set("view engine", "ejs");
app.use(express.json());
app.use(session.sessionMiddleware)
app.use(cookieParser());
app.use('/image', express.static('image'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))

app.use(userRoute);
app.use(authorRouter);
app.use(cateRoute);
// app.use("/pro", proRoute);
app.use(proRoute);
app.use(cartRoute);
app.use('/order', orderRoute);
app.use('/orderdetail', orderDetailRoute);



// app.get('/admin', (req, res) => {
//     // console.log(req);
//     // return res.status(234).send('QUAY LAI DE BAN EI')
//     res.render('../views/admin/login')
// })
// app.get('*', (req, res) => {
//     console.log(req);
//     // return res.status(234).send('QUAY LAI DE BAN EI')
//     res.redirect('../views/client/index')
// })


mongoose.connect(process.env.MongoDB_URL).then(() => {
    console.log('Ket noi thanh cong DB')
    app.listen(PORT, () => {
        console.log(`Chay cong ${PORT}`)
    })
})
