import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from '../models/box';

export function LabPage() {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{
          fov: 35,
          position: [20, 20, 20],
        }}
      >
        <pointLight position={[10, 10, 10]} intensity={1.5} color={'#fff'} />
        <Suspense fallback={null}>
          <group position-y={0} dispose={null}>
            <Model />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default LabPage;
