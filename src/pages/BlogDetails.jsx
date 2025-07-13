import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/postService';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      const data = await getPostById(id);
      if (!data.error) setBlog(data);
      setLoading(false);
    };
    loadPost();
  }, [id]);

  if (loading) return <p>Loading blog...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="blog-details">
      <h2>{blog.title}</h2>
      <img src={blog.image} alt={blog.title} className="image-preview" />
      <p>{blog.body || blog.content}</p>
    </div>
  );
}

export default BlogDetails;
