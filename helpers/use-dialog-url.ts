import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useDialogUrl = () => {
  const router = useRouter();
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const isOpen = (id: string) => searchParameters.has(id);

  const onClose = (id: string) => {
    const nextParameters = new URLSearchParams([...searchParameters.entries()]);
    nextParameters.delete(id);
    router.push(`${pathname}?${nextParameters?.toString()}`);
  };

  return (id: string) => ({
    open: isOpen(id),
    onOpenChange: (isOpen: boolean) => {
      if (!isOpen) onClose(id);
    },
  });
};
