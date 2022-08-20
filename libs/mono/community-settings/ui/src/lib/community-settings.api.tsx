import * as Types from '@dream/mono-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CommunitySettingsQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type CommunitySettingsQuery = { __typename?: 'Query', communitySettings: { __typename?: 'CommunitySettings', id: string, name: string, title: string, avatar?: string | null } };

export type UpdateCommunitySettingsMutationVariables = Types.Exact<{
  input: Types.UpdateCommunitySettingsInput;
}>;


export type UpdateCommunitySettingsMutation = { __typename?: 'Mutation', updateCommunitySettings: { __typename?: 'CommunitySettings', id: string, name: string, title: string, avatar?: string | null } };

export type CommunitySettingsFieldsFragment = { __typename?: 'CommunitySettings', id: string, name: string, title: string, avatar?: string | null };

export const CommunitySettingsFieldsFragmentDoc = gql`
    fragment CommunitySettingsFields on CommunitySettings {
  id
  name
  title
  avatar
}
    `;
export const CommunitySettingsDocument = gql`
    query communitySettings($name: String!) {
  communitySettings(name: $name) {
    ...CommunitySettingsFields
  }
}
    ${CommunitySettingsFieldsFragmentDoc}`;

/**
 * __useCommunitySettingsQuery__
 *
 * To run a query within a React component, call `useCommunitySettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunitySettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunitySettingsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCommunitySettingsQuery(baseOptions: Apollo.QueryHookOptions<CommunitySettingsQuery, CommunitySettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunitySettingsQuery, CommunitySettingsQueryVariables>(CommunitySettingsDocument, options);
      }
export function useCommunitySettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunitySettingsQuery, CommunitySettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunitySettingsQuery, CommunitySettingsQueryVariables>(CommunitySettingsDocument, options);
        }
export type CommunitySettingsQueryHookResult = ReturnType<typeof useCommunitySettingsQuery>;
export type CommunitySettingsLazyQueryHookResult = ReturnType<typeof useCommunitySettingsLazyQuery>;
export type CommunitySettingsQueryResult = Apollo.QueryResult<CommunitySettingsQuery, CommunitySettingsQueryVariables>;
export const UpdateCommunitySettingsDocument = gql`
    mutation updateCommunitySettings($input: UpdateCommunitySettingsInput!) {
  updateCommunitySettings(input: $input) {
    ...CommunitySettingsFields
  }
}
    ${CommunitySettingsFieldsFragmentDoc}`;
export type UpdateCommunitySettingsMutationFn = Apollo.MutationFunction<UpdateCommunitySettingsMutation, UpdateCommunitySettingsMutationVariables>;

/**
 * __useUpdateCommunitySettingsMutation__
 *
 * To run a mutation, you first call `useUpdateCommunitySettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunitySettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunitySettingsMutation, { data, loading, error }] = useUpdateCommunitySettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommunitySettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunitySettingsMutation, UpdateCommunitySettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunitySettingsMutation, UpdateCommunitySettingsMutationVariables>(UpdateCommunitySettingsDocument, options);
      }
export type UpdateCommunitySettingsMutationHookResult = ReturnType<typeof useUpdateCommunitySettingsMutation>;
export type UpdateCommunitySettingsMutationResult = Apollo.MutationResult<UpdateCommunitySettingsMutation>;
export type UpdateCommunitySettingsMutationOptions = Apollo.BaseMutationOptions<UpdateCommunitySettingsMutation, UpdateCommunitySettingsMutationVariables>;