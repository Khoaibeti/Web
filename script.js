(function () {
  const grid = document.getElementById('product-grid');
  const cartDrawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('overlay');
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  function renderProducts(filter) {
    const products = filter === 'All' ? PRODUCTS : PRODUCTS.filter(product => product.category === filter);
    grid.innerHTML = products.map(product => `<article class="product-card"><div class="product-image">${product.tag ? `<span class="tag">${product.tag}</span>` : ''}<img src="${product.image}" alt="${product.name}" loading="lazy"><button class="add-button" data-id="${product.id}" aria-label="Add ${product.name} to cart">+</button></div><div class="product-info"><h3>${product.name}</h3><p>${product.description}</p><span class="price">$${product.price.toLocaleString()}</span></div></article>`).join('');
    grid.querySelectorAll('.add-button').forEach(button => button.addEventListener('click', () => { Store.add(PRODUCTS.find(product => product.id === Number(button.dataset.id))); openCart(); }));
  }

  function renderCart() {
    cartCount.textContent = Store.cart.length;
    cartTotal.textContent = `$${Store.cart.reduce((sum, product) => sum + product.price, 0).toLocaleString()}`;
    cartItems.innerHTML = Store.cart.length ? Store.cart.map(product => `<div class="cart-row"><img src="${product.image}" alt=""><div><h4>${product.name}</h4><p>$${product.price.toLocaleString()}</p></div><button class="close-button remove-item" data-id="${product.id}" aria-label="Remove ${product.name}">×</button></div>`).join('') : '<p class="empty-cart">Your cart is ready when you are.</p>';
    cartItems.querySelectorAll('.remove-item').forEach(button => button.addEventListener('click', () => Store.remove(Number(button.dataset.id))));
  }

  function openCart() { cartDrawer.classList.add('open'); overlay.classList.add('open'); cartDrawer.setAttribute('aria-hidden', 'false'); }
  function closeCart() { cartDrawer.classList.remove('open'); overlay.classList.remove('open'); cartDrawer.setAttribute('aria-hidden', 'true'); }
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); renderProducts(button.dataset.filter); }));
  document.querySelectorAll('[data-filter].category-card').forEach(card => card.addEventListener('click', () => { document.querySelector('.filter.active').classList.remove('active'); document.querySelector(`.filter[data-filter="${card.dataset.filter}"]`).classList.add('active'); renderProducts(card.dataset.filter); }));
  document.getElementById('cart-button').addEventListener('click', openCart);
  document.getElementById('close-cart').addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  document.querySelector('.checkout-button').addEventListener('click', () => alert('Checkout is ready for your payment integration.'));
  window.addEventListener('cartchange', renderCart);
  renderProducts('All');
  renderCart();
}());