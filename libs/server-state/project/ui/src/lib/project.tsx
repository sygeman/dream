import Head from 'next/head';
import { useEffect } from 'react';
import { ProjectCount } from './count';
import {
  useIncrementCountMutation,
  useProjectQuery,
  useProjectStateUpdatedSubscription,
} from './project.api';
import { stateIdVar } from './state';

interface ProjectProps {
  id?: string;
}

export const Project = ({ id }: ProjectProps) => {
  const projectQuery = useProjectQuery({ variables: { id }, skip: !id });
  const project = projectQuery?.data?.project;

  useEffect(() => {
    if (project?.stateId) {
      stateIdVar(project?.stateId);
    }
  }, [project?.stateId]);

  const [incrementCountMutation] = useIncrementCountMutation();

  const incrementCount = () =>
    incrementCountMutation({ variables: { projectId: id } });

  useProjectStateUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      stateIdVar(subscriptionData?.data?.projectStateUpdated);
    },
    skip: !id,
    variables: { projectId: id },
  });

  return (
    <div>
      <Head>
        <title>{project?.title}</title>
      </Head>
      <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="text-4xl">{project?.title}</div>
          <ProjectCount />
          <button
            className="px-2 p-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors delay-75"
            onClick={incrementCount}
          >
            Click me
          </button>
        </div>
      </div>
    </div>
  );
};
