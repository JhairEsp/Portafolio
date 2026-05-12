import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Cube({
  position,
  color,
  size
}: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.004;

    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        {/* Luces */}
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          color="#8B5CF6"
        />

        <pointLight position={[-5, -5, -5]} intensity={2} color="#22C55E" />

        {/* Cubos */}
        <Cube position={[-3, 2, -2]} color="#8B5CF6" size={1.2} />
        <Cube position={[2, -1, -3]} color="#22C55E" size={1} />
        <Cube position={[4, 2, -5]} color="#FACC15" size={1.5} />
        <Cube position={[-4, -2, -4]} color="#06B6D4" size={1.3} />
        <Cube position={[0, 0, -2]} color="#EC4899" size={1.1} />

        {/* Cámara suave */}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
