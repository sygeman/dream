import React from 'react';
import { useRouter } from 'next/router';
import { AuthSuccess } from '@dream/auth';

export function AuthSuccessPage() {
  const rotuer = useRouter();
  const code = rotuer.query?.code;
  const redirect = rotuer.query?.redirect;

  return (
    <AuthSuccess
      code={typeof code === 'string' && code}
      onSuccess={({ accessToken, refreshToken }) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        if (typeof redirect === 'string') {
          rotuer.push(redirect);
        }
      }}
    />
  );
}

export default AuthSuccessPage;
