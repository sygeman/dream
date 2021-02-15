import React from 'react';
import { useRouter } from 'next/router';

export const CommunityWelcome = () => {
  const router = useRouter();
  const community = router.query?.community;

  return <div className="w-full text-white">Welcome to {community}</div>;
};
