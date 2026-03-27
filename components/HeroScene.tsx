import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  darkMode: boolean;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ darkMode }) => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points on a sphere
  const count = 3000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      const r = 2 + Math.random() * 2; // Radius variation
      
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      
      // Gentle floating effect based on mouse (simulated here with time)
      const time = state.clock.getElapsedTime();
      ref.current.position.y = Math.sin(time / 4) * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={darkMode ? "#66FCF1" : "#2C3E50"}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={darkMode ? 0.8 : 0.6}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

interface HeroSceneProps {
  darkMode: boolean;
}

const HeroScene: React.FC<HeroSceneProps> = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ParticleField darkMode={darkMode} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
