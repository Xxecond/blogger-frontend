import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import About from './pages/About';
import BlogDetails from './pages/BlogDetails';
import EditBlog from './pages/EditBlog';
import NotFound from './pages/NotFound';
import Splash from './pages/splash';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavRoutes = ['/login', '/signup'];

  // Splash display logic
  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => setShowSplash(false), 3500);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [location]);

  // Redirect to /login after splash screen ends
  useEffect(() => {
    if (!showSplash && location.pathname === '/') {
      navigate('/login');
    }
  }, [showSplash, location, navigate]);

  const routes = (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
  
      {/* App routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/about" element={<><About /><Footer /></>} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <>
      {showSplash ? (
        <Splash />
      ) : (
        <>
          {!hideNavRoutes.includes(location.pathname) && (
            <>
              <Navbar />
              <Header />
            </>
          )}

          {!hideNavRoutes.includes(location.pathname) ? (
            <div className="main-content">
              {routes}
            </div>
          ) : (
            routes
          )}
        </>
      )}
    </>
  );
}

export default App;
