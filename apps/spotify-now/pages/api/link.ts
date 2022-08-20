import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';

const link = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });
  const link = user?.link;

  if (session) {
    res.send({ link });
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
};

export default link;
