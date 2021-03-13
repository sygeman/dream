import React from 'react';
import { useRouter } from 'next/router';
import { useCommunityQuery } from '@dream/types';

export const CommunityWelcome = () => {
  const router = useRouter();
  const name =
    typeof router.query?.community === 'string' && router.query?.community;

  const communityQuery = useCommunityQuery({
    variables: { name },
    skip: !name,
  });

  const community = communityQuery?.data?.community;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="text-2xl text-white ">Welcome to {community?.title}</div>
    </div>
  );
};
