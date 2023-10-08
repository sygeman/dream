'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDialogUrl } from '@/helpers/use-dialog-url';

export const LoginModal = () => {
  const dialogUrl = useDialogUrl();

  return (
    <Dialog {...dialogUrl('authModal')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
        </DialogHeader>
        <Button onClick={() => signIn('twitch')}>Login with Twitch</Button>
      </DialogContent>
    </Dialog>
  );
};
