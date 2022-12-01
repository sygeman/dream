type Query {
clipComments(clipId: ID!): [ClipComment!]!
userCoins: Int!
clipScore(clipId: String!): Int!
follows: [TwitchChannel!]!
}

type Mutation {
logout: Boolean!
createClipComment(input: ClipCommentCreateInput!): Boolean!
removeClipComment(id: ID!): Boolean!
setClipHistory(clipId: String!): Boolean!
increaseClipScore(clipId: String!): Boolean!
decreaseClipScore(clipId: String!): Boolean!
}

type Subscription {
clipCommentCreated(clipId: ID!): ClipComment!
clipCommentRemoved(clipId: ID!): ID!
userCoinsUpdated: Int!
clipScoreUpdated(clipId: String!): Int!
}
