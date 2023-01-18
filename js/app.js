const divProductsFinded = document.querySelector('.productsFinded');
const containerProducts = document.querySelector('.container-products');
const spanTotalProductCart = document.querySelector('.total-product');
const btnCard = document.querySelector('.btn-card');

const navSearch = document.querySelector('.nav-search');


let productList;
let productFinded;
let totalProductsOnCart = 0;
const cartList = [];
const url = 'https://fakestoreapi.com/products';



const init = () => {
    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            data.forEach((product) => {
                const divContainer = document.createElement('div')
                divContainer.classList.add('dashboard-card', 'col-md-3');
                divContainer.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top dashboard-card-img">
                <div class="card-body dashboard-card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">R$ ${product.price}</p>                    
                    <a href="#" value=${product.id} onclick="addCart(event)" class="btn btn-primary btn-card">Adicionar ao Carrinho</a>
                    
                </div>
            </div>
        `
                containerProducts.appendChild(divContainer);

            })

            productList = data;

        })
}

init();

//Pesquisa do produto
// navSearch.addEventListener('change', function(event){
//     fetch(url,{
//         method: 'GET'
//     })
//     .then(response => response.json())
//     .then(products => products.filter((filtered) => filtered.title.toLowerCase().includes(event.target.value.toLowerCase())))
//     .then(productsFindedSuccess => {
//         const divProductFinded = document.createElement('div');
//         if(productsFindedSuccess.length > 0){ 

//             productsFindedSuccess.forEach(product => {
//                 divProductFinded.innerHTML = `
//                    <div class="card">
//                     <img src="${product.image}" class="card-img-top dashboard-card-img">
//                     <div class="card-body">
//                         <h5 class="card-title">${product.title}</h5>
//                         <p class="card-text">R$ ${product.price}</p>

//                         <a href="#" class="btn btn-primary btn-card">Adicionar ao Carrinho</a>

//                     </div>
//                  </div>
//                 `
//             })

//             divProductsFinded.appendChild(divProductFinded);
//         }
//     })


// })

const addCart = (event) => {
    const id = event.target.getAttribute('value');
    const product = productList.find(product => product.id === Number(id));
    cartList.push(product);
    addTotalProductsCart();
}


const switchModal = () => {
    const modal = document.querySelector('.modal');
    const actualyStyle = modal.style.display;
    if (actualyStyle == 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block'
    }
}

const btn = document.querySelector('.modalBtn');
const openModal = () => {
    switchModal();
    showCartProducts();
}


window.onclick = function (event) {
    
    const modal = document.querySelector('.modal');
    if (event.target == modal) {
        switchModal();     
        clearCartProductsWhenModalClose()
    } 
   
}


const showCartProducts = () => { 
    const contentModal = document.querySelector('.content'); 
    const tableContentModel = document.createElement("table");
    tableContentModel.classList.add('table');
    tableContentModel.innerHTML = `
            <thead>
                <tr>
                <th scope="col">Produtos</th>
                <th scope="col">Preço</th>            
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                       
            </tbody>
    `   
    contentModal.appendChild(tableContentModel);


    cartList.forEach((item) => {
        const tr = document.querySelector('tbody');
        tr.innerHTML += `
        <tr class="content-table"> 
            <td scope="row" class='d-flex align-items-center' style="gap: 1rem">
            <img src="${item.image}" class="cart-img">
            <p>${item.title}</p>       
            </td>

            <td>
            <p>R$: ${item.price}</p>
            </td>

            <td>
            <span class="icon-trash" onclick="removeProductFromCart(${item.id})"><i class="fa-solid fa-trash"></i></span>
            </td>      
        </tr>      
        `
    })
    
}

const clearCartProductsWhenModalClose = () => {
    const contentCartList = document.querySelector('.content'); 
    contentCartList.innerHTML = '';
}


const addTotalProductsCart = () => {
    spanTotalProductCart.innerText = cartList.length;
}

const removeProductFromCart = (item) => {
    const contentCartList = document.querySelector('.content'); 
    cartList.forEach(product => {
        if(product.id == item){
            cartList.splice(cartList.indexOf(product), 1);
        }       
        contentCartList.innerHTML = '';
    });    
    
    showCartProducts();
    spanTotalProductCart.innerText = cartList.length;
}