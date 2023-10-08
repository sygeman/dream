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

import { deleteChannelAction } from './actions';

export const DeleteChannelModal = () => {
  const router = useRouter();
  const parameters = useParams();
  const dialogUrl = useDialogUrl();

  const deleteChannel = async () => {
    await deleteChannelAction({
      channel: parameters.channel as string,
      community: parameters.community as string,
    });

    router.push(`/${parameters.community}`);
  };

  return (
    <Dialog {...dialogUrl('deleteChannel')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Channel</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">
          Are yor sure want to delete the channel? This cannot be undone.
        </p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={deleteChannel}>Delete Channel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
