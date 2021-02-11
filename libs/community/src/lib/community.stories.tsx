import React from 'react';
import { WithApollo } from '@dream/utils/apollo/WithApollo';
import { Community as CommunityContainer } from './community';

export default {
  title: 'Containers/RavePro',
};

export const Community = () => {
  return (
    <WithApollo>
      <CommunityContainer />
    </WithApollo>
  );
};
