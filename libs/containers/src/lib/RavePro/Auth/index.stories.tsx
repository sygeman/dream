import React from 'react';
import { WithApollo } from '@pepega/utils/apollo/WithApollo';
import { Auth as AuthContainer } from './';
import { Flex } from '@pepega/ui';

export default {
  title: 'Containers/RavePro',
};

export const Auth = () => {
  const p = new URLSearchParams();
  p.set(
    'code_handler',
    'https://storybook.sgmn.dev/?path=/story/containers-ravepro--auth&'
  );
  p.set('redirect_uri', 'https://storybook.sgmn.dev/');
  const url = 'https://api.sgmn.dev/auth/spotify?' + p.toString();

  const params = new URL(window.location.href).searchParams;
  const code = params.get('code');

  return (
    <WithApollo>
      <Flex>{url}</Flex>
      <AuthContainer
        code={code}
        onSuccess={({ accessToken, refreshToken }) => {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }}
        onError={(error) => console.log(error.message)}
      />
    </WithApollo>
  );
};
