
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const CODE_SNIPPETS = [
  'const dev = "Jhair";',
  'system.analyze();',
  'git push origin main',
  'npm run build',
  'SELECT * FROM data;',
  'await solve(problem);',
  'while(learning) { ... }',
  'export default App;',
  'function optimize() {}',
  'if (innovating) { ... }',
];

function FloatingCode() {
  const count = 30; // Reduced count for stability
  const snippets = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      color: ['#8B5CF6', '#22C55E', '#FACC15', '#FFFFFF'][Math.floor(Math.random() * 4)],
      scale: Math.random() * 0.8 + 0.4
    }));
  }, []);

  return (
    <group>
      {snippets.map((s, i) => (
        <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text
            position={s.position}
            fontSize={s.scale}
            color={s.color}
            fillOpacity={0.6}
            anchorX="center"
            anchorY="middle"
          >
            {s.text}
          </Text>
        </Float>
      ))}
    </group>
  );
}

function CodeColumns() {
  const columns = 40;
  const groupRef = useRef<THREE.Group>(null);
  const chars = "01<>/{}[]();:+-*/$";

  // Generamos datos iniciales para las columnas
  const columnData = useMemo(() => {
    return Array.from({ length: columns }).map((_, i) => ({
      x: (i - columns / 2) * 1.5, // Espaciado uniforme
      z: Math.random() * 10 - 15, // Un poco atrás de la cámara
      speed: Math.random() * 4 + 2, // Velocidad de caída
      offset: Math.random() * 40, // Desfase inicial
      content: Array.from({ length: 20 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join('\n')
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const data = columnData[i];
        // Lógica de caída vertical: (Posición inicial - (tiempo * velocidad)) modulo rango
        const yPos = 20 - ((time * data.speed + data.offset) % 40);
        child.position.y = yPos;
      });
    }
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <group ref={groupRef}>
      {columnData.map((col, i) => (
        <Text
          key={i}
          position={[col.x, 0, col.z]}
          fontSize={isMobile ? 0.4 : 0.6} // Más pequeño en móvil
          color={i % 2 === 0 ? "#22C55E" : "#8B5CF6"} 
          fillOpacity={isMobile ? 0.5 : 0.8} // Más sutil en móvil
          anchorX="center"  
          anchorY="middle"
        >
          {col.content}
        </Text>
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={1} />
        
        <FloatingCode />
        <CodeColumns />
        
        <fog attach="fog" args={['#050505', 5, 25]} />
      </Canvas>
      
      {/* Overlay para dar profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]/30 pointer-events-none" />
    </div>
  );
}
