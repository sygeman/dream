import { makeVar, useReactiveVar } from '@apollo/client';
import { useProjectStateQuery } from './project.api';

export const stateIdVar = makeVar<null | string>(null);

export const useProjectState = () => {
  const stateId = useReactiveVar(stateIdVar);

  const projectStateQuery = useProjectStateQuery({
    variables: { id: stateId },
    skip: !stateId,
  });
  const projectState = projectStateQuery?.data?.projectState;

  return {
    stateId,
    state: projectState,
    loading: projectStateQuery.loading,
  };
};
