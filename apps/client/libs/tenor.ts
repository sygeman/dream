import { prisma } from './prisma';
import { key as tenorKey } from 'apps/client/config/tenor';

export const getTenorGif = async (id: string) => {
  const gifFromPrisma = await prisma.tenorGif.findUnique({
    where: { id },
  });

  if (gifFromPrisma) return gifFromPrisma;

  const params = new URLSearchParams();
  params.set('key', tenorKey);
  params.set('ids', id);

  const query = await fetch(`https://g.tenor.com/v1/gifs?${params.toString()}`);
  const res = await query.json();
  const tenorGif = res?.[0];

  if (!tenorGif) throw 'Gif not found';

  const mp4 = tenorGif.media[0].mp4;

  return prisma.tenorGif.create({
    data: {
      id: tenorGif.id,
      video: mp4.url,
      preview: mp4.preview,
      height: mp4.dims[1],
      width: mp4.dims[0],
    },
  });
};
