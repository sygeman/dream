import React from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@pepega/containers/RavePro/Auth';
import { RaveProLayout } from '@pepega/ui';

export function AuthSuccess() {
  const rotuer = useRouter();
  const code = rotuer.query?.code;
  const redirect = rotuer.query?.redirect;

  return (
    <RaveProLayout>
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
    </RaveProLayout>
  );
}

export default AuthSuccess;
