// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Breaking: Basketball Player Actually Admits Referee Made Correct Call",
        excerpt: "In what experts are calling an unprecedented event in professional basketball, power forward Marcus Thompson of the Chicago Bulls openly admitted that a referee's call against him was 'probably fair.'",
        content: "Full article content...",
        date: "2024-12-20",
        category: "Basketball",
        author: "John Doe",
        image: "images/posts/basketball-ref.jpg",
        featured: true
    },
    {
        id: 2,
        title: "New Study Shows 97% of Fantasy Football Players Think They're 'Just Having Bad Luck'",
        excerpt: "A groundbreaking study reveals that nearly all fantasy football players believe their 2-11 record is purely due to unfortunate circumstances.",
        date: "2024-12-19",
        category: "Football",
        author: "Jane Smith",
        image: "images/posts/fantasy-football.jpg",
        featured: false
    },
    {
        id: 3,
        title: "Local Dad Sets New World Record for Yelling 'What Are You Doing, Ref?!'",
        excerpt: "Jerry Thompson of Cincinnati has officially broken the world record for most times shouting at referees during his son's youth soccer game.",
        date: "2024-12-18",
        category: "Soccer",
        author: "Mike Johnson",
        image: "images/posts/angry-dad.jpg",
        featured: false
    },
    {
        id: 4,
        title: "New MLB Rule Change: Players Must Now Explain Their Elaborate Handshakes",
        excerpt: "Following complaints from parents nationwide, Major League Baseball has instituted a new rule requiring players to provide detailed explanations of their increasingly complex celebration routines.",
        date: "2024-12-17",
        category: "Baseball",
        author: "Sarah Williams",
        image: "images/posts/baseball-handshake.jpg",
        featured: false
    }
];

// Format date function
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Create featured post HTML
function createFeaturedPost(post) {
    const featured = document.getElementById('featured-post');
    featured.innerHTML = `
        <article class="featured-post">
            <img src="${post.image}" alt="${post.title}">
            <div class="featured-post-content">
                <span class="category-tag">${post.category}</span>
                <h2>${post.title}</h2>
                <div class="post-meta">
                    <span>${formatDate(post.date)}</span> | 
                    <span>By ${post.author}</span>
                </div>
                <p>${post.excerpt}</p>
                <a href="posts/${post.id}.html" class="read-more">Read Full Story →</a>
            </div>
        </article>
    `;
}

// Create regular post card HTML
function createPostCard(post) {
    return `
        <article class="post-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="post-content">
                <span class="category-tag">${post.category}</span>
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span>${formatDate(post.date)}</span>
                </div>
                <p>${post.excerpt}</p>
                <a href="posts/${post.id}.html" class="read-more">Read More →</a>
            </div>
        </article>
    `;
}

// Initialize the blog
function initializeBlog() {
    // Find featured post
    const featuredPost = blogPosts.find(post => post.featured);
    if (featuredPost) {
        createFeaturedPost(featuredPost);
    }

    // Get non-featured posts and sort by date
    const regularPosts = blogPosts
        .filter(post => !post.featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Populate posts grid
    const postsGrid = document.getElementById('postsGrid');
    regularPosts.forEach(post => {
        postsGrid.innerHTML += createPostCard(post);
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlog);
