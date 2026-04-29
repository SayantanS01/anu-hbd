import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import useStore from '../store/useStore';

export default function GiftBox() {
  const mesh = useRef();
  const theme = useStore((state) => state.theme);

  const accentColor = useMemo(() => {
    switch(theme) {
      case 'dark': return '#00f2ff';
      case 'pink': return '#ff0054';
      default: return '#ff4d6d'; // light
    }
  }, [theme]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={mesh} position={[5, -2, -5]} scale={1.5}>
        {/* Main Box */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Ribbon Vertical */}
        <mesh position={[0, 0, 0]} scale={[1.05, 1.05, 0.2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Ribbon Horizontal */}
        <mesh position={[0, 0, 0]} scale={[0.2, 1.05, 1.05]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Bow */}
        <mesh position={[0, 0.6, 0]} rotation={[0.7, 0, 0.7]}>
          <torusGeometry args={[0.2, 0.05, 16, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
}
