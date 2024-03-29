// function formatCurrency (currency) {
//   const lng = currency.slice(0,-1)

//   document.querySelectorAll('.price').forEach(node => {
//     const nf = new Intl.NumberFormat(lng.toLowerCase()+'-'+lng, {
//       currency: currency,
//       style: 'currency'
//     })
//     const num = parseInt((node.textContent).replace( /\s/g, ""))

//     node.textContent = nf.format(num)
//   })
// }

// formatCurrency("RUB");

// function onclick(e){
//   const currency = e.target.value;
//   //console.log('currency', currency)
//   formatCurrency(currency);
// }

// //console.log('intlForm.group1.length ', intlForm.group1.length)
// for (var i = 0; i < intlForm.group1.length; i++) {
//   intlForm.group1[i].addEventListener("click", onclick); // выбор по name = "intlForm"
// }

// const $cart = document.querySelector('#cart')
// if ($cart) {
//   $cart.addEventListener('click', event => {

//     if (event.target.classList.contains('js-remove')) {

//       const id = event.target.dataset.id // data-id="{{id}}

//       fetch('/products-cart/remove/' + id, {

//         method: 'delete'

//       }).then(res => res.json())

//         .then(cart => {
//           console.log(cart)
//         })
//     }

//   })
// }

//------------------------------------

const toCurrency = (price) => {
  return new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency",
  }).format(price);
};

document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrency(node.textContent);
}); // вызов при загрузке

const $cart = document.querySelector("#cart");

if ($cart) {
  $cart.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;

      console.log('--id from app.js ', id);

      fetch("/cart-products/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((cart) => { 
          console.log('---cart  from app.js', cart)
          if (cart.length) {
            const html = cart
              .map((c) => {
                return `
              <tr>
                <td>${c.productId.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${c.productId._id}">Удалить</button>
                </td>
              </tr>
              `;
              })
              .join("");
            $cart.querySelector("tbody").innerHTML = html;

            const initialValue = 0;
            const price = cart.reduce((accumulator, c) => 
              accumulator + c.productId.price, initialValue)
              
              console.log('--price ', price)  
            
            $cart.querySelector(".price").textContent = toCurrency(price);
          } else {
            $cart.innerHTML = "<p>Корзина пуста</p>";
          }
        });
    }
  });
}
