import Head from 'next/head';
import Link from 'next/link';
import { useProjectsQuery } from './project.api';

export const ProjectsList = () => {
  const projectsQuery = useProjectsQuery();
  const projects = projectsQuery?.data?.projects || [];

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="p-6 h-full w-full">
        {projects.map((project) => (
          <div key={project.id} className="w-full mb-2">
            <Link href={`/project/${project.id}`} passHref>
              <a
                href="replace"
                className="flex px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-700/50 cursor-pointer w-full"
              >
                {project.title}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
