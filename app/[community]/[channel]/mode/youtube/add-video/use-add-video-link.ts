import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useAddVideoLink = () => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const waitlistYoutubeAddVideoLink = useMemo(() => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.set('waitlistYoutubeAddVideo', '1');
    return `${pathname}?${newParameters?.toString()}`;
  }, [pathname, searchParameters]);

  return { waitlistYoutubeAddVideoLink };
};
