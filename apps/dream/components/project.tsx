import React from 'react';
import Color from 'color';
import { projects } from '../data/projects';
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

export const Project = ({ projectId }: { projectId: string }) => {
  const project = projects.find((p) => p.id === projectId);

  return (
    <div
      className="flex justify-between items-center w-full h-full"
      style={{ background: darken(project?.color, 0.1) }}
    >
      <div className="flex flex-col items-center justify-center py-2 w-1/4 font-medium">
        <div>
          <h2 className="text-xl text-white">{project?.title}</h2>
          <h3 className="text-md text-white/50">{project?.description}</h3>
          {project?.link && <a
            className="text-white/50 underline"
            href={`https://${project?.link}`}
            target="_blank"
            rel="noreferrer"
          >
            {project?.link}
          </a>}
        </div>
      </div>
      <div className="w-3/4 mt-12">
       {project?.image && <img
          alt=""
          className="border-none shadow-2xl rounded overflow-hidden"
          src={project?.image}
        />}
      </div>
    </div>
  );
};
