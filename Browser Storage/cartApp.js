// Function to initialize the shopping cart in local storage
function initializeCart() {
  // Check if there is no 'cart' item in local storage
  if (!localStorage.getItem('cart')) {
      // If not, create an empty 'cart' array and save it to local storage
      localStorage.setItem('cart', JSON.stringify([]));
  }
}

// Function to add an item to the cart
function addItem(item) {
  // Retrieve the 'cart' from local storage and parse it as a JSON object
  let cart = JSON.parse(localStorage.getItem('cart'));
  // Add the new item to the cart array
  cart.push(item);
  // Save the updated cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to remove an item from the cart by its ID
function removeItem(itemID) {
  // Retrieve the 'cart' from local storage and parse it as a JSON object
  let cart = JSON.parse(localStorage.getItem('cart'));
  // Filter out the item with the specified ID from the cart array
  cart = cart.filter(item => item.id !== itemID);
  // Save the updated cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display the contents of the cart
function displayCart() {
  // Retrieve the 'cart' from local storage and parse it as a JSON object
  let cart = JSON.parse(localStorage.getItem('cart'));
  // Log the cart contents to the console
  console.log(cart);
}

// Add an event listener to the form for adding items to the cart
document.getElementById('addItemForm').addEventListener('submit', function(event) {
  // Prevent the form from submitting the traditional way
  event.preventDefault();
  // Get the item name from the form input
  const itemName = document.getElementById('itemName').value;
  // Get the item price from the form input and convert it to a float
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);
  // Generate a unique ID for the item based on the current timestamp
  const itemId = Date.now().toString();
  
  // Create an item object with the collected information
  const item = {
      id: itemId,
      name: itemName,
      price: itemPrice
  };

  // Add the item to the cart
  addItem(item);

  // Clear the form inputs for item name and item price
  document.getElementById('itemName').value = '';
  document.getElementById('itemPrice').value = '';
});

// Add an event listener to the button for displaying the cart
document.getElementById('displayCartButton').addEventListener('click', function() {
  // Call the function to display the cart contents
  displayCart();
});

// Initialize the cart when the script is first run
initializeCart();
