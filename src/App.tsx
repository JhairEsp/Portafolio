
import { useEffect } from 'react';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cursor from './components/Cursor';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { motion } from 'framer-motion';
import { JH_DATA } from './constants/data';
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    // Smooth scrolling with Lenis
    const lenis = new Lenis();
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="text-foreground selection:bg-primary selection:text-white">
      <Cursor />
      <Scene />
      <Navbar />
      
      <main>
        <Hero />
        
        {/* About Section */}
        <section id="about" className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">Sobre mí</span>
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                    Transformando procesos con <span className="text-primary italic">tecnología</span>
                  </h2>
                </div>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                  <p>{JH_DATA.summary}</p>
                  <p>
                    Como estudiante de <span className="text-white font-bold">Ingeniería de Sistemas</span>, 
                    mi enfoque se centra en la optimización y la eficiencia. Mi experiencia en SANNA 
                    y Ferremas me ha permitido entender la tecnología no solo como código, 
                    sino como una herramienta vital para el negocio.
                  </p>
                </div>
                
                <div className="mt-12 grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-3xl font-black text-white">4+</h4>
                    <p className="text-gray-500 uppercase text-xs tracking-widest mt-1">Experiencias</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-white">3+</h4>
                    <p className="text-gray-500 uppercase text-xs tracking-widest mt-1">Años de Trayectoria</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-surface p-8 rounded-[3rem] border border-white/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -z-10" />
                <h3 className="text-2xl font-bold mb-6 text-secondary">Educación</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-6 py-2">
                    <p className="text-white font-bold text-xl">{JH_DATA.education.university}</p>
                    <p className="text-primary font-medium">{JH_DATA.education.career}</p>
                    <p className="text-gray-500 text-sm mt-1">{JH_DATA.education.period}</p>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-background rounded-2xl border border-white/5">
                  <p className="text-sm italic text-gray-400">
                    "Enfoque constante en la mejora de procesos tecnológicos y el autoaprendizaje continuo."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
