function formatCurrency (currency) {
  const lng = currency.slice(0,-1)
   
  document.querySelectorAll('.price').forEach(node => {
    const nf = new Intl.NumberFormat(lng.toLowerCase()+'-'+lng, {
      currency: currency,
      style: 'currency'
    })
    const num = parseInt((node.textContent).replace( /\s/g, ""))
    
    node.textContent = nf.format(num)
  })
}

formatCurrency("RUB");

function onclick(e){
  const currency = e.target.value;
  //console.log('currency', currency)
  formatCurrency(currency);
}

//console.log('intlForm.group1.length ', intlForm.group1.length)
for (var i = 0; i < intlForm.group1.length; i++) {
  intlForm.group1[i].addEventListener("click", onclick); // выбор по name = "intlForm"
}