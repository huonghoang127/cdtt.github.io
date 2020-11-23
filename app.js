const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require ('cookie-session');



dotenv.config({ path: './.env' });

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb' ,extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: ['key1'],
    maxAge:365 * 24 * 60 * 60* 1000,
    httpOnly: true,
    secure: false,
}));

app.listen(8080);


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");
// app.use(express.static(__dirname + "/public"));
app.use('/', require('./routes/page'));
app.use('/auth', require('./routes/auth'));


const { showDataAdmin, showBrandAdmin, showCustomerAdmin, showOrderAdmin,showProductAdmin, addProductSubmit,editProduct, editProductSubmit, deleteProduct, addBrandSubmit, editBrand, editBrandSubmit ,deleteBrand, addCustomerSubmit, editCustomer,editCustomerSubmit ,deleteCustomer, deleteOder } = require('./controllers/data_admin');
//show database
app.get("/admin", showDataAdmin);
app.get("/sanpham", showProductAdmin);
app.get("/admin_brand", showBrandAdmin);
app.get("/admin_customer", showCustomerAdmin);
app.get("/admin_order", showOrderAdmin);
//product action
app.post("/sanpham", addProductSubmit);
app.get("/edit_form_product/:idSP",editProduct);
app.post("/edit_form_product/:idSP", editProductSubmit);
app.get("/sanpham/delete/:idSP", deleteProduct);
//brand action
app.post("/admin_brand",addBrandSubmit);
app.get("/edit_form_brand/:idTH",editBrand);
app.post("/edit_form_brand/:idTH", editBrandSubmit);
app.get("/admin_brand/delete/:idTH", deleteBrand);
//customer action
app.post("/admin_customer", addCustomerSubmit);
app.get("/edit_form_customer/:id",editCustomer);
app.post("/edit_form_customer/:id", editCustomerSubmit);
app.get("/admin_customer/delete/:id", deleteCustomer);

//Order
app.get("/admin_order/delete/:idDH", deleteOder);

const { showData, showDetailProduct, showBrandDetail , searchProduct, addOrder,logOut,addComment} = require('./controllers/data');
app.get("/", showData);
app.get("/product/:idSP", showDetailProduct);
app.get("/brand/:idTH", showBrandDetail);
app.get("/search/", searchProduct);
app.post("/logOut", logOut);
app.post("/detail_product",addComment);


//Confirm Order and add new Order
app.post("/end", addOrder);


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dateStrings : process.env.DATABASE_DATESTRING,
    database: process.env.DATABASE
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

//send Email

// const option = {
//     service: 'gmail',
//     auth: {
//         user: 'mail.toidicode@gmail.com', // email hoặc username
//         pass: '*******' // password
//     }
// };
// const transporter = nodemailer.createTransport(option);

// transporter.verify(function(error, success) {
//     // Nếu có lỗi.
//     if (error) {
//         console.log(error);
//     } else { //Nếu thành công.
//         console.log('Kết nối thành công!');
//     }
// });