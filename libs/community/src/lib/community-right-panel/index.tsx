import React from 'react';
import { AnnotationIcon } from '@dream/icons/annotation';
import { UsersIcon } from '@dream/icons/users';
import { Chat } from '@dream/chat';

export const CommunityRightPanel = () => {
  return (
    <div className="h-screen flex flex-col w-320px bg-surface">
      <div className="flex border-b border-background">
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <AnnotationIcon />
          </span>
        </div>
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <UsersIcon />
          </span>
        </div>
      </div>
      <Chat chatId="ckjqa4tsg00008amaxie5r8vi" />
    </div>
  );
};
