import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../services/postService';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getPostById(id);
      if (!data.error) {
        setTitle(data.title);
        setContent(data.body);
        if (data.image) setImage(data.image);
      } else {
        alert(data.error);
        navigate('/home');
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updatePost(id, {
      title,
      body: content,
      image,
    });

    if (!result.error) {
      navigate('/home');
    } else {
      alert(result.error);
    }
  };

  if (loading) return <p>Loading blog...</p>;

  return (
    <div className="page-2">
      <form onSubmit={handleSubmit}>
        <div className="two">
          <input
            placeholder="Title"
            value={title}
            className="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {!image && (
            <div>
              <input
                id="file-upload"
                type="file"
                className="image-upload"
                onChange={handleImageUpload}
              />
            </div>
          )}

          {image && (
            <div className="image-preview-container">
              <img src={image} alt="Preview" className="image-preview" />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="rm-img-btn"
              >
                Remove Image
              </button>
            </div>
          )}

          <textarea
            placeholder="Content"
            value={content}
            className="content"
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className="submit" type="submit">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
