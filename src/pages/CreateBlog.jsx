import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in first");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body: content, image }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Failed to create post");
      } else {
        navigate('/home', { state: { newPost: true } }); // ✅ key update
      }
    } catch (err) {
      console.error("Create error:", err);
      alert("Network or server error");
    }
  };

  return (
    <div className="page-2">
      <form onSubmit={handleSubmit}>
        <div className="two">
          <input
            placeholder="Title"
            value={title}
            className="title"
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="file"
            className="image-upload"
            onChange={handleImageUpload}
            required
          />
          {image && <img src={image} alt="Preview" className="image-preview" />}
          <textarea
            placeholder="Type content here"
            value={content}
            className="content"
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <button className="submit" type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateBlog;
