 const API_BASE_URL = 'https://blogger-backend-production-219f.up.railway.app/api/auth';

export async function signupUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');
    return data;
  } catch (error) {
    console.error('Signup error:', error.message);
    return { error: error.message };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    
    // ✅ Save token to localStorage for future authenticated requests
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    return { error: error.message };
  }
}
