import { useRouter } from 'next/router';

export const useModal = () => {
  const router = useRouter();

  const isOpen = (id: string) => router && !!router.query[id];

  const onClose = (id: string) => {
    const { [id]: k, ...query } = router.query;
    router.push({ pathname: router.pathname, query });
  };

  return { isOpen, onClose };
};
