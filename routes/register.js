module.exports = {
    addCustomer: function (req, res) {

        res.render('register', { title: "Register", name: "Đăng Ký", data: req.params.idKH });//employeeNumber
    },
    addCustomerSubmit: function (req, res) {
        let query = `INSERT INTO khachhang VALUES('${req.body.hoten}','${req.body.ngaysinh}',' ${req.body.sdt}','${req.body.diachi}',
                                                ' ${req.body.matkhau}')`;
        //console.log(query);
        db.query(query, (err, result) => {
            // console.log(result);
            res.redirect('/');
        });
    }
}