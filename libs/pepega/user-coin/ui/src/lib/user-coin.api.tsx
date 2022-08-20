import * as Types from '@dream/pepega/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserCoinsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserCoinsQuery = { __typename?: 'Query', userCoins: number };

export type UserCoinsUpdatedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type UserCoinsUpdatedSubscription = { __typename?: 'Subscription', userCoinsUpdated: number };


export const UserCoinsDocument = gql`
    query userCoins {
  userCoins
}
    `;

/**
 * __useUserCoinsQuery__
 *
 * To run a query within a React component, call `useUserCoinsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCoinsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCoinsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCoinsQuery(baseOptions?: Apollo.QueryHookOptions<UserCoinsQuery, UserCoinsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCoinsQuery, UserCoinsQueryVariables>(UserCoinsDocument, options);
      }
export function useUserCoinsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCoinsQuery, UserCoinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCoinsQuery, UserCoinsQueryVariables>(UserCoinsDocument, options);
        }
export type UserCoinsQueryHookResult = ReturnType<typeof useUserCoinsQuery>;
export type UserCoinsLazyQueryHookResult = ReturnType<typeof useUserCoinsLazyQuery>;
export type UserCoinsQueryResult = Apollo.QueryResult<UserCoinsQuery, UserCoinsQueryVariables>;
export const UserCoinsUpdatedDocument = gql`
    subscription userCoinsUpdated {
  userCoinsUpdated
}
    `;

/**
 * __useUserCoinsUpdatedSubscription__
 *
 * To run a query within a React component, call `useUserCoinsUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserCoinsUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCoinsUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserCoinsUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserCoinsUpdatedSubscription, UserCoinsUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserCoinsUpdatedSubscription, UserCoinsUpdatedSubscriptionVariables>(UserCoinsUpdatedDocument, options);
      }
export type UserCoinsUpdatedSubscriptionHookResult = ReturnType<typeof useUserCoinsUpdatedSubscription>;
export type UserCoinsUpdatedSubscriptionResult = Apollo.SubscriptionResult<UserCoinsUpdatedSubscription>;