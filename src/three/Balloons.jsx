import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import useStore from '../store/useStore';

function Balloon({ position, color, speed }) {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y += Math.sin(t * speed) * 0.005;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position}>
        <mesh ref={mesh}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial 
            color={color} 
            roughness={0.05} 
            metalness={0.9} 
            emissive={color}
            emissiveIntensity={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </mesh>
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
          <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
      </group>
    </Float>
  );
}

export default function Balloons() {
  const theme = useStore((state) => state.theme);
  
  // Map theme to specific balloon colors based on your palette
  const accentColor = useMemo(() => {
    switch(theme) {
      case 'dark': return '#00f2ff';
      case 'pink': return '#ff0054';
      default: return '#ff4d6d'; // light
    }
  }, [theme]);

  const balloonData = useMemo(() => [
    { pos: [-4, 2, -5], color: accentColor, speed: 1 },
    { pos: [4, 5, -8], color: '#ffffff', speed: 1.2 },
    { pos: [-6, 6, -10], color: accentColor, speed: 0.8 },
    { pos: [7, -2, -6], color: '#666666', speed: 1.5 },
    { pos: [-2, 8, -12], color: accentColor, speed: 1.1 },
  ], [accentColor]);

  return (
    <group>
      {balloonData.map((data, i) => (
        <Balloon key={i} position={data.pos} color={data.color} speed={data.speed} />
      ))}
    </group>
  );
}
