
var config = {
    apiKey: "AIzaSyArwANUb0dfry7j0vq7XeBRyAOv0FsdOeA",
    authDomain: "organicstore-c6e54.firebaseapp.com",
    databaseURL: "https://organicstore-c6e54.firebaseio.com",
    projectId: "organicstore-c6e54",
    storageBucket: "organicstore-c6e54.appspot.com",
    messagingSenderId: "981690902286"
  };
  firebase.initializeApp(config);


var products=JSON.parse(localStorage.getItem('cart'));
var cartItems=[];
var cart_n = document.getElementById('cart_n');
var table= document.getElementById("table");
var total=0;

function tableHTML(i){
    return `
                <tr>
                <th scope="row">${i+1}</th>
                <td><img style="width:90px;" src="${products[i].url}" ></td>
                <td>${products[i].name}</td>
                <td>1</td>
                <td>${products[i].precio}</td>
                </tr>
    `;
}

function buy() {
    var d = new Date();
    var t = d.getTime();
    var counter=t;
    counter+=1;
    let db=firebase.database().ref("order/"+counter);
    let itemdb={
        id:counter,
        order:counter-895,
        total:total
    }
    db.set(itemdb);
    swal({
        position:'center',
        type:'success',
        title:'Purchase made successfully!',
        text:`Your purchase order is: ${itemdb.order}`,
        showConfirmButton:true,
        timer:50000
    });
    clean();
}

function clean() {
        localStorage.clear();
        for (let index = 0; index < products.length; index++) {
            table.innerHTML+=tableHTML(index);
            total=total+parseInt(products[index].precio);
        }
        total=0;
        table.innerHTML=`
        <tr>
        <th ></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        </tr>
        `;
        cart_n.innerHTML='';
        document.getElementById("btnBuy").style.display="none";
        document.getElementById("btnClean").style.display="none";
}



function render(){
    for (let index = 0; index < products.length; index++) {
        table.innerHTML+=tableHTML(index);
        total=total+parseInt(products[index].precio);
    }
    table.innerHTML+=`
    <tr>
    <th scope="col" ></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">Total: $${total}</th>
    </tr>
    <tr>
    <th scope="col" ></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">
        <button id="btnClean" onclick="clean()" class="btn text-white btn-warning">Limpiar Carro De Compras</button>
    </th>
    <th scope="col"><button id="btnBuy" onclick="buy()" class="btn btn-success">Comprar</button></th>
    </tr>

    `;
    products=JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`[${products.length}]`;
}