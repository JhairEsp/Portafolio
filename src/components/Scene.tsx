
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function NeonCubes() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generamos cubos con colores vibrantes y posiciones garantizadas
  const cubes = useMemo(() => {
    const colors = ["#8B5CF6", "#22C55E", "#FACC15"]; // Morado, Verde, Amarillo
    return Array.from({ length: 25 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 25, // X
        (Math.random() - 0.5) * 25, // Y
        (Math.random() - 0.5) * 10 - 5 // Z (Aseguramos que estén frente o cerca)
      ] as [number, number, number],
      color: colors[i % colors.length],
      scale: Math.random() * 0.8 + 0.4,
      rotationSpeed: Math.random() * 0.02
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const scrollY = window.scrollY;
    const time = state.clock.getElapsedTime();

    // Parallax con Mouse
    const mX = state.mouse.x * 2;
    const mY = state.mouse.y * 2;
    
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mX, 0.05);
    
    // El scroll mueve los cubos verticalmente
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mY + (scrollY * 0.008), 0.05);

    // Rotación de los cubos individuales
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += 0.01;
      child.rotation.y += 0.01;
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={cube.position} scale={cube.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color={cube.color}
              emissive={cube.color}
              emissiveIntensity={2}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020202]">
      {/* Gradiente sutil de fondo para que no sea negro plano */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/10 opacity-30 pointer-events-none" />
      
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        
        {/* Iluminación potente */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#8B5CF6" />
        <pointLight position={[-10, -10, 10]} intensity={2} color="#22C55E" />
        <spotLight position={[0, 20, 10]} angle={0.15} penumbra={1} intensity={2} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <NeonCubes />
        
        {/* Niebla corregida para no tapar los objetos cercanos */}
        <fog attach="fog" args={['#020202', 5, 35]} />
      </Canvas>
    </div>
  );
}
