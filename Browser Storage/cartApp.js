function initializeCart() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  function addItem(item) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function removeItem(itemID) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== itemID);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
  }

  document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemId = Date.now().toString();
  
    const item = {
      id: itemId,
      name: itemName,
      price: itemPrice
    };

    addItem(item);

    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
  });

  document.getElementById('displayCartButton').addEventListener('click', function() {
    displayCart();
  });

  initializeCart();