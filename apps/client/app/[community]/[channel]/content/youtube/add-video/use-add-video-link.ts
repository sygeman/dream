import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useAddVideoLink = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const waitlistYoutubeAddVideoLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set('waitlistYoutubeAddVideo', '1');
    return `${pathname}?${newParams?.toString()}`;
  }, [searchParams]);

  return { waitlistYoutubeAddVideoLink };
};
