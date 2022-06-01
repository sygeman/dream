import { useReactiveVar } from '@apollo/client';
import Head from 'next/head';
import { useEffect } from 'react';
import { ProjectClicker } from './clicker';
import { ProjectCount } from './count';
import {
  useProjectQuery,
  useProjectStateUpdatedSubscription,
} from './project.api';
import { stateIdVar } from './state';

interface ProjectProps {
  id?: string;
}

export const Project = ({ id }: ProjectProps) => {
  const stateId = useReactiveVar(stateIdVar);

  const projectQuery = useProjectQuery({ variables: { id }, skip: !id });
  const project = projectQuery.data?.project;

  useEffect(() => {
    if (project?.stateId && !stateId) {
      stateIdVar(project?.stateId);
    }
  }, [project?.stateId, stateId]);

  useProjectStateUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      stateIdVar(subscriptionData?.data?.projectStateUpdated);
    },
    skip: !id,
    variables: { projectId: id },
  });

  return (
    <>
      <Head>
        <title>{project?.title}</title>
      </Head>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="text-4xl">{project?.title}</div>
          <ProjectCount />
          <ProjectClicker id={id} />
        </div>
      </div>
    </>
  );
};
