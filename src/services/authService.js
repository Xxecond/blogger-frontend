 const API_BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Signup
export async function signupUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Signup failed' };
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error.message);
    return { error: 'Network error or server not responding' };
  }
}

// ✅ Login
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Login failed' };
    }

    localStorage.setItem('token', data.token); // Optional
    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    return { error: 'Network error or server not responding' };
  }
}
