import React from 'react';

export const ChatMessage = ({ username, content }) => {
  return (
    <div className="px-2 w-full">
      <span className="text-accent text-sm">{username}</span>
      <span className="text-text text-sm mr-1">:</span>
      <span className="text-text text-sm">{content}</span>
    </div>
  );
};
