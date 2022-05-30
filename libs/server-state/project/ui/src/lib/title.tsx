import { useRouter } from 'next/router';
import { useProjectQuery } from './project.api';

export const ProjectTitle = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

  const projectQuery = useProjectQuery({ variables: { id }, skip: !id });
  const project = projectQuery?.data?.project;

  return (
    <div className="flex text-md font-medium px-2">
      <div className="text-white/50 mr-2">Projects /</div>
      <div>{project?.title}</div>
    </div>
  );
};
