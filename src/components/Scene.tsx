import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars } from '@react-three/drei';
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

    // Rotación suave
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;

    // Movimiento flotante
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.25;

    // Movimiento lateral leve
    meshRef.current.position.x =
      position[0] + Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1.5}
      floatIntensity={2}
    >
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      
      {/* Fondo gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#111827]" />

      {/* Glow morado */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />

      {/* Glow verde */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl animate-pulse" />

      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
      >
        {/* Niebla futurista */}
        <fog attach="fog" args={['#050505', 8, 20]} />

        {/* Luces */}
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
          color="#8B5CF6"
        />

        <pointLight
          position={[-5, -5, -5]}
          intensity={3}
          color="#22C55E"
        />

        <pointLight
          position={[0, 5, 5]}
          intensity={2}
          color="#FACC15"
        />

        {/* Estrellas */}
        <Stars
          radius={80}
          depth={50}
          count={4000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Cubos */}
        <Cube position={[-3, 2, -2]} color="#8B5CF6" size={1.2} />
        <Cube position={[2, -1, -3]} color="#22C55E" size={1} />
        <Cube position={[4, 2, -5]} color="#FACC15" size={1.5} />
        <Cube position={[-4, -2, -4]} color="#06B6D4" size={1.3} />
        <Cube position={[0, 0, -2]} color="#EC4899" size={1.1} />
        <Cube position={[1, 3, -6]} color="#3B82F6" size={1.4} />
        <Cube position={[-2, -3, -5]} color="#F43F5E" size={1.2} />

        {/* Cámara */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>

      {/* Overlay Matrix */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none" />

      {/* Glow central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none" />
    </div>
  );
}
