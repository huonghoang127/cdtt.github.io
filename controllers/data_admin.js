const { json } = require("express");

module.exports = {
    //show data from database
    showDataAdmin: function (req, res) {
        let query = "SELECT * FROM `sanpham` limit 5";
        let query2 = "Select * from `sanpham` WHERE idSP ='" + req.params.idSP + "'";
        let query3 = "select sanpham.idSP ,tenSP, hinhanh, gia, chitiet,tenTH, sum(soluongSP) as sl FROM  `thuonghieu`, `sanpham`, `chitietdh` where chitietdh.idSP = sanpham.idSP and sanpham.idTH= thuonghieu.idTH group by idSP order by sl desc limit 10";
        let query4 = "SELECT SUM(tongtien) as tongtien, MONTH(ngaylap) AS thang FROM donhang WHERE YEAR(ngaylap) = 2020 GROUP BY MONTH(ngaylap) ORDER BY SUM(tongtien) DESC";
        db.query(query, (err, result) => {
            db.query(query2, (err, result2) => {
                db.query(query3, (err, result3) => {
                    db.query(query4, (err, result4) => {
                        // console.log(result4);
                        res.render('admin', { product: result, sanphams: result2[0], TKSP : result3, doanhthu: result4 });
                    })
                })
            })
        })
    },
    showProductAdmin: function(req,res) {
        let query = "SELECT * FROM `sanpham`";
        let query2 = "Select * from `sanpham` WHERE idSP ='" + req.params.idSP + "'";
        db.query(query,(err,result) => {
            db.query(query2, (err, result2)=>{
                res.render('sanpham', {product:result, sanphams:result2});
            })
        })
    },
    showBrandAdmin: function (req, res) {
        let query = "SELECT * FROM `thuonghieu`";
        db.query(query, (err, result) => {
            // console.log(result);
            res.render('admin_brand', { brand: result });
        })
    },
    showCustomerAdmin: function (req, res) {
        let query = "SELECT * FROM `khachhang`";
        db.query(query, (err, result) => {
            // console.log(result);
            // console.log("ngay sinh cua khach hang 1:",result[0].ngaysinh);
            res.render('admin_customer', { customer: result });
        })
    },
    showOrderAdmin: function (req, res) {
        let query = "SELECT * FROM donhang,khachhang where khachhang.id= donhang.id";
        db.query(query, (err, result) => {
            // console.log(result);
            res.render('admin_order', { order: result });
        })
    },

    //product
    addProductSubmit: function (req, res) {
        // console.log("requesting: ",req);
        // Query to get all product Ids
        let queryProduct = "Select * from `sanpham`";
        db.query(queryProduct, (err, result) => {
            // console.log("products:", result);
            // let finalProduct = result.pop();
            // let finalID = finalProduct.idSP;
            // // Query to insert a product;
            // let query = `INSERT INTO sanpham VALUES('${finalID + 1}','${req.body.idTH}','${req.body.idLoai}','${req.body.tenSP}','${req.body.hinhanh}','${req.body.chitiet}','${req.body.rate}','${req.body.gia}','${req.body.status}')`;
            let query = `insert into sanpham values(null,'${req.body.idTH}','${req.body.idLoai}','${req.body.tenSP}','${req.body.hinhanh}','${req.body.chitiet}','${req.body.rate}','${req.body.gia}','${req.body.status}')`;
            // After querying to get new ID move to another query to insert 
            db.query(query, (err, result) => {
                // console.log("result after querying", result);
                if (err) { console.log(err) }
                res.redirect('/sanpham');
            });
        })
        // console.log("query",query);
        // console.log("respond: ", res)

    },
    editProduct: function (req, res) {
        // console.log("clicked edit");
        let query = "Select * from `sanpham` WHERE idSP ='" + req.params.idSP + "'";
        db.query(query, (err, result) => {
            // console.log("query when a product is selected:", result);
            res.render('edit_form_product', { sanpham: result[0] });
        })
    },
    editProductSubmit: function (req, res) {
        let query = "update `sanpham` set idTH='" + req.body.idTH + "',idLoai='" + req.body.idLoai + "', tenSP='" + req.body.tenSP + "', hinhanh='" + req.body.hinhanh + "', chitiet='" + req.body.chitiet + "',rate='" + req.body.rate + "',gia='" + req.body.gia + "',status='" + req.body.status + "' where idSP='" + req.params.idSP + "'";
        db.query(query, (err, result) => {
            // console.log(result);
            res.redirect('/sanpham');
        })
    },
    deleteProduct: (req, res) => {
        let query = "delete FROM `sanpham` WHERE idSP ='" + req.params.idSP + "'";
        db.query(query, (err, result) => {
            // console.log(result);
            res.redirect('/sanpham');
        });
    },

    // Brand
    addBrandSubmit: (req, res) => {
        let query = "Select * from `thuonghieu`";
        db.query(query, (err, result) => {
            let query = `insert into thuonghieu values(null,'${req.body.tenTH}','${req.body.logo}','${req.body.mota}')`;
            // After querying to get new ID move to another query to insert 
            db.query(query, (err, result) => {
                console.log("result after querying", result);
                if (err) { console.log(err) }
                res.redirect('admin_brand');
            });
        })

    },
    editBrand: function (req, res) {
        let query = "Select * from `thuonghieu` WHERE idTH ='" + req.params.idTH + "'";
        db.query(query, (err, result) => {
            console.log("query when a product is selected:", result);
            res.render('edit_form_brand', { thuonghieu: result[0] });
        })
    },
    editBrandSubmit: function (req, res) {
        let query = "update `thuonghieu` set tenTH ='" + req.body.tenTH + "',logo='" + req.body.logo + "', mota='" + req.body.mota + "' where idTH='" + req.params.idTH + "'";
        db.query(query, (err, result) => {
            console.log(result);
            res.redirect('/admin_brand');
        })
    },
    deleteBrand: (req, res) => {
        let query = "delete FROM `thuonghieu` WHERE idTH ='" + req.params.idTH + "'";
        db.query(query, (err, result) => {
            console.log(result);
            res.redirect('admin_brand');
        });
    },

    //customer
    addCustomerSubmit: (req, res) => {
        let query = "SELECT * FROM donhang,khachhang where khachhang.id= donhang.id";
        db.query(query, (err, result) => {
            let query = `insert into khachhang values(null,'${req.body.hoten}','${req.body.ngaysinh}','${req.body.email}','${req.body.diachi}','${req.body.matkhau}','${req.body.sdt}')`;
            // After querying to get new ID move to another query to insert 
            db.query(query, (err, result) => {
                // console.log("result after querying", result);
                if (err) { console.log(err) }
                res.redirect('admin_customer');
            });
        })

    },
    editCustomer: function (req, res) {
        let query = "Select * from `khachhang` WHERE id ='" + req.params.id + "'";
        db.query(query, (err, result) => {
            res.render('edit_form_customer', { khachhang: result[0] });
        })
    },
    editCustomerSubmit: function (req, res) {
        let query = "update `khachhang` set hoten='" + req.body.hoten + "',ngaysinh='" + req.body.ngaysinh + "', email='" + req.body.email + "', diachi='" + req.body.diachi + "', matkhau='" + req.body.matkhau + "',sdt='" + req.body.sdt + "' where id='" + req.params.id + "'";
        db.query(query, (err, result) => {
            // console.log(result);
            res.redirect('/admin_customer');
        })
    },
    deleteCustomer: function (req, res)  {
        let query = "delete FROM `khachhang` WHERE id ='" + req.params.id + "'";
        db.query(query, (err, result) => {
            console.log(result);
            res.redirect('admin_customer');
        });
    },

    //Order
    deleteOder: function(req, res){
        // console.log(req.body)
        let query1 = "delete from `chitietdh` where idDH='"+req.params.idDH+"'";
        let query2 = "delete FROM `donhang` WHERE idDH ='" + req.params.idDH + "'";
        db.query(query1, (err, result) => {
            db.query(query2, (err,result2) => {
                console.log(result2);
                res.redirect('/admin_order');
            })
        });
    }

}
