// Function to format dates consistently
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to create HTML for the featured post
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
                <a href="${post.path}" class="read-more">Read Full Story →</a>
            </div>
        </article>
    `;
}

// Function to create HTML for a regular post card
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
                <a href="${post.path}" class="read-more">Read More →</a>
            </div>
        </article>
    `;
}

// Function to initialize the blog
async function initializeBlog() {
    const repoOwner = 'lawrence18365'; // Replace with your GitHub username
    const repoName = 'sportsblog';  // Replace with your repository name
    const postsDir = 'posts';

    try {
        const posts = await getPosts(repoOwner, repoName, postsDir);

        // Find featured post (if you have a mechanism to designate a featured post)
        const featuredPost = posts.find(post => post.featured); // Assuming you add a 'featured' property in your front matter
        if (featuredPost) {
            createFeaturedPost(featuredPost);
        }

        // Get non-featured posts and sort by date
        const regularPosts = posts
            .filter(post => !post.featured)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        // Populate posts grid
        const postsGrid = document.getElementById('postsGrid');
        postsGrid.innerHTML = ''; // Clear existing posts
        regularPosts.forEach(post => {
            postsGrid.innerHTML += createPostCard(post);
        });
    } catch (error) {
        console.error('Error initializing blog:', error);
        document.getElementById('postsGrid').innerHTML = '<p>Error loading posts.</p>';
    }
}

// Function to fetch and parse posts from GitHub
async function getPosts(repoOwner, repoName, postsDir) {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${postsDir}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Fetch and parse front matter for each post
    const postsWithMetadata = await Promise.all(data.map(async (post) => {
        if (!post.name.endsWith('.html')) return null;

        const postUrl = post.download_url;
        const postResponse = await fetch(postUrl);
        const postContent = await postResponse.text();

        // Extract front matter using js-yaml
        const frontMatterMatch = postContent.match(/^---([\s\S]*?)---/);
        const frontMatter = frontMatterMatch ? jsyaml.load(frontMatterMatch[1]) : {};

        // Get latest commit date for sorting
        const commitUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?path=${postsDir}/${post.name}`;
        const commitResponse = await fetch(commitUrl);
        const commitData = await commitResponse.json();
        const commitDate = commitData[0]?.commit?.committer?.date || '';

        return { 
            ...post, 
            ...frontMatter, 
            commitDate,
            path: `${postsDir}/${post.name}` // Add path property
        };
    }));

    return postsWithMetadata.filter(post => post !== null);
}
// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlog);
