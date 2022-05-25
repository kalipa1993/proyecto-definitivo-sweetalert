
var config = {
    apiKey: "AIzaSyArwANUb0dfry7j0vq7XeBRyAOv0FsdOeA",
    messagingSenderId: "981690902286"
  };
  firebase.initializeApp(config);

var products=[];
var cartItems=[];
var cart_n = document.getElementById('cart_n');

var despensaDIV= document.getElementById("despensaDIV");
var cervezasDIV = document.getElementById("cervezasDIV");
var aseoDIV = document.getElementById("aseoDIV");

var DESPENSA=[
    {name:'Arroz' ,precio:1000},
    {name:'Atun Lomito' ,precio:1290},
    {name:'Spaguetti' ,precio:890},
    {name:'Salsa de Tomate' ,precio:330},
    {name:'Poroto' ,precio:2480},
    {name:'Harina' ,precio:1420}
];
var CERVEZAS=[
    {name:'Caja de Corona' ,precio:24000},
    {name:'Caja de Pilsen' ,precio:11990},
    {name:'Caja de Miller' ,precio:22990}];
var ASEO=[
    {name:'Omo' ,precio:1890},
    {name:'Quix' ,precio:1700},
    {name:'Cloro' ,precio:1250}
];

function HTMLdespensaProduct(con){
    let URL = `img/despensa/despensa${con}.jpeg`;
    let btn = `btnDespensa${con}`;
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <p class="card-text">${DESPENSA[con-1].name}</p>
                    <p class="card-text">Precio: ${DESPENSA[con-1].precio}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" onclick="cart2('${DESPENSA[con-1].name}','${DESPENSA[con-1].precio}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a style="color:inherit;" href="cart.html">Comprar</a></button>
                            <button id="${btn}" type="button" onclick="cart('${DESPENSA[con-1].name}','${DESPENSA[con-1].precio}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Agregar al Carro</button>
                        </div>
                        <small class="text-muted">Despacho Gratis </small>
                    </div>
                </div>
            </div>
        </div>
    `
}
function HTMLcervezasProduct(con){
    let URL = `img/cervezas/cerveza${con}.jpeg`;
    let btn = `btnCervezas${con}`;
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <p class="card-text">${CERVEZAS[con-1].name}</p>
                    <p class="card-text">Precio: ${CERVEZAS[con-1].precio}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" onclick="cart2('${CERVEZAS[con-1].name}','${CERVEZAS[con-1].precio}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a href="cart.html" style="color:inherit;">Comprar</a></button>
                            <button id="${btn}" type="button" onclick="cart('${CERVEZAS[con-1].name}','${CERVEZAS[con-1].precio}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Agregar al Carro</button>
                        </div>
                        <small class="text-muted">Despacho Gratis </small>
                    </div>
                </div>
            </div>
        </div>
    `
}
function HTMLaseoProduct(con){
    let URL = `img/aseo/aseo${con}.jpeg`;
    let btn = `btnSalad${con}`;
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <p class="card-text">${ASEO[con-1].name}</p>
                    <p class="card-text">Precio: ${ASEO[con-1].precio}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" onclick="cart2('${ASEO[con-1].name}','${ASEO[con-1].precio}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a href="cart.html" style="color:inherit;">Comprar</a></button>
                            <button id="${btn}" type="button" onclick="cart('${ASEO[con-1].name}','${ASEO[con-1].precio}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Agregar al Carro</button>
                        </div>
                        <small class="text-muted">Despacho Gratis </small>
                    </div>
                </div>
            </div>
        </div>
    `
}

function animation(){
    const toast=swal.mixin({
        toast:true,
        position:'top-end',
        showConfirmButton:false,
        timer:1000
    });
    toast({
        type:'success',
        title: 'Agregado al carro de compras'
    });
}

function cart(name,precio,url,con,btncart){
    var item={
        name:name,
        precio:precio,
        url:url
    }
    cartItems.push(item);
    let storage= JSON.parse(localStorage.getItem("cart"));
    if (storage==null) {
            products.push(item);
            localStorage.setItem("cart",JSON.stringify(products));
    } else {
        products= JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }
    products= JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`[${products.length}]`;
    document.getElementById(btncart).style.display="none";
    animation();
}
function cart2(name,precio,url,con,btncart){
    var item={
        name:name,
        precio:precio,
        url:url
    }
    cartItems.push(item);
    let storage= JSON.parse(localStorage.getItem("cart"));
    if (storage==null) {
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    } else {
    products= JSON.parse(localStorage.getItem("cart"));
    products.push(item);
    localStorage.setItem("cart",JSON.stringify(products));
    }
    products= JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`[${products.length}]`;
    document.getElementById(btncart).style.display="none";
}

function render(){
    for (let index = 1; index <= 6; index++) {
        despensaDIV.innerHTML+=`${HTMLdespensaProduct(index)}`;
    }
    for (let index = 1; index <= 3; index++) {
        cervezasDIV.innerHTML+=`${HTMLcervezasProduct(index)}`;
        aseoDIV.innerHTML+=`${HTMLaseoProduct(index)}`;
    }
    if (localStorage.getItem("cart")==null) {
        
    } else {
        products=JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML=`[${products.length}]`;
    }

}