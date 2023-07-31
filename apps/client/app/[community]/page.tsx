import { prisma } from 'apps/client/libs/prisma';

type Props = {
  params: { community: string };
};

async function CommunityPage({ params: { community: name } }: Props) {
  const community = await prisma.community.findFirst({
    where: { name, deleted: false },
  });

  return (
    <div className="w-full flex justify-center items-center">
      <div className="text-2xl text-white ">Welcome to {community?.title}</div>
    </div>
  );
}

export default CommunityPage;
