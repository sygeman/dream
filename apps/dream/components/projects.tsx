import Link from 'next/link';
import React from 'react';
import { projects } from '../data/projects';

export const Projects = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-medium pb-4">Projects</h2>
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            passHref
            shallow
          >
            <a
              href="replace"
              style={{ backgroundColor: project.color }}
              className="flex items-center justify-center h-48 w-80 overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="text-center text-white">
                <div className="text-2xl font-medium">{project.title}</div>
                <div className="text-md text-white/50 font-medium">
                  {project.description}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
