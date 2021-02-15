import React from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@dream/containers/RavePro/Auth';

export function AuthSuccess() {
  const rotuer = useRouter();
  const code = rotuer.query?.code;
  const redirect = rotuer.query?.redirect;

  return (
    <Auth
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

export default AuthSuccess;
