const API_BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Get auth token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

// ✅ Create a new blog post
export async function createPost({ title, body, image }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, body, image }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.error || 'Failed to create post' };
    }

    return data;
  } catch (error) {
    console.error('Create post error:', error.message);
    return { error: 'Network error or server not responding' };
  }
}

// ✅ Get posts for logged-in user
export async function fetchUserPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.error || 'Failed to fetch posts' };
    }

    return data;
  } catch (error) {
    console.error('Fetch posts error:', error.message);
    return { error: 'Network error or server not responding' };
  }
}

// ✅ Get a single post by ID
export async function getPostById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.error || 'Failed to fetch post' };
    }

    return data;
  } catch (error) {
    console.error('Get post by ID error:', error.message);
    return { error: 'Network error or server not responding' };
  }
}

// ✅ Update a post
export async function updatePost(id, { title, body, image }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, body, image }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.error || 'Failed to update post' };
    }

    return data;
  } catch (error) {
    console.error('Update post error:', error.message);
    return { error: 'Network error or server not responding' };
  }
}

// ✅ Delete a post
export async function deletePost(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.error || 'Failed to delete post' };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete post error:', error.message);
    return { error: 'Network error or server not responding' };
  }
}
