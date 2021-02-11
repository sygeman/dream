import React from 'react';
import { Flex } from '@dream/ui/base/Flex';
import { Typography } from '@dream/ui';

export const Logo: React.FC = React.memo(() => (
  <Flex>
    <Typography fontSize="14px" fontFamily="logo">
      Rave
    </Typography>
    <Typography fontSize="14px" color="ravepro" fontFamily="logo">
      Pro
    </Typography>
  </Flex>
));
