$(document).ready(function () {
    $('.banner__slider').owlCarousel({
        loop: true,
        // autoplay: true,
        dots: true,
        items: 1

    });
    // console.log("run to here")

    $('.bestSellers-slider').owlCarousel({
        nav: true,
        navSpeed: 1200,
        dots: false,
        items: 5,
        margin: 20,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            360: {
                items: 1,
                nav: true
            },
            768: {
                items: 3
            },
            1024: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });

    $('.popular-slider').owlCarousel({
        items: 3,
        margin: 20,
        dots: false,
        nav: true,
        navSpeed: 1200,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            360: {
                items: 1
            },
            768: {
                items: 2,
                margin: 20
            },
            991: {
                items: 3,
                margin: 20
            }
        }
    });

    $('.hot-deal__slider').owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        loop: true,
        autoplay: true,
        autoplaySpeed: 1200,
        navSpeed: 1200,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            360: {
                items: 1
            }
        }
    });


    $('.new-arrival__slider').owlCarousel({
        items: 3,
        nav: true,
        dots: false,
        margin: 10,
        navSpeed: 800,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            360: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            },
            1300: {
                items: 4
            }
        }
    });

    $('.recently-slider').owlCarousel({
        items: 6,
        margin: 20,
        dots: false,
        nav: true,
        navSpeed: 700,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            360: {
                items: 1
            },
            500: {
                items: 2,
                margin: 20
            },
            1024: {
                items: 4,
                margin: 20
            },
            1200: {
                items: 5
            },
            1300: {
                items: 6
            }
        }
    });

    // console.log('run to here')
    $('.featured-slider').owlCarousel({
        items: 4,
        dots: false,
        nav: true,
        margin: 30,
        navSpeed: 800,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                nav: false
            },
            360: {
                items: 1
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            },
            1300: {
                items: 4
            }
        }
    });


    $('.sponsors-slider').owlCarousel({
        items: 5,
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            768: {
                items: 3
            },
            991: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });


    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    console.log(document.getElementsByClassName('day-value'));

    let countDown = new Date('Dec 30, 2020 00:00:00').getTime(),
        x = setInterval(function () {

            let now = new Date().getTime(),
                distance = countDown - now;

            for (let i = 0; i < 8; i++) {

                document.getElementsByClassName('day-value')[i].innerText = Math.floor(distance / (day));
                document.getElementsByClassName('hour-value')[i].innerText = Math.floor((distance % (day)) / (hour));
                document.getElementsByClassName('minute-value')[i].innerText = Math.floor((distance % (hour)) / (minute));
                document.getElementsByClassName('second-value')[i].innerText = Math.floor((distance % (minute)) / second);
            }


            //do something later when date is reached
            //if (distance < 0) {
            //  clearInterval(x);
            //  'IT'S MY BIRTHDAY!;
            //}

        }, second)


});

function addProduct(id, name, price) {
    let cart = [];
    let product = { id: id, name: name, price: price, incart: 1 };
    let cartProduct = JSON.parse(localStorage.getItem('cart'));

    if (cartProduct == null) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

    } else {

        cart = cartProduct;
        cartDup = [];
        let isCheck = false;
        cart.forEach(obj => {
            if (obj.id == product.id) {
                console.log(obj.incart + 1)
                obj.incart = obj.incart + 1;
                cartDup.push(obj);
                isCheck = true;
            } else {
                cartDup.push(obj);
            }
        });
        if (!isCheck) {
            cartDup.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cartDup));
    }
    function cartNumbers() {
        let cartNum = 0;
        let totalCost = 0;
        let product = JSON.parse(localStorage.getItem('cart'));
        if (product != null) {
            product.forEach(element => {
                cartNum = cartNum + element.incart;
                totalCost = totalCost + element.incart * element.price;
            });
            document.querySelector('.cart span').textContent = cartNum;
        }
        localStorage.setItem('cartNumbers', JSON.stringify(cartNum));
        localStorage.setItem('totalCost', JSON.stringify(totalCost));
    }
    cartNumbers();
}
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    // console.log('productNumbers:', productNumbers);
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}
function displayCart() {
    let cartItems = localStorage.getItem('cart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr>
            <td><span> ${item.name}</span></td>
             <td id="price">${item.price}</td>
             <td id="incart_${item.name}">
                <button type="button" class="btn buttonChange" data-itemId="${item.name}" onclick = "sub(${item.id})"><ion-icon name="remove-circle-outline"></ion-icon></button>
                <span>${item.incart}</span>
                <button type="button" class="btn buttonChange" data-itemId="${item.name}" onclick = "add(${item.id})"><ion-icon name="add-circle-outline"></ion-icon></button>
             </td>
             <td id="total">${item.incart * item.price} VNĐ</td>
             <td><button class="btn" data-itemId="${item.name}" onclick="del(${item.id})"><ion-icon name="close-circle-outline" class="iconDel"></ion-icon></button></td>
             </tr>
            `;
        });
        productContainer.innerHTML += `
        <tr>
        <td></td>
        <td></td>
        <td><h5>Tổng</h5></td>
        <td> 
            <h5>
                ${cartCost} VNĐ
            </h5>
        </td>
        <td></td>
        </tr>
        `;
    }

    let productConfirm = document.querySelector(".productConfirm");
    if (cartItems && productConfirm) {
        productConfirm.innerHTML = '';
        Object.values(cartItems).map(item => {
            productConfirm.innerHTML += `
             <span style="font-weight: bold;" id="">${item.name}</span><br>
             <span style="color: red;">Số lượng :</span>${item.incart}<br>
             <span>Thành tiền :</span>${item.incart * item.price} VNĐ <br><br>
            `;
        });
        // productConfirm.innerHTML += `
        //     <h5>Tổng : ${cartCost} VNĐ </h5>
        // `;
    }

    let thanhtien = document.querySelector(".thanhtien");
    if (cartItems && thanhtien) {
        thanhtien.innerHTML = '';
        thanhtien.innerHTML += `
             <br>
             <h6>Tiền hàng : ${cartCost} VNĐ</h6>
             <h6>Phí vận chuyển :    0 VNĐ</h6>
             <h6>Tổng cộng : ${cartCost} VNĐ</h6>
            `;
    }

}

onLoadCartNumbers();
displayCart();
//--------------------------------giam 1 san pham-----------------------------------
function sub(e) {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let cartNumbers = JSON.parse(localStorage.getItem("cartNumbers"));
    let totalCost = JSON.parse(localStorage.getItem("totalCost"));
    totalCost = parseInt(totalCost);
    let bienTam = e;
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id == bienTam) {
            if (cartItems[i].incart <= 1) {
                totalCost = totalCost - cartItems[i].price;
                cartNumbers = cartNumbers - 1;
                cartItems.splice(i, 1)

            }
            else {
                totalCost = totalCost - cartItems[i].price;
                cartItems[i].incart = cartItems[i].incart - 1;
                cartNumbers = cartNumbers - 1;
                document.getElementById(`incart_${cartItems[i].name}`).innerHTML = cartItems[i].incart;

            }

        }
    }
    localStorage.setItem('totalCost', JSON.stringify(totalCost));
    localStorage.setItem("cartNumbers", JSON.stringify(cartNumbers));

    localStorage.setItem("cart", JSON.stringify(cartItems));
    onLoadCartNumbers();
    displayCart();

}
//---------------------------------------------tang 1 san pham------------------------------------------
function add(e) {
    let cartNumbers = JSON.parse(localStorage.getItem("cartNumbers"));
    let totalCost = JSON.parse(localStorage.getItem("totalCost"));
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let bienTam = e;
    totalCost = parseInt(totalCost);
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id == bienTam) {
            cartItems[i].price = parseInt(cartItems[i].price);
            cartNumbers = cartNumbers + 1;
            totalCost = totalCost + cartItems[i].price;
            cartItems[i].incart++;
            document.getElementById(`incart_${cartItems[i].name}`).innerHTML = cartItems[i].incart;
        }
    }
    localStorage.setItem('totalCost', JSON.stringify(totalCost));
    localStorage.setItem("cartNumbers", JSON.stringify(cartNumbers));

    localStorage.setItem("cart", JSON.stringify(cartItems));
    onLoadCartNumbers();
    displayCart();
}
//-------------------------------------------Xoa 1 san pham-------------------------------------------
function del(e) {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let cartNumbers = JSON.parse(localStorage.getItem("cartNumbers"));
    let totalCost = JSON.parse(localStorage.getItem("totalCost"));
    totalCost = parseInt(totalCost);
    let bienTam = e;
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id == bienTam) {
            cartNumbers = cartNumbers - cartItems[i].incart;
            totalCost = totalCost - (cartItems[i].price * cartItems[i].incart);
            cartItems.splice(i, 1); //xóa 1 phần tử thứ i
        }
    }
    localStorage.setItem('totalCost', JSON.stringify(totalCost));
    localStorage.setItem("cartNumbers", JSON.stringify(cartNumbers));

    localStorage.setItem("cart", JSON.stringify(cartItems));
    onLoadCartNumbers();
    displayCart();
}
onLoadCartNumbers();


    function logOut() {
        $.post("/logOut", {
          
        },
            function (data, status) {
                if (data.stt) {
                    window.location.href = "/"
                }
            });
    }