'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDialogUrl } from '@/helpers/use-dialog-url';

import { deleteCommunityAction } from './actions';

export const DeleteCommunityModal = () => {
  const parameters = useParams();
  const router = useRouter();
  const dialogUrl = useDialogUrl();

  const deleteCommunity = async () => {
    await deleteCommunityAction(parameters.community as string);
    router.push(`/`);
  };

  return (
    <Dialog {...dialogUrl('deleteCommunity')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Community</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">
          Are yor sure want to delete the community? This cannot be undone.
        </p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={deleteCommunity}>Delete Community</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
