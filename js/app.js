const divProductsFinded = document.querySelector('.productsFinded');
const containerProducts = document.querySelector('.container-products');
const btnCard = document.querySelector('.btn-card');

const navSearch = document.querySelector('.nav-search');
let productList;
let productFinded;
const cartList = [];
const url = 'https://fakestoreapi.com/products';



const init = () => {
    fetch(url,{
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {       
        data.forEach((product) => {
            const divContainer = document.createElement('div')
            divContainer.classList.add('dashboard-card','col-md-3');
            divContainer.innerHTML =  `
            <div class="card">
                <img src="${product.image}" class="card-img-top dashboard-card-img">
                <div class="card-body">
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
    console.log(cartList)
}


const switchModal = () => {
    const modal = document.querySelector('.modal');
    const actualyStyle = modal.style.display;
    if(actualyStyle == 'block'){
        modal.style.display = 'none';
    }else {
        modal.style.display = 'block'
    }
}

const btn = document.querySelector('.modalBtn');
const openModal = () => {
    console.log('teste');
    switchModal();
}


window.onclick = function(event){
    const modal = document.querySelector('.modal');
    if(event.target == modal){
        switchModal();
    }
}

