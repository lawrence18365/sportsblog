// Blog post data structure
const blogPosts = [
    {
        id: 'basketball-ref-call',
        title: 'Breaking: Basketball Player Actually Admits Referee Made Correct Call',
        excerpt: 'In what experts are calling an unprecedented event in professional basketball, power forward Marcus Thompson openly admitted that a referee's call against him was "probably fair."',
        content: 'Full article content...',
        date: '2024-12-20',
        category: 'Basketball',
        author: 'John Doe',
        featured: true,
        image: 'images/posts/basketball-ref.jpg',
        tags: ['NBA', 'Referees', 'Humor']
    },
    {
        id: 'fantasy-football-luck',
        title: 'New Study Shows 97% of Fantasy Football Players Think They're "Just Having Bad Luck"',
        excerpt: 'A groundbreaking study reveals that nearly all fantasy football players believe their 2-11 record is purely due to unfortunate circumstances.',
        content: 'Full article content...',
        date: '2024-12-19',
        category: 'Football',
        author: 'Jane Smith',
        featured: false,
        image: 'images/posts/fantasy-football.jpg',
        tags: ['NFL', 'Fantasy Football', 'Statistics']
    },
    // Add more posts here
];

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to create featured post HTML
function createFeaturedPostHTML(post) {
    return `
        <article class="featured-post">
            <img src="${post.image}" alt="${post.title}">
            <div class="featured-post-content">
                <span class="category-tag">${post.category}</span>
                <span class="post-meta">${formatDate(post.date)} | By ${post.author}</span>
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <a href="posts/${post.id}.html" class="read-more">Read More →</a>
            </div>
        </article>
    `;
}

// Function to create post card HTML
function createPostCardHTML(post) {
    return `
        <article class="post-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="post-content">
                <span class="category-tag">${post.category}</span>
                <span class="post-meta">${formatDate(post.date)}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="posts/${post.id}.html" class="read-more">Read More →</a>
            </div>
        </article>
    `;
}

// Initialize blog posts
function initializeBlog() {
    // Get featured post and remaining posts
    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Populate featured post
    if (featuredPost) {
        document.getElementById('featuredPost').innerHTML = createFeaturedPostHTML(featuredPost);
    }

    // Populate posts grid
    const postsGrid = document.getElementById('postsGrid');
    regularPosts.forEach(post => {
        postsGrid.innerHTML += createPostCardHTML(post);
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlog);
