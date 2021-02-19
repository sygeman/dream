import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export function AuthSuccessPage() {
  const rotuer = useRouter();
  const token = rotuer.query?.token;
  const redirect = rotuer.query?.redirect;

  useEffect(() => {
    if (typeof token === 'string' && typeof window !== 'undefined') {
      localStorage.setItem('token', token);

      if (typeof redirect === 'string') {
        rotuer.push(redirect);
      }
    }
  }, [token]);

  return null;
}

export default AuthSuccessPage;
