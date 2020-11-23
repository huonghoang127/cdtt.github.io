const cookieSession = require('cookie-session');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { response } = require('express');
var fs = require('fs');
// var result = fs.writeFileSync('Xin chào', 'message.txt', 'utf-8');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) => {
    try {
        const { email, matkhau } = req.body;

        if (!email || !matkhau) {
            return res.status(400).render('/login', {
                message:"Xin hãy nhập Email và mật khẩu!"
            })
            
        }

        db.query('SELECT * FROM khachhang WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(matkhau, results[0].matkhau))) {    
                res.status(401).render('login')
            } else {
                const id = results[0].id;
                req.session.email = results[0].email;
                req.session.name = results[0].hoten;
                req.session.id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                // console.log("the token:" + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");

            }
        })

    } catch (error) {

        console.log(error);
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        const { user, password } = req.body;

        if (!user || !password) {
            return res.status(400).render('login_admin', {
                message: 'Xin hãy nhập Email và mật khẩu!'
            })
        }

        db.query('SELECT * FROM admin WHERE user = ?', [user], async (error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                
                res.status(401).render('login_admin', {
                    message: 'Email hoặc Mật khẩu không chính xác!'
                })
            } else {
                const idadmin = results[0].idadmin;

                const token = jwt.sign({ idadmin }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("the token:" + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/admin");

            }
        })

    } catch (error) {

        console.log(error);
    }
}

exports.registerAdmin = (req, res) => {
    console.log(req.body);

    const { user, password, passwordConfirm } = req.body;
    db.query('SELECT user from admin WHERE user = ?', [user], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register_admin', {
                message: 'Email này đã được sử dụng!'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register_admin', {
                message: 'Mật khẩu không trùng khớp!'
            });
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO admin SET ?', { user: user, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('login_admin', {
                    message: 'Đăng ký thành công!'
                });
            }
        });
    });
}

exports.register = (req, res) => {
    console.log(req.body);

    const { hoten, email, ngaysinh, diachi, matkhau, matkhauXN } = req.body;
    db.query('SELECT email from khachhang WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'Email này đã được sử dụng!'
            })
        } else if (matkhau !== matkhauXN) {
            return res.render('register', {
                message: 'Mật khẩu không trùng khớp!'
            });
        }
        let hashedPassword = await bcrypt.hash(matkhau, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO khachhang SET ?', { hoten: hoten, email: email, ngaysinh: ngaysinh, diachi: diachi, matkhau: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('login', {
                    message: 'Đăng ký thành công!'
                });
            }
        });
    });
} 