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

// const $card = document.querySelector('#card')
// if ($card) {
//   $card.addEventListener('click', event => {

//     if (event.target.classList.contains('js-remove')) {

//       const id = event.target.dataset.id // data-id="{{id}}

//       fetch('/products-card/remove/' + id, {

//         method: 'delete'

//       }).then(res => res.json())

//         .then(card => {
//           console.log(card)
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

const $card = document.querySelector("#card");

if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;

      fetch("/products-card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.products.length) {
            const html = card.products
              .map((c) => {
                return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
                </td>
              </tr>
              `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = html;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = "<p>Корзина пуста</p>";
          }
        });
    }
  });
}
