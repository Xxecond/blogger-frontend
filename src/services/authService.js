const API_BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Signup user
export async function signupUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
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

// ✅ Login user
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Login failed' };
    }

    // Optional: save token
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    return { error: 'Network error or server not responding' };
  }
}
