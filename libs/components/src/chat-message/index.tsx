import React from 'react';

export const ChatMessage = ({ username, content }) => {
  return (
    <div className="px-2 w-full">
      <span className="text-accent text-xs">{username}</span>
      <span className="text-text text-xs mr-1">:</span>
      <span className="text-text text-xs">{content}</span>
    </div>
  );
};
