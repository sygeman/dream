'use client';
import { useParams, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
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

export const LogoutModal = () => {
  const router = useRouter();
  const dialogUrl = useDialogUrl();

  return (
    <Dialog {...dialogUrl('logout')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Out</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">
          Are yor sure you want to logout?
        </p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={() => signOut()}>Log Out</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
