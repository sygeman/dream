/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: chatMessages
// ====================================================

export interface chatMessages_chatMessages_author {
  __typename: "User";
  id: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
}

export interface chatMessages_chatMessages {
  __typename: "ChatMessage";
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  author: chatMessages_chatMessages_author;
}

export interface chatMessages {
  chatMessages: chatMessages_chatMessages[];
}

export interface chatMessagesVariables {
  chatId: string;
}
