import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [verifying, setVerifying] = useState(true);

  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('No token found');
        setVerifying(false);
        return;
      }

      try {
        const res = await fetch('https://blogger-backend-production-219f.up.railway.app/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus(data.message);
          setTimeout(() => {
            navigate('/home?verified=true'); // ✅ redirect with query param
          }, 2000);
        } else {
          setStatus(data.message || 'Verification failed');
        }
      } catch (err) {
        setStatus('Something went wrong. Try again.');
      }

      setVerifying(false);
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="wrapper">
      <h2>Email Verification</h2>
      {verifying ? (
        <p>Verifying...</p>
      ) : (
        <p>{status}</p>
      )}
    </div>
  );
}

export default VerifyEmail;
