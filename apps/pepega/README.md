# Rewrite from apollo gql to trpc

## Comments

### query

- clipComments(clipId: ID!): [ClipComment!]!

### mutation

- createClipComment(input: ClipCommentCreateInput!): Boolean!
- removeClipComment(id: ID!): Boolean!

### subscription

- clipCommentCreated(clipId: ID!): ClipComment!
- clipCommentRemoved(clipId: ID!): ID!
