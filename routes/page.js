const express = require('express');

const router = express.Router();

// router.get('/', (req, res) => {
//     let query = "SELECT * FROM `sanpham`";
//     db.query(query, (err, result) => {
//            // console.log(result);
//             res.render('index', { title: 'Sản Phẩm',product:result});
//         })
// });

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/review', (req, res) => {
    let query = "select * from sanpham,khachhang,review where sanpham.idSP= review.idSP and khachhang.id=review.id limit 7";
    db.query(query, (err, result) => {
        console.log(result);
        res.render('review', { review: result, dataCustomer: { id: req.session ? req.session.id : false, name: req.session ? req.session.name : false } });
    })
});

router.get('/login_admin', (req, res) => {
    res.render('login_admin');
});
router.get('/register_admin', (req, res) => {
    res.render('register_admin');
});

router.get('/cart', (req, res) => {
    res.render('cart', {dataCustomer: { id: req.session ? req.session.id : false, name: req.session ? req.session.name : false }});
});

router.get('/end', (req, res) => {
    res.render('end',{ dataCustomer: { id: req.session ? req.session.id : false, name: req.session ? req.session.name : false }});
});
 router.get('/thanhtoan', (req, res) => {
        let query = "Select * from `phuongthuctt`";
        db.query(query, (err, result) => {
            res.render('thanhtoan', { pay: result ,dataCustomer: { id: req.session ? req.session.id : false, name: req.session ? req.session.name : false }});
        })
    });

    module.exports = router;
