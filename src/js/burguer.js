let cart = [];
let modalQt = 1;
let modalKey = 0;
//hambugueres
const c =(el)=>document.querySelector(el);
const cs =(el)=>document.querySelectorAll(el)
burguer.map((item, index)=>{
    let burguerItem = c('.models .hamb-box').cloneNode(true);
    burguerItem.setAttribute('data-key', index)
    burguerItem.querySelector('.hamb-content .name').innerHTML = item.name;
    burguerItem.querySelector('.hamb img').src = item.img;
    burguerItem.querySelector('.hamb-content .price').innerHTML = `${item.price.toFixed(2)} R$`;
    burguerItem.querySelector('.hamb-content .desc').innerHTML = item.description;
   
    burguerItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        modalQt = 1;
        let key = e.target.closest('.hamb-box').getAttribute('data-key')
        modalKey = key;
        c('.order-img img').src = burguer[key].img;
        c('.name-order').innerHTML = burguer[key].name;
        c('.description-desktop').innerHTML = burguer[key].description;
        c('.price-actual').innerHTML = `${burguer[key].price.toFixed(2)} R$`

        c('.price-qt').innerHTML = modalQt;
        c('.area-compra').style.opacity = 0
        c('.area-compra').style.display = 'flex'
    
        setTimeout(()=>{
            c('.area-compra').style.opacity = 1
    
        })
    })
    
    c('.area-burguer').append(burguerItem);
})
// eventos do modal

c('.price-qtmenos').addEventListener('click',()=>{
    if(modalQt > 1){
        modalQt--;
        c('.price-qt').innerHTML = modalQt;
    }
})
c('.price-qtmais').addEventListener('click',()=>{
        modalQt++;
        c('.price-qt').innerHTML = modalQt;
})




// menu mobile 
const btnMobile = document.querySelector('.menu-mobile .img-mobile');

btnMobile.addEventListener('click',()=>{
    let menuContent = document.querySelector('.menu-content-mobile')
    if(menuContent.classList.contains('show')){
        menuContent.classList.remove('show')
        document.querySelector('.img-mobile img').src = './src/images/menu.svg'
    } else {
        menuContent.classList.add('show')
        document.querySelector('.img-mobile img').src = './src/images/close.svg'

    }
})

//close modal
function closeModal(){
    c('.area-compra').style.opacity = 0
        setTimeout(()=>{
            c('.area-compra').style.display = 'none'
        }, 500)
}
const btnCancelModal = c('.cancel');
btnCancelModal.addEventListener('click', closeModal)

//add cart
c('.add-cart').addEventListener('click',()=>{
    let indentifier = burguer[modalKey].id+'@';
    let key = cart.findIndex((item)=>{
        return item.indentifier == indentifier;
    })
    if(key > -1){
        cart[key].qt += modalQt
    } else{
        cart.push({
            indentifier,
            id:burguer[modalKey].id,
            qt:modalQt
        })
    }
   updateCart()
   closeModal()
})
//open cart
cs('.img-cart').forEach((item)=>{
    item.addEventListener('click',()=>{
        let cartShow = c('.cart--area');
        cartShow.classList.add('show');
        updateCart();
    })
})



function updateCart(){
    if(cart.length > 0){
        c('.cart--area').classList.add('show');
        c('aside .cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        
        for(let i in cart){
            let burguerItem = burguer.find((item)=> item.id == cart[i].id)
             subtotal += burguerItem.price * cart[i].qt;
    
            let cartItem = c('.models .cart-item').cloneNode(true);
            cartItem.querySelector('.cart-top-left img').src = burguerItem.img;
            cartItem.querySelector('.cart-item-nome').innerHTML = burguerItem.name;
            cartItem.querySelector('.price-qt-cart').innerHTML = cart[i].qt;
            cartItem.querySelector('.price-qtmenos-cart').addEventListener('click',()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1)
                }
                updateCart();

            })
            cartItem.querySelector('.price-qtmais-cart').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            })

            c('aside .cart').append(cartItem)
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        c('.subtotal span:last-child').innerHTML = subtotal.toFixed(2);
        c('.desconto span:last-child').innerHTML = desconto.toFixed(2);
        c('.total span:last-child').innerHTML = total.toFixed(2);
        

    } else {
        c('.cart--area').classList.remove('show');

    }
}

//close cart
function closeCart (){
    c('.cart--area').classList.remove('show');

}
c('.close-cart').addEventListener('click',closeCart)