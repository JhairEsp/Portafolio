
import { motion } from 'framer-motion';
import { JH_DATA } from '../constants/data';
import { Briefcase, Calendar } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">Experiencia <span className="text-primary">Profesional</span></h2>
          <div className="h-2 w-24 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {JH_DATA.experience.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-colors group"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <Briefcase size={18} />
                    <span className="font-bold uppercase tracking-wider text-sm">{exp.company}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-400 bg-background px-4 py-2 rounded-full text-sm">
                  <Calendar size={16} />
                  {exp.period}
                </div>
              </div>
              
              <ul className="space-y-3">
                {exp.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-2 w-2 h-2 rounded-full bg-accent shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
