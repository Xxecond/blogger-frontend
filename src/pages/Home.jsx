import { useState, useEffect } from 'react';
import { fetchUserPosts, deletePost } from '../services/postService';
import SearchBar from '../components/SearchBar';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchUserPosts();
      if (!data.error) {
        setBlogs(data);
      } else {
        console.error(data.error);
      }
      setLoading(false);
    };

    loadPosts();
  }, []);

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
