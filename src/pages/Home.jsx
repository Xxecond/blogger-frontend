import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchUserPosts, deletePost } from '../services/postService';
import SearchBar from '../components/SearchBar';
import BlogCard from '../components/BlogCard';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchUserPosts();
      if (!data.error) {
        // ✅ Sort by newest first using createdAt timestamp
        const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sorted);
      } else {
        console.error(data.error);
      }
      setLoading(false);
    };

    loadPosts();
  }, [location.state?.newPost]); // ✅ Refresh when a new post is added

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const result = await deletePost(id);
      if (!result.error) {
        setBlogs(prev => prev.filter(blog => blog._id !== id));
      } else {
        alert(result.error);
      }
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <SearchBar setSearchTerm={setSearchTerm} />

      {loading ? (
        <p>Loading blogs...</p>
      ) : filteredBlogs.length > 0 ? (
        filteredBlogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
        ))
      ) : (
        <div className="blogdirect">
          <p>No blogs found</p>
          <Link to="/create">CREATE NEW BLOG</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
