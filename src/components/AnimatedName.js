import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei'; // Using Text3D for extruded effect
import * as THREE from 'three';
import { a, useSpring } from '@react-spring/three';

// Font paths (relative to the 'public' folder)
// For Text3D, Drei will try to convert TTF/OTF on the fly or you can provide pre-converted JSON typeface
const fontBoldUrl = '/fonts/Poppins-Bold.ttf';
const fontRegularUrl = '/fonts/Poppins-Regular.ttf';

// Helper for individual animated 3D text parts
const AnimatedTextPart3D = ({ text, fontUrl, position, rotation = [0,0,0], scale: initialScale = 1, color = '#2c3e50', highlightColor='#3498db', extrusion = 0.1, animDelay = 0 }) => {
  const meshRef = useRef();

  // Intro animation: fade, scale up, and slight upward drift
  const { opacity, scale, yPos } = useSpring({
    from: { opacity: 0, scale: 0.3, yPos: position[1] - 0.5 },
    to: { opacity: 1, scale: initialScale, yPos: position[1] },
    delay: animDelay,
    config: { mass: 1, tension: 120, friction: 14 }, 
  });

  // Ambient animation: subtle bobbing and rotation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = yPos.get() + Math.sin(clock.elapsedTime * 0.5 + animDelay * 0.1) * 0.05;
      meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3 + animDelay * 0.2) * 0.05;
    }
  });

  return (
    <a.group scale={scale} position-y={yPos} rotation={rotation}>
      <Text3D
        ref={meshRef}
        font={fontUrl}
        height={extrusion}      // Extrusion depth
        lineHeight={0.9}
        letterSpacing={-0.02}
        size={0.8}             // Base size, can be overridden by scale prop
        bevelEnabled
        bevelSize={0.015}
        bevelThickness={0.02}
        curveSegments={12}
      >
        {text}
        <meshStandardMaterial 
          color={color} 
          metalness={0.5} 
          roughness={0.4} 
          emissive={highlightColor} // Use emissive for the highlight to make it pop
          emissiveIntensity={0.25}  // Subtle emissive highlight
        />
      </Text3D>
    </a.group>
  );
};

const AnimatedNameScene = () => {
  const groupRef = useRef();
  const { viewport, mouse } = useThree();

  // Mouse interaction: tilt the whole name group
  useFrame(() => {
    if (groupRef.current) {
      const x = (mouse.x * viewport.width) / 200; // Reduced sensitivity
      const y = (mouse.y * viewport.height) / 200; // Reduced sensitivity
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.5, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.5, 0.05);
    }
  });

  // Style similar to "About Me" screenshot: Dark base, lighter top highlight
  const baseColor = '#1A2E3D'; // Dark blue/grey base
  const highlight = '#4A90E2'; // Lighter blue highlight

  return (
    <Center ref={groupRef}> {/* Center the whole group */}
      <AnimatedTextPart3D 
        text="Renan" 
        fontUrl={fontBoldUrl} 
        position={[-0.0, 0.45, 0]} 
        animDelay={300} 
        color={baseColor} 
        highlightColor={highlight}
        extrusion={0.15}
        scale={1.2} // Make "Renan" slightly larger
      />
      <AnimatedTextPart3D 
        text="Freitas Braga." 
        fontUrl={fontRegularUrl} 
        position={[0, -0.35, 0]} 
        animDelay={600} 
        color={baseColor} 
        highlightColor={highlight}
        extrusion={0.1}
      />
    </Center>
  );
};

const AnimatedName = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '300px', // Increased height slightly for 3D depth, adjust as needed
      // outline: '1px solid blue', // For debugging layout
    }}>
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 45 }} // Adjusted camera for better 3D view
        dpr={[1, 2]} 
      >
        <ambientLight intensity={0.6} />
        {/* Main light to cast highlights similar to "About Me" style */}
        <directionalLight 
          position={[3, 5, 5]} 
          intensity={1.5} 
          castShadow 
        />
        <directionalLight position={[-3, 2, -3]} intensity={0.5} color="#AAAAFF" /> {/* Fill light from back-left */}
        <pointLight position={[0, -5, 5]} intensity={0.3} />

        <Suspense fallback={null}> 
          <AnimatedNameScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AnimatedName; 