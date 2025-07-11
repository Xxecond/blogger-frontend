import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('');
  const [verifying, setVerifying] = useState(false);

  const token = searchParams.get('token');

  const handleVerify = async () => {
    setVerifying(true);
    try {
      const res = await fetch('https://blogger-backend-production-219f.up.railway.app/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(data.message);
      } else {
        setStatus(data.message || 'Verification failed');
      }
    } catch (err) {
      setStatus('Something went wrong. Try again.');
    }
    setVerifying(false);
  };

  useEffect(() => {
    if (!token) {
      setStatus('No token found');
    }
  }, [token]);

  return (
    <div className="wrapper">
      <h2>Email Verification</h2>
      {status ? (
        <p>{status}</p>
      ) : (
        <>
          <p>Is this you?</p>
          <button className="btn" onClick={handleVerify} disabled={verifying}>
            {verifying ? 'Verifying...' : 'Yes, it’s me'}
          </button>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;