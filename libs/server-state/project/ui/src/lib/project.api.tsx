import * as Types from '@dream/server-state/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProjectsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, title: string, alias?: string | null, stateId?: string | null, createdAt: string, updatedAt: string }> };

export type ProjectQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, title: string, alias?: string | null, stateId?: string | null, createdAt: string, updatedAt: string } };

export type ProjectStateQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type ProjectStateQuery = { __typename?: 'Query', projectState: { __typename?: 'ProjectState', id: string, count: number, createdAt: string, updatedAt: string } };

export type CreateProjectMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string, alias?: string | null, stateId?: string | null, createdAt: string, updatedAt: string } };

export type IncrementCountMutationVariables = Types.Exact<{
  projectId: Types.Scalars['String'];
}>;


export type IncrementCountMutation = { __typename?: 'Mutation', incrementCount: boolean };

export type ProjectStateUpdatedSubscriptionVariables = Types.Exact<{
  projectId: Types.Scalars['String'];
}>;


export type ProjectStateUpdatedSubscription = { __typename?: 'Subscription', projectStateUpdated: string };

export type ProjectFieldsFragment = { __typename?: 'Project', id: string, title: string, alias?: string | null, stateId?: string | null, createdAt: string, updatedAt: string };

export type ProjectStateFieldsFragment = { __typename?: 'ProjectState', id: string, count: number, createdAt: string, updatedAt: string };

export const ProjectFieldsFragmentDoc = gql`
    fragment ProjectFields on Project {
  id
  title
  alias
  stateId
  createdAt
  updatedAt
}
    `;
export const ProjectStateFieldsFragmentDoc = gql`
    fragment ProjectStateFields on ProjectState {
  id
  count
  createdAt
  updatedAt
}
    `;
export const ProjectsDocument = gql`
    query projects {
  projects {
    ...ProjectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectDocument = gql`
    query project($id: String!) {
  project(id: $id) {
    ...ProjectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectStateDocument = gql`
    query projectState($id: String!) {
  projectState(id: $id) {
    ...ProjectStateFields
  }
}
    ${ProjectStateFieldsFragmentDoc}`;

/**
 * __useProjectStateQuery__
 *
 * To run a query within a React component, call `useProjectStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectStateQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectStateQuery(baseOptions: Apollo.QueryHookOptions<ProjectStateQuery, ProjectStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectStateQuery, ProjectStateQueryVariables>(ProjectStateDocument, options);
      }
export function useProjectStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectStateQuery, ProjectStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectStateQuery, ProjectStateQueryVariables>(ProjectStateDocument, options);
        }
export type ProjectStateQueryHookResult = ReturnType<typeof useProjectStateQuery>;
export type ProjectStateLazyQueryHookResult = ReturnType<typeof useProjectStateLazyQuery>;
export type ProjectStateQueryResult = Apollo.QueryResult<ProjectStateQuery, ProjectStateQueryVariables>;
export const CreateProjectDocument = gql`
    mutation createProject {
  createProject {
    ...ProjectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const IncrementCountDocument = gql`
    mutation incrementCount($projectId: String!) {
  incrementCount(projectId: $projectId)
}
    `;
export type IncrementCountMutationFn = Apollo.MutationFunction<IncrementCountMutation, IncrementCountMutationVariables>;

/**
 * __useIncrementCountMutation__
 *
 * To run a mutation, you first call `useIncrementCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementCountMutation, { data, loading, error }] = useIncrementCountMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useIncrementCountMutation(baseOptions?: Apollo.MutationHookOptions<IncrementCountMutation, IncrementCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementCountMutation, IncrementCountMutationVariables>(IncrementCountDocument, options);
      }
export type IncrementCountMutationHookResult = ReturnType<typeof useIncrementCountMutation>;
export type IncrementCountMutationResult = Apollo.MutationResult<IncrementCountMutation>;
export type IncrementCountMutationOptions = Apollo.BaseMutationOptions<IncrementCountMutation, IncrementCountMutationVariables>;
export const ProjectStateUpdatedDocument = gql`
    subscription projectStateUpdated($projectId: String!) {
  projectStateUpdated(projectId: $projectId)
}
    `;

/**
 * __useProjectStateUpdatedSubscription__
 *
 * To run a query within a React component, call `useProjectStateUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useProjectStateUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectStateUpdatedSubscription({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectStateUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ProjectStateUpdatedSubscription, ProjectStateUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ProjectStateUpdatedSubscription, ProjectStateUpdatedSubscriptionVariables>(ProjectStateUpdatedDocument, options);
      }
export type ProjectStateUpdatedSubscriptionHookResult = ReturnType<typeof useProjectStateUpdatedSubscription>;
export type ProjectStateUpdatedSubscriptionResult = Apollo.SubscriptionResult<ProjectStateUpdatedSubscription>;