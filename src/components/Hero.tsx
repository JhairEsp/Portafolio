
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { JH_DATA } from '../constants/data';
import { Mail, ArrowDown, Link } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".char", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.out"
      });

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 0,
          rotate: -20,
          opacity: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 0.5
        });
      }

      gsap.from(".fade-in", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        delay: 1,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 text-center lg:text-left px-4">
          <h2 className="text-secondary font-bold tracking-widest mb-2 md:mb-4 fade-in uppercase text-xs md:text-base bg-secondary/10 inline-block px-3 py-1 rounded-full md:bg-transparent md:p-0">
            Bienvenido a mi portafolio
          </h2>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-[1.1]">
            {splitText(JH_DATA.name.split(" ")[0])} <br />
            <span className="text-primary">{splitText(JH_DATA.name.split(" ")[1])}</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-6 md:mb-8 max-w-xl fade-in mx-auto lg:mx-0">
            {JH_DATA.role}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start fade-in max-w-xs mx-auto md:max-w-none">
            <a href={`mailto:${JH_DATA.contact.email}`} className="bg-primary hover:bg-opacity-90 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-full font-bold transition-all flex items-center justify-center gap-2 text-sm md:text-base shadow-lg shadow-primary/20">
              <Mail size={18} /> Contáctame
            </a>
            <a href={`https://${JH_DATA.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="border-2 border-white/10 text-white hover:border-primary hover:text-primary px-6 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-full font-bold transition-all flex items-center justify-center gap-2 text-sm md:text-base backdrop-blur-sm">
              <Link size={18} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center items-center relative mb-6 lg:mb-0">
          <div ref={imageRef} className="relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
            {/* Geometric accents - Hidden on very small mobile for clean look */}
            <div className="absolute -inset-3 md:-inset-4 border-2 border-accent rounded-[2rem] md:rounded-3xl rotate-6 animate-pulse opacity-50 md:opacity-100" />
            <div className="absolute -inset-3 md:-inset-4 border-2 border-secondary rounded-[2rem] md:rounded-3xl -rotate-3 opacity-50 md:opacity-100" />
            
            <div className="w-full h-full rounded-[2rem] md:rounded-3xl overflow-hidden relative z-10 border-2 md:border-4 border-white shadow-[0_0_40px_rgba(139,92,246,0.3)] bg-surface">
              <img 
                src="Jhair.png" 
                alt="Jhair Espinoza" 
                className="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-40" />
            </div>
            
            {/* Energetic floating elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary rounded-full blur-2xl opacity-50 animate-bounce" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent rounded-full blur-3xl opacity-30 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce fade-in">
        <ArrowDown className="text-primary" />
      </div>
    </section>
  );
}
