Query

- follows: [TwitchChannel!]!
- clipComments(clipId: ID!): [ClipComment!]!

Mutation

- setClipHistory(clipId: String!): Boolean!
- createClipComment(input: ClipCommentCreateInput!): Boolean!
- removeClipComment(id: ID!): Boolean!

Subscription

- clipCommentCreated(clipId: ID!): ClipComment!
- clipCommentRemoved(clipId: ID!): ID!

Events Service

- subscribe
- unsubscribe
- publish
