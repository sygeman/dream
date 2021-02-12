import { gql, useMutation, useQuery } from '@apollo/client';
import { Flex, Button, Typography } from '@dream/ui';
import { Menu, MenuItem } from '@dream/ui/Menu';
import { getRefreshToken } from '@dream/utils/token';
import React, { useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background: ${({ theme }) => theme.dark2};
`;

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  overflow: hidden;
`;

const Skeleton = styled(Flex)`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dark2};
`;

export const UserMenu = ({
  codeHandler = 'https://ravepro.sgmn.dev/auth/success?',
  redirectUri = 'https://ravepro.sgmn.dev/',
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenuIsOpen = () => setMenuIsOpen(!menuIsOpen);

  const login = (provider: string) => {
    const params = new URLSearchParams();
    params.set('code_handler', codeHandler);
    params.set('redirect_uri', redirectUri);
    const url = `https://api.sgmn.dev/auth/${provider}?` + params.toString();

    console.log(url);

    window.location.href = url;
  };

  const [logout] = useMutation(
    gql`
      mutation logout($refreshToken: String!) {
        logout(refreshToken: $refreshToken)
      }
    `,
    {
      onCompleted: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
      },
    }
  );

  const GuestMenu = () => {
    return (
      <Flex>
        <Button onClick={() => login('spotify')}>
          <Typography>Login with Spotify</Typography>
        </Button>
        <Button onClick={() => login('twitch')}>
          <Typography>Login with Twitch</Typography>
        </Button>
      </Flex>
    );
  };

  const meQuery = useQuery(gql`
    query me {
      me {
        id
        profile {
          id
          name
          avatar
        }
      }
    }
  `);

  const profile = meQuery?.data?.me?.profile;

  if (meQuery.loading) {
    return (
      <Box>
        <Skeleton />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box>
        <GuestMenu />
      </Box>
    );
  }

  return (
    <Box>
      <Flex position="relative">
        <Avatar
          src={profile?.avatar}
          alt={profile?.name}
          onClick={toggleMenuIsOpen}
        />
        {menuIsOpen && (
          <Flex position="absolute" right="0px" top="100%">
            <Menu mt="10px">
              <MenuItem
                onClick={() => {
                  logout({
                    variables: {
                      refreshToken: getRefreshToken(),
                    },
                  });
                  setMenuIsOpen(false);
                }}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
