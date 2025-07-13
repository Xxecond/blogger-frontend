import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying email...');
  const [verifying, setVerifying] = useState(true);

  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('No token found in URL.');
        setVerifying(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/verify-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus('✅ Email verified successfully!');
          setTimeout(() => navigate('/login?verified=true'), 2000);
        } else {
          setStatus(data.message || '❌ Verification failed.');
        }
      } catch (err) {
        setStatus('❌ Something went wrong. Try again.');
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="wrapper">
      <h2>Email Verification</h2>
      <p style={{ color: verifying ? 'blue' : 'black' }}>{status}</p>
    </div>
  );
}

export default VerifyEmail;
