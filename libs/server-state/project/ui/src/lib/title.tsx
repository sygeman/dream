import Link from 'next/link';
import { useRouter } from 'next/router';
import { useProjectQuery, useCreateProjectMutation } from './project.api';

export const ProjectTitle = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

  const projectQuery = useProjectQuery({ variables: { id }, skip: !id });
  const project = projectQuery?.data?.project;

  const [createProjectMutation] = useCreateProjectMutation();
  const createProject = () =>
    createProjectMutation({
      onCompleted: (data) => {
        router.push(`/project/${data.createProject.id}`);
      },
    });

  return (
    <div className="flex items-center text-md font-medium px-2">
      <Link href="/" passHref>
        <a href="replace" className="text-white/50">
          Projects
        </a>
      </Link>
      {id && (
        <>
          <div className="text-white/50 mx-2">/</div>
          <div>
            {!id || projectQuery?.loading ? (
              <div className="w-40 h-4 bg-black/50 rounded-lg" />
            ) : (
              project?.title
            )}
          </div>
        </>
      )}
      <button
        className="ml-4 px-2 p-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors delay-75 text-sm font-medium"
        onClick={createProject}
      >
        Create Project
      </button>
    </div>
  );
};
