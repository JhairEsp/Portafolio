
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function NeonCubes() {
  const meshesRef = useRef<THREE.Mesh[]>([]);
  
  const cubes = useMemo(() => {
    const colors = ["#8B5CF6", "#22C55E", "#FACC15"]; // Morado, Verde, Amarillo
    return Array.from({ length: 25 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() * 8) - 2
      ] as [number, number, number],
      color: colors[i % colors.length],
      scale: Math.random() * 0.5 + 0.4,
      id: i
    }));
  }, []);

  useFrame(() => {
    meshesRef.current.forEach((mesh) => {
      if (mesh) {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.008;
      }
    });
  });

  return (
    <>
      {cubes.map((cube, i) => (
        <mesh 
          key={cube.id}
          position={cube.position} 
          scale={cube.scale}
          ref={(el) => { if (el) meshesRef.current[i] = el; }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={cube.color}
            emissive={cube.color}
            emissiveIntensity={3}
            roughness={0.2}
            metalness={0.9}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

function SceneBackground() {
  const { camera } = useThree();

  useFrame((state) => {
    // Parallax effect con mouse
    camera.position.x = state.mouse.x * 0.5;
    camera.position.y = state.mouse.y * 0.5;
  });

  return null;
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-black">
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: false,
          toneMappingExposure: 1.2
        }}
        camera={{ position: [0, 0, 8], fov: 75 }}
      >
        {/* Luces mucho más intensas */}
        <ambientLight intensity={1.2} />
        <pointLight position={[15, 15, 15]} intensity={3} color="#8B5CF6" distance={100} decay={2} />
        <pointLight position={[-15, -15, 15]} intensity={3} color="#22C55E" distance={100} decay={2} />
        <pointLight position={[0, 0, 20]} intensity={3} color="#FACC15" distance={100} decay={2} />
        <directionalLight position={[10, 10, 10]} intensity={2} />

        <Stars radius={200} depth={100} count={3000} factor={4} saturation={0} fade speed={0.5} />
        
        <SceneBackground />
        <NeonCubes />
        
        <fog attach="fog" args={['#000000', 5, 100]} />
      </Canvas>
    </div>
  );
}
