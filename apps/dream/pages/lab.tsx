import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from '../models/work-place';
import { PresentationControls } from '@react-three/drei';

const WorkPlace = () => {
  return (
    <div className="relative w-full">
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 35,
          position: [20, 20, 20],
        }}
      >
        <PresentationControls
          global
          zoom={1}
          rotation={[0, -Math.PI / 2, 0]}
          polar={[0, Math.PI / 2]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Suspense fallback={null}>
            <group position-y={0} dispose={null}>
              <pointLight position={[5, 5, 2]} intensity={0.7} color={'#fff'} />
              <Model />
            </group>
          </Suspense>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export function LabPage() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex bg-background">
      <div className="flex relative w-1/2">
        <WorkPlace />
      </div>
      <div className="flex relative w-1/2 bg-surface ">
        <div className="w-full px-4 py-2">
          <h1 className="text-2xl">Simple Text</h1>
        </div>
      </div>
    </div>
  );
}

export default LabPage;
