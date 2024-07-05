// 1. Create two arrays of numbers called numbers1 and numbers2
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [6, 7, 8, 9, 10];

// 2. Use the spread operator to create an array called numbers that combines the elements of numbers1 and numbers2
const numbers = [...numbers1, ...numbers2];

// 3. Define an arrow function called square that accepts a number as an argument and returns the square of the number
const square = (number) => number * number;

// 4. Use the map method to create a new array called squares that contains the squares of the numbers in the numbers array
const squares = numbers.map(square);

// 5. Define an arrow function called isEven that accepts a number as an argument and returns true if the number is even, otherwise false
const isEven = (number) => number % 2 === 0;

// 6. Use the filter method to create a new array called evenSquares that contains only the even squares from the squares array
const evenSquares = squares.filter(isEven);

// 7. Use destructuring assignment to extract the first and second elements of the evenSquares array into constants firstEvenSquare and secondEvenSquare
const [firstEvenSquare, secondEvenSquare] = evenSquares;

// 8. Use a template literal to log the original numbers array, the squares array, the evenSquares array, and the extracted even squares
console.log(`Original numbers array: ${numbers}`);
console.log(`Squares array: ${squares}`);
console.log(`Even squares array: ${evenSquares}`);
console.log(`First even square: ${firstEvenSquare}, Second even square: ${secondEvenSquare}`);
