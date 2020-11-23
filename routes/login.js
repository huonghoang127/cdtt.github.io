// module.exports =  function(req, res) {
//     let query = "SELECT * FROM `khachhang`";
//     db.query(query, (err, result) => {
//            // console.log(result);
//             res.render('login', { title: 'khachhang',khachhang:result});
//         });
//     res.render('login');
//  };
 module.exports =  {
    login: function(req,res){
      let query = "SELECT * FROM `khachhang` WHERE sdt ='" + req.params.user + "' and matkhau ='" + req.params.password + "'";
      db.query(query, (err, result) => {
          console.log(result);
          res.render('index')
         });
    }
 }