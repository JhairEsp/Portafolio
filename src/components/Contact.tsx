
import { motion } from 'framer-motion';
import { JH_DATA } from '../constants/data';
import { Mail, Phone, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/5 whitespace-nowrap pointer-events-none select-none">
        LET'S WORK TOGETHER
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="bg-primary p-12 md:p-20 rounded-[4rem] flex flex-col items-center text-center shadow-[0_0_100px_rgba(139,92,246,0.3)]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8">
              ¿Listo para dar el <span className="text-secondary underline underline-offset-8">siguiente paso</span>?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Estoy buscando nuevas oportunidades para aplicar mis conocimientos en análisis de sistemas y desarrollo tecnológico.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
              <a 
                href={`mailto:${JH_DATA.contact.email}`} 
                className="flex items-center justify-center gap-3 bg-white text-primary p-6 rounded-3xl font-bold hover:scale-105 transition-transform"
              >
                <Mail /> {JH_DATA.contact.email}
              </a>
              <a 
                href={`tel:${JH_DATA.contact.phone.replace(/\s/g, '')}`} 
                className="flex items-center justify-center gap-3 bg-background text-white p-6 rounded-3xl font-bold hover:scale-105 transition-transform"
              >
                <Phone /> {JH_DATA.contact.phone}
              </a>
            </div>

            <div className="mt-12 flex justify-center gap-8 text-white/60">
               <a href={`https://${JH_DATA.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                 LinkedIn <ExternalLink size={14} />
               </a>
            </div>
          </motion.div>
        </div>
        
        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {JH_DATA.name}. Todos los derechos reservados.</p>
          <p className="mt-2 font-mono uppercase tracking-widest text-xs opacity-50">Analista de Sistemas | Innovación Constante</p>
        </footer>
      </div>
    </section>
  );
}
