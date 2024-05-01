document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    });

const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
  loadContent();
}

function loadContent() {
  // Remove Food Items From Cart
  let btnRemove = document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });

  // Product Item Change Event
  let qtyElements = document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input) => {
    input.addEventListener('change', changeQty);
  });

  // Product Cart
  let cartBtns = document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', addCart);
  });

  updateTotal();
}

function removeItem() {
  if (confirm('Are you sure you want to remove this item?')) {
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList = itemList.filter(el => el.title != title);
    // Update local storage
    updateLocalStorage();
    this.parentElement.remove();
    loadContent();
  }
}

function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let itemList = [];

// Load items from local storage if available
if (localStorage.getItem('cartItems')) {
  itemList = JSON.parse(localStorage.getItem('cartItems'));
  updateCartFromStorage();
}

function addCart() {
  let food = this.parentElement;
  let title = food.querySelector('.food-title').innerHTML;
  let price = food.querySelector('.food-price').innerHTML;
  let imgSrc = food.querySelector('.food-img').src;

  let newProduct = { title, price, imgSrc };

  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product already added in cart");
    return;
  } else {
    itemList.push(newProduct);
    // Update local storage
    updateLocalStorage();
  }

  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
  loadContent();
}

function createCartProduct(title, price, imgSrc) {
  return `
    <div class="cart-box">
      <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
        <div class="cart-food-title text-gray-800">${title}</div>
        <div class="price-box">
          <div class="cart-price text-gray-500">${price}</div>
          <div class="cart-amt text-gray-500">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity text-white-700">
      </div>
      <ion-icon name="trash" class="cart-remove bg-gray"></ion-icon>
    </div>
  `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');

  let total = 0;

  cartItems.forEach((product) => {
    let priceElement = product.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
    let qty = product.querySelector('.cart-quantity').value;
    total += price * qty;
    product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);
  });

  totalValue.innerHTML = 'Rs.' + total;

  // Update cart items number
  const cartCount = document.querySelector('.cart-count');
  let count = itemList.length;
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = 'none';
  } else {
    cartCount.style.display = 'block';
  }
}

function updateLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(itemList));
}

function updateCartFromStorage() {
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.innerHTML = '';
  itemList.forEach(item => {
    let newProductElement = createCartProduct(item.title, item.price, item.imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    cartBasket.append(element);
  });
}

