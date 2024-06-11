let Shop = ['Pop Tarts', 'Ramen Noodles', 'Chips', 'Salsa', 'Coffee'];
Shop.push('Fruit Loops');
Shop.splice(4, 1, 'Fair Trade Coffee');
Shop.splice(2, 2, 'Rice', 'Beans');
let ShoppingCart = [];
Shop.pop();
ShoppingCart.push('Fruit Loops');
Shop.shift();
ShoppingCart.push('Pop Tarts')
while (Shop.length > 0) {
    let item = Shop.shift();
    ShoppingCart.push(item);
}
ShoppingCart.sort();
ShoppingCart.reverse();

for (let i = 0; i < ShoppingCart.length; i++) {
    console.log(ShoppingCart[i]);
}

console.log(Shop);
console.log(ShoppingCart);
console.log('ShoppingCart contains:', ShoppingCart);
