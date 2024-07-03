const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const PORT = 3003;

let books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];

// Route to create a new book
app.post('/books', (req, res) => {
    const book = {
        id: books.length + 1, // Simple ID generation strategy
        title: req.body.title,
        author: req.body.author
    };
    books.push(book);
    res.status(201).json(book);
});

// Route to get all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// Route to get a single book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send('Book not found');
    } else {
        res.status(200).json(book);
    }
});

// Route to update a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send('Book not found');
    } else {
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        res.status(200).json(book);
    }
});

// Route to delete a book by ID
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send('Book not found');
    } else {
        books.splice(index, 1);
        res.status(204).send(); // No content to send back
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
