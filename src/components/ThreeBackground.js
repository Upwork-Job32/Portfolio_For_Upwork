import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

// Define style object outside the component to keep its reference stable
const backgroundCanvasContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  background: 'linear-gradient(to bottom, #000000, #1a1a1a)' // Restoring background gradient
};

function ParticleField() {
  const ref = useRef();
  const count = 7000;
  
  const positions = useMemo(() => {
    const positionsArray = new Float32Array(count * 3);
    // Ensure maath.random is available and correctly imported if this causes issues
    if (random && typeof random.inSphere === 'function') {
      random.inSphere(positionsArray, { radius: 15 });
    }
    return positionsArray;
  }, [count]); // Added count to dependency array for completeness, though it's constant here

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

const ThreeBackground = React.memo(() => {
  // console.log("ThreeBackground (Particle Version) rendering"); // Log for debugging
  return (
    <div style={backgroundCanvasContainerStyle}>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ParticleField />
      </Canvas>
    </div>
  );
});

ThreeBackground.displayName = 'ThreeBackground';

export default ThreeBackground; 