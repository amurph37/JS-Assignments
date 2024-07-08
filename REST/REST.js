// Function to fetch data from JSONPlaceholder API
async function fetchData(url, options = {}) {
    try {
        // Make an asynchronous fetch request with the provided URL and options
        const response = await fetch(url, options);
        // Check if the response is not OK (status code not in the range 200-299)
        if (!response.ok) {
            // Throw an error with the HTTP status code
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse and return the JSON response
        return await response.json();
    } catch (error) {
        // Log the error message to the console
        console.error('Error fetching data:', error);
        // Return an object containing the error message
        return { error: error.message };
    }
}

// Function to display results in the specified result element
function displayResult(resultElementId, result) {
    // Hide all result elements
    const allResultElements = document.querySelectorAll('.result');
    allResultElements.forEach(element => {
        element.style.display = 'none'; // Hide each result element
    });

    // Display the result for the specified element
    const resultElement = document.getElementById(resultElementId);
    resultElement.style.display = 'block'; // Show the specified result element
    resultElement.innerHTML = JSON.stringify(result, null, 2); // Display the result in JSON format
}

// Function to get all posts
async function getAllPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const posts = await fetchData(url); // Fetch all posts
    displayResult('resultGetAllPosts', posts); // Display the fetched posts
}

// Function to get a post by its ID
async function getPostById() {
    const postId = 10;
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const post = await fetchData(url); // Fetch the post with the specified ID
    displayResult('resultGetPostById', post); // Display the fetched post
}

// Function to create a new post
async function createNewPost() {
    const newPost = {
        title: 'New Post Title',
        body: 'New post content',
        userId: 1 // Adjust userId as needed
    };

    const url = 'https://jsonplaceholder.typicode.com/posts';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(newPost) // Convert the new post object to a JSON string
    };

    const createdPost = await fetchData(url, options); // Create the new post
    displayResult('resultCreateNewPost', createdPost); // Display the created post
}

// Function to replace a post by its ID
async function replacePostById() {
    const postId = 12;
    const updatedPost = {
        title: 'Updated Post Title',
        body: 'Updated post content',
        userId: 1 // Adjust userId as needed
    };

    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(updatedPost) // Convert the updated post object to a JSON string
    };

    const replacedPost = await fetchData(url, options); // Replace the post with the specified ID
    displayResult('resultReplacePostById', replacedPost); // Display the replaced post
}

// Function to update the title of a post by its ID
async function updatePostTitle() {
    const postId = 12;
    const updatedTitle = {
        title: 'Updated Title Only'
    };

    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(updatedTitle) // Convert the updated title object to a JSON string
    };

    const updatedPost = await fetchData(url, options); // Update the title of the post with the specified ID
    displayResult('resultUpdatePostTitle', updatedPost); // Display the updated post
}

// Function to delete a post by its ID
async function deletePostById() {
    const postId = 12;
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const options = {
        method: 'DELETE' // Set the request method to DELETE
    };

    const deleteResponse = await fetchData(url, options); // Delete the post with the specified ID
    const successMessage = { message: `Post with ID ${postId} deleted successfully.` }; // Create a success message
    displayResult('resultDeletePostById', successMessage); // Display the success message
}
