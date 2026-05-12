
import { useRef, useEffect, useState } from 'react';

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden"
    >
      {/* Fondo Base Oscuro */}
      <div className="absolute inset-0 bg-black" />

      {/* Capa 1 - Fondo Lejano (Puede ser imagen o patrón) */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Capa 2 - Cubos 3D con animación */}
      <svg className="absolute inset-0 w-full h-full" style={{ perspective: '1000px' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cubos flotantes con paralaje */}
        {[...Array(8)].map((_, i) => {
          const x = Math.sin(i) * 200 + 400;
          const y = Math.cos(i * 0.7) * 200 + 300;
          const colors = ['#8B5CF6', '#22C55E', '#FACC15', '#06B6D4'];
          const color = colors[i % colors.length];
          
          return (
            <g
              key={i}
              style={{
                transform: `translate(${x + mousePos.x * (0.5 + i * 0.1)}px, ${y + mousePos.y * (0.5 + i * 0.1)}px)`,
                transformOrigin: '50px 50px',
                transition: 'transform 0.3s ease-out',
                animation: `float${i} 6s ease-in-out infinite`
              }}
            >
              {/* Cubo 3D simulado con perspectiva */}
              <rect x="0" y="0" width="100" height="100" fill={color} opacity="0.8" filter="url(#glow)" />
              <rect 
                x="0" y="0" width="100" height="100" 
                fill="none" 
                stroke={color} 
                strokeWidth="2" 
                opacity="0.5" 
              />
              {/* Efecto de luz */}
              <circle cx="50" cy="50" r="60" fill={color} opacity="0.1" filter="url(#glow)" />
            </g>
          );
        })}
      </svg>

      {/* Capa 3 - Overlay oscuro para mejor legibilidad */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"
        style={{
          transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Animación CSS para los cubos */}
      <style>{`
        @keyframes float0 { 0%, 100% { transform: translateY(0px) rotateX(0deg); } 50% { transform: translateY(-30px) rotateX(10deg); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0px) rotateY(0deg); } 50% { transform: translateY(-40px) rotateY(10deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotateZ(0deg); } 50% { transform: translateY(-35px) rotateZ(10deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) rotateX(0deg); } 50% { transform: translateY(-25px) rotateX(-10deg); } }
        @keyframes float4 { 0%, 100% { transform: translateY(0px) rotateY(0deg); } 50% { transform: translateY(-45px) rotateY(-10deg); } }
        @keyframes float5 { 0%, 100% { transform: translateY(0px) rotateZ(0deg); } 50% { transform: translateY(-30px) rotateZ(-10deg); } }
        @keyframes float6 { 0%, 100% { transform: translateY(0px) rotateX(0deg); } 50% { transform: translateY(-38px) rotateX(15deg); } }
        @keyframes float7 { 0%, 100% { transform: translateY(0px) rotateY(0deg); } 50% { transform: translateY(-32px) rotateY(15deg); } }
      `}</style>

      {/* Instrucciones para agregar imágenes (comentado) */}
      {/* 
        Para agregar imágenes personalizadas:
        1. Reemplaza los <rect> dentro del <g> con <image> tags
        2. Ejemplo: <image href="/tu-imagen.jpg" x="0" y="0" width="100" height="100" />
        3. Coloca tus imágenes en la carpeta public/
        
        Estructura recomendada:
        - public/images/cube1.jpg
        - public/images/cube2.jpg
        - etc.
      */}
    </div>
  );
}
