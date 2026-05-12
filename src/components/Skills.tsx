
import { motion } from 'framer-motion';
import { JH_DATA } from '../constants/data';
import { Code, Database, Terminal, Heart } from 'lucide-react';

export default function Skills() {
  const categories = [
    { title: "Desarrollo", icon: <Code className="text-primary" />, items: JH_DATA.skills.development },
    { title: "Backend & DB", icon: <Database className="text-accent" />, items: JH_DATA.skills.backend },
    { title: "Herramientas", icon: <Terminal className="text-secondary" />, items: JH_DATA.skills.tools },
    { title: "Personales", icon: <Heart className="text-red-500" />, items: JH_DATA.skills.soft },
  ];

  return (
    <section id="skills" className="py-24 px-4 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">Mis <span className="text-secondary">Habilidades</span></h2>
          <p className="text-gray-400">Tecnologías y competencias que domino</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-2 md:px-0">
          {categories.map((cat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="p-2 md:p-3 bg-background rounded-xl md:rounded-2xl shrink-0">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-base md:text-xl truncate">{cat.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {cat.items.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-1 md:px-3 md:py-1 bg-background/80 rounded-lg text-[10px] sm:text-xs md:text-sm border border-white/5 hover:border-primary/50 transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
