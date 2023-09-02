// Accordions
let accordionProducts = document.querySelector('.goods__accordion--products');
let accordionProductsBtn = document.querySelector('.goods__accordion--products .goods__hide-btn');
let accordionProductsMissing = document.querySelector('.goods__accordion--products-missing');
let accordionProductsMissingBtn = document.querySelector('.goods__accordion--products-missing .goods__hide-btn');
let products = document.querySelector('.goods__products--in');
let productsMissing = document.querySelector('.goods__products--missing');
let checkAllProducts = accordionProducts.querySelector('.check__input');

accordionProductsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    products.classList.toggle('goods__products--hide');
    accordionProducts.classList.toggle('goods__accordion--products-hide');
})

accordionProductsMissingBtn.addEventListener('click', (e) => {
    e.preventDefault();
    productsMissing.classList.toggle('goods__products--hide');
    accordionProductsMissing.classList.toggle('goods__accordion--productsmissing-hide');
})

checkAllProducts.addEventListener('change', (e) => {
    let productCheck = document.querySelectorAll('.product .check__input');

    if (e.target.checked) {
        productCheck.forEach(item => item.checked = true);
        allProducts.forEach((item) => {
            if (item.productsLeft) {
                item.checked = true
            }
        })
    } else {
        productCheck.forEach(item => item.checked = false);
        allProducts.forEach((item) => {
            item.checked = false
        })
    }

    sumTotal()
})