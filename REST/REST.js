// Function to fetch data from JSONPlaceholder API
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: error.message };
    }
}

// Function to display results in the specified result element
function displayResult(resultElementId, result) {
    // Hide all result elements
    const allResultElements = document.querySelectorAll('.result');
    allResultElements.forEach(element => {
        element.style.display = 'none';
    });

    // Display the result for the specified element
    const resultElement = document.getElementById(resultElementId);
    resultElement.style.display = 'block';
    resultElement.innerHTML = JSON.stringify(result, null, 2);
}

// Get all posts
async function getAllPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const posts = await fetchData(url);
    displayResult('resultGetAllPosts', posts);
}

// Get post with id of 10
async function getPostById() {
    const postId = 10;
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const post = await fetchData(url);
    displayResult('resultGetPostById', post);
}

// Create a new post
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    };

    const createdPost = await fetchData(url, options);
    displayResult('resultCreateNewPost', createdPost);
}

// Replace the post with id of 12
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    };

    const replacedPost = await fetchData(url, options);
    displayResult('resultReplacePostById', replacedPost);
}

// Update the title of post with id of 12
async function updatePostTitle() {
    const postId = 12;
    const updatedTitle = {
        title: 'Updated Title Only'
    };

    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTitle)
    };

    const updatedPost = await fetchData(url, options);
    displayResult('resultUpdatePostTitle', updatedPost);
}

// Delete the post with id of 12
async function deletePostById() {
    const postId = 12;
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const options = {
        method: 'DELETE'
    };

    const deleteResponse = await fetchData(url, options);
    const successMessage = { message: `Post with ID ${postId} deleted successfully.` };
    displayResult('resultDeletePostById', successMessage);
}
