import useSWR from 'swr';
import { useRouter } from 'next/router';
import { TrackInfo } from '../components/track-info';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function LinkPage() {
  const router = useRouter();
  const link = router?.query['link'];

  const { data: current } = useSWR(link ? `/api/now/${link}` : null, fetcher, {
    refreshInterval: 3000,
  });

  if (!current) return null;

  return (
    <div className="h-screen bg-background flex">
      <TrackInfo
        imageUrl={current?.imageUrl}
        artist={current?.artist}
        name={current?.name}
        progress={current?.progress}
      />
    </div>
  );
}

export default LinkPage;
