Query

- clipScore(clipId: String!): Int!
- follows: [TwitchChannel!]!
- userCoins: Int!
- clipComments(clipId: ID!): [ClipComment!]!

Mutation

- increaseClipScore(clipId: String!): Boolean!
- decreaseClipScore(clipId: String!): Boolean!
- setClipHistory(clipId: String!): Boolean!
- createClipComment(input: ClipCommentCreateInput!): Boolean!
- removeClipComment(id: ID!): Boolean!

Subscription

- clipCommentCreated(clipId: ID!): ClipComment!
- clipCommentRemoved(clipId: ID!): ID!
- userCoinsUpdated: Int!
- clipScoreUpdated(clipId: String!): Int!
