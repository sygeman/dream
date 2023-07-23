import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isOpen = (id: string) => searchParams.has(id);

  const onClose = (id: string) => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.delete(id);

    router.push(`${pathname}?${newParams?.toString()}`);
  };

  return { isOpen, onClose };
};
