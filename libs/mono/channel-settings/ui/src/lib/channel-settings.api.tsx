import * as Types from '@dream/mono-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MakeTwitchStreamModeCurrentMutationVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;


export type MakeTwitchStreamModeCurrentMutation = { __typename?: 'Mutation', makeTwitchStreamModeCurrent: boolean };

export type MakeSpotifyModeCurrentMutationVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;


export type MakeSpotifyModeCurrentMutation = { __typename?: 'Mutation', makeSpotifyModeCurrent: boolean };

export type MakeWaitlistYoutubeModeCurrentMutationVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;


export type MakeWaitlistYoutubeModeCurrentMutation = { __typename?: 'Mutation', makeWaitlistYoutubeModeCurrent: boolean };

export type UpdateChannelSettingsMutationVariables = Types.Exact<{
  input: Types.UpdateChannelSettingsInput;
}>;


export type UpdateChannelSettingsMutation = { __typename?: 'Mutation', updateChannelSettings: { __typename?: 'ChannelSettings', id: string, name: string, title: string, mode: Types.ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, avatar?: string | null } };

export type ChannelSettingsFieldsFragment = { __typename?: 'ChannelSettings', id: string, name: string, title: string, mode: Types.ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, avatar?: string | null };

export const ChannelSettingsFieldsFragmentDoc = gql`
    fragment ChannelSettingsFields on ChannelSettings {
  id
  name
  title
  mode
  gifAllowed
  nsfw
  slowmode
  avatar
}
    `;
export const MakeTwitchStreamModeCurrentDocument = gql`
    mutation makeTwitchStreamModeCurrent($channelId: String!) {
  makeTwitchStreamModeCurrent(channelId: $channelId)
}
    `;
export type MakeTwitchStreamModeCurrentMutationFn = Apollo.MutationFunction<MakeTwitchStreamModeCurrentMutation, MakeTwitchStreamModeCurrentMutationVariables>;

/**
 * __useMakeTwitchStreamModeCurrentMutation__
 *
 * To run a mutation, you first call `useMakeTwitchStreamModeCurrentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeTwitchStreamModeCurrentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeTwitchStreamModeCurrentMutation, { data, loading, error }] = useMakeTwitchStreamModeCurrentMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMakeTwitchStreamModeCurrentMutation(baseOptions?: Apollo.MutationHookOptions<MakeTwitchStreamModeCurrentMutation, MakeTwitchStreamModeCurrentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeTwitchStreamModeCurrentMutation, MakeTwitchStreamModeCurrentMutationVariables>(MakeTwitchStreamModeCurrentDocument, options);
      }
export type MakeTwitchStreamModeCurrentMutationHookResult = ReturnType<typeof useMakeTwitchStreamModeCurrentMutation>;
export type MakeTwitchStreamModeCurrentMutationResult = Apollo.MutationResult<MakeTwitchStreamModeCurrentMutation>;
export type MakeTwitchStreamModeCurrentMutationOptions = Apollo.BaseMutationOptions<MakeTwitchStreamModeCurrentMutation, MakeTwitchStreamModeCurrentMutationVariables>;
export const MakeSpotifyModeCurrentDocument = gql`
    mutation makeSpotifyModeCurrent($channelId: String!) {
  makeSpotifyModeCurrent(channelId: $channelId)
}
    `;
export type MakeSpotifyModeCurrentMutationFn = Apollo.MutationFunction<MakeSpotifyModeCurrentMutation, MakeSpotifyModeCurrentMutationVariables>;

/**
 * __useMakeSpotifyModeCurrentMutation__
 *
 * To run a mutation, you first call `useMakeSpotifyModeCurrentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeSpotifyModeCurrentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeSpotifyModeCurrentMutation, { data, loading, error }] = useMakeSpotifyModeCurrentMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMakeSpotifyModeCurrentMutation(baseOptions?: Apollo.MutationHookOptions<MakeSpotifyModeCurrentMutation, MakeSpotifyModeCurrentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeSpotifyModeCurrentMutation, MakeSpotifyModeCurrentMutationVariables>(MakeSpotifyModeCurrentDocument, options);
      }
export type MakeSpotifyModeCurrentMutationHookResult = ReturnType<typeof useMakeSpotifyModeCurrentMutation>;
export type MakeSpotifyModeCurrentMutationResult = Apollo.MutationResult<MakeSpotifyModeCurrentMutation>;
export type MakeSpotifyModeCurrentMutationOptions = Apollo.BaseMutationOptions<MakeSpotifyModeCurrentMutation, MakeSpotifyModeCurrentMutationVariables>;
export const MakeWaitlistYoutubeModeCurrentDocument = gql`
    mutation makeWaitlistYoutubeModeCurrent($channelId: String!) {
  makeWaitlistYoutubeModeCurrent(channelId: $channelId)
}
    `;
export type MakeWaitlistYoutubeModeCurrentMutationFn = Apollo.MutationFunction<MakeWaitlistYoutubeModeCurrentMutation, MakeWaitlistYoutubeModeCurrentMutationVariables>;

/**
 * __useMakeWaitlistYoutubeModeCurrentMutation__
 *
 * To run a mutation, you first call `useMakeWaitlistYoutubeModeCurrentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeWaitlistYoutubeModeCurrentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeWaitlistYoutubeModeCurrentMutation, { data, loading, error }] = useMakeWaitlistYoutubeModeCurrentMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMakeWaitlistYoutubeModeCurrentMutation(baseOptions?: Apollo.MutationHookOptions<MakeWaitlistYoutubeModeCurrentMutation, MakeWaitlistYoutubeModeCurrentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeWaitlistYoutubeModeCurrentMutation, MakeWaitlistYoutubeModeCurrentMutationVariables>(MakeWaitlistYoutubeModeCurrentDocument, options);
      }
export type MakeWaitlistYoutubeModeCurrentMutationHookResult = ReturnType<typeof useMakeWaitlistYoutubeModeCurrentMutation>;
export type MakeWaitlistYoutubeModeCurrentMutationResult = Apollo.MutationResult<MakeWaitlistYoutubeModeCurrentMutation>;
export type MakeWaitlistYoutubeModeCurrentMutationOptions = Apollo.BaseMutationOptions<MakeWaitlistYoutubeModeCurrentMutation, MakeWaitlistYoutubeModeCurrentMutationVariables>;
export const UpdateChannelSettingsDocument = gql`
    mutation updateChannelSettings($input: UpdateChannelSettingsInput!) {
  updateChannelSettings(input: $input) {
    ...ChannelSettingsFields
  }
}
    ${ChannelSettingsFieldsFragmentDoc}`;
export type UpdateChannelSettingsMutationFn = Apollo.MutationFunction<UpdateChannelSettingsMutation, UpdateChannelSettingsMutationVariables>;

/**
 * __useUpdateChannelSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateChannelSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelSettingsMutation, { data, loading, error }] = useUpdateChannelSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChannelSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelSettingsMutation, UpdateChannelSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChannelSettingsMutation, UpdateChannelSettingsMutationVariables>(UpdateChannelSettingsDocument, options);
      }
export type UpdateChannelSettingsMutationHookResult = ReturnType<typeof useUpdateChannelSettingsMutation>;
export type UpdateChannelSettingsMutationResult = Apollo.MutationResult<UpdateChannelSettingsMutation>;
export type UpdateChannelSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateChannelSettingsMutation, UpdateChannelSettingsMutationVariables>;