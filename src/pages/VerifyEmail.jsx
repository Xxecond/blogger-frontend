import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying email...');
  const [isLoading, setIsLoading] = useState(true);

  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('❌ Missing verification token');
        setIsLoading(false);
        setTimeout(() => navigate('/login?verified=false'), 3000);
        return;
      }

      try {
        // CORRECTED ENDPOINT - now matches your backend route
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-email`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        setStatus('✅ Email verified! Redirecting...');
        setTimeout(() => navigate('/login?verified=true'), 2000);
      } catch (error) {
        setStatus(`❌ ${error.message || 'Verification failed'}`);
        setTimeout(() => navigate('/login?verified=false'), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        
        <div className="flex items-center justify-center gap-3">
          {isLoading && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          )}
          <p className={`text-lg ${
            isLoading ? 'text-blue-600' : 
            status.includes('✅') ? 'text-green-600' : 'text-red-600'
          }`}>
            {status}
          </p>
        </div>

        {!isLoading && status.includes('❌') && (
          <button
            onClick={() => navigate('/resend-verification')}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Resend Verification Email
          </button>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;