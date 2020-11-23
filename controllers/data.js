const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(
  '329801232028-pf58k17949uq2d8kkt3p499g5skcaeni.apps.googleusercontent.com',
  'fipf3NCfPWdOS1AeNC87FNQB',
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: "1//0fHZT9e9nKNKHCgYIARAAGA8SNwF-L9IredZlMpIB47-oEmX5dc5Yhili1oZGu0MOF5e0MMHs3CFKm39p-KKWvb2lJ0RyMEf2Dj4"
});
async function sendMail(email, carts) {
  const accessToken = oauth2Client.getAccessToken()
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "cnttk59a@gmail.com",
      clientId: "329801232028-pf58k17949uq2d8kkt3p499g5skcaeni.apps.googleusercontent.com",
      clientSecret: "fipf3NCfPWdOS1AeNC87FNQB",
      refreshToken: "1//0fHZT9e9nKNKHCgYIARAAGA8SNwF-L9IredZlMpIB47-oEmX5dc5Yhili1oZGu0MOF5e0MMHs3CFKm39p-KKWvb2lJ0RyMEf2Dj4",
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const message = {
    from: "cnttk59a@gmail.com",
    to: email,
    subject: "Xác nhận đặt hàng",
    html: `<div><p>Bạn đã đặt hàng thành công</p>
            <p>Danh sách sản phẩm bạn đã đặt mua:</p><br>
            ${carts}</div>`
  };
  smtpTransport.sendMail(message, (error) => {
    if (err) {
      console.log(err)
    } else { }
  });
}


module.exports = {
  showData: function (req, res) {
    let query = "SELECT * FROM `sanpham`,thuonghieu where sanpham.idTH= thuonghieu.idTH ";
    let query2 = "select * from `sanpham` where rate ='5'";
    let query3 = "select * from sanpham, thuonghieu where sanpham.idTH= thuonghieu.idTH and hinhanh like '%newarrive%'";
    let query4 = "select sanpham.idSP ,tenSP, hinhanh, gia, chitiet,tenTH, sum(soluongSP) as sl FROM  `thuonghieu`, `sanpham`, `chitietdh` where chitietdh.idSP = sanpham.idSP and sanpham.idTH= thuonghieu.idTH group by idSP order by sl desc limit 10";
    let query5 = "select * from thuonghieu";
    db.query(query, (err, result) => {
      db.query(query2, (err, result2) => {
        db.query(query3, (err, result3) => {
          db.query(query4, (err, result4) => {
            db.query(query5, (err, result5) => {
              console.log(req.session.name);
              res.render('index', { title: 'Sản Phẩm', product: result, rate: result2, newarrive: result3, bestseller: result4, brand: result5, dataCustomer: { id: req.session ? req.session.id : false, name: req.session ? req.session.name : false } });
            });
          });
        });
      });
    });
  },
  logOut: function (req, res) {
    req.session = null;
    res.json({ stt: true })
  },
  showDetailProduct: function (req, res) {
    let query3 = "select * from khachhang, sanpham, review where khachhang.id=review.id and sanpham.idSP=review.idSP and sanpham.idSP='" + req.params.idSP + "'";
    let query2 = "select sanpham.idSP ,tenSP, hinhanh, gia, chitiet,tenTH, sum(soluongSP) as sl FROM  `thuonghieu`, `sanpham`, `chitietdh` where chitietdh.idSP = sanpham.idSP and sanpham.idTH= thuonghieu.idTH group by idSP order by sl desc limit 12";
    let query = "SELECT * FROM sanpham ,thuonghieu where thuonghieu.idTH= sanpham.idTH and  idSP ='" + req.params.idSP + "' ";
    db.query(query, (err, result) => {
      db.query(query2, (err, result2) => {
        db.query(query3, (err, result3) => {
          console.log(result3);
          res.render('detail_product', { name: "product", detail: result[0], random: result2, comment: result3, dataCustomer: { id: req.session ? req.session.id : false, name: req.session ? req.session.name : false } });
        })
      });
    });
  },
  showBrandDetail: function (req, res) {
    let query = "SELECT * FROM sanpham, thuonghieu where thuonghieu.idTH= sanpham.idTH and thuonghieu.idTH = '" + req.params.idTH + "'";
    let query2 = "select * from sanpham where idTH='" + req.params.idTH + "'";
    db.query(query, (err, result) => {
      db.query(query2, (err, result2) => {
        // console.log(result2);
        res.render('brand_detail', { detail_brand: result[0], brand_product: result2 , dataCustomer: { id: req.session ? req.session.id : false, name: req.session ? req.session.name : false }  });
      })
    });
  },
  searchProduct: function (req, res) {
    // console.log("params:",req);
    let query = "select * from sanpham, thuonghieu where sanpham.idTH = thuonghieu.idTH and tenSP like '%" + req.query.key + "%'";
    db.query(query, (err, result) => {
      // console.log(result);
      res.render('search', { timkiem: result, dataCustomer: { id: req.session ? req.session.id : false, name: req.session ? req.session.name : false } });
    });
  },
  addOrder: function (req, res) {
    const mailKH = req.body.email
    const mailData = req.body.productConfirm
    let query1 = "select * from khachhang,donhang,chitietdh where khachhang.id=donhang.id and donhang.idDH=chitietdh.idDH";
    db.query(query1, (err, result1) => {
      db.query(query2, (err, result2) => {
        console.log(err)
        var today = new Date();
        var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        console.log(result2)
        let query3 = `insert into donhang values(null,'${result2.insertId}','${date}','1','${req.body.total}',null)`;
        db.query(query3, (err, result3) => {
          let threeId = result3.insertId;
          cartItems = JSON.parse(req.body.cartItems);
          cartItems.forEach(element => {
            let insertData = {
              idDH: threeId,
              idSP: element.id,
              soluongSP: element.incart
            }
            let query4 = `insert into chitietdh SET ?`;
            db.query(query4, insertData, (err, result4) => {
              if (err) { console.log(err) } else {

              }
            });
          })
          sendMail(mailKH, mailData)
          res.json({ stt: true });
        })

      })
    })
  },
  addComment: function (req, res) {
    let query = "Select * from `review`";
    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    db.query(query, (err, result) => {
      if (req.session.id) {
        let insertData = {
          id: req.session.id,
          idSP: req.body.idSP,
          noidung: req.body.commentData,
          ngayreview: date,
          anhreview: '',
        }
        let query4 = `insert into review SET ?`;
        db.query(query4, insertData, (err, result4) => {
          if (err) { console.log(err) } else {
          res.json({stt:true})
          }
        });
      }
     
    })
  }

}
