
import { motion, AnimatePresence } from 'framer-motion';
import { JH_DATA } from '../constants/data';
import { ExternalLink, X, Zap } from 'lucide-react';
import { useState } from 'react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof JH_DATA.projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 px-4 bg-surface/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 italic">Proyectos <span className="text-accent">Destacados</span></h2>
          <div className="h-1 w-20 bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {JH_DATA.projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-[2rem] bg-background border border-white/5 cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-tighter bg-primary/20 text-primary px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-2 group-hover:text-secondary transition-colors">
                  {project.title} <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-[3rem] border border-white/10 shadow-2xl m-2"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-background/80 backdrop-blur-md rounded-full hover:bg-primary transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-48 sm:h-64 lg:h-full lg:min-h-[500px]">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 lg:p-12">
                  <div className="flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-[0.2em] text-xs">
                    <Zap size={14} /> Proyecto Detalle
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6">{selectedProject.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-white font-bold mb-4">Tecnologías Utilizadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, i) => (
                        <span key={i} className="px-4 py-2 bg-background border border-white/5 rounded-xl text-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform"
                    onClick={(e) => e.preventDefault()}
                  >
                    Ver Caso de Estudio <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
