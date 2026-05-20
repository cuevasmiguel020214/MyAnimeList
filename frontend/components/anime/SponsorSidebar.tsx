'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, MessageSquare, Play } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface SponsorItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  gradient: string;
  btnText: string;
  btnLink: string;
  icon: React.ReactNode;
}

/**
 * SponsorSidebar — Sección elegante e integrada de patrocinadores recomendados.
 * Combina glassmorphic cards con gradientes y micro-animaciones premium de Framer Motion.
 */
export default function SponsorSidebar() {
  const sponsors: SponsorItem[] = [
    {
      id: 'crunchyroll',
      name: 'Crunchyroll Premium',
      subtitle: 'Simulcasts en Alta Definición',
      description: 'Disfruta de nuevos episodios subtitulados solo una hora después de su estreno en Japón sin anuncios.',
      badge: 'SPONSOR',
      badgeColor: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      gradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
      btnText: 'Pruébalo Gratis',
      btnLink: 'https://crunchyroll.com',
      icon: <Play className="w-5 h-5 text-orange-400 fill-current" />,
    },
    {
      id: 'discord',
      name: 'Comunidad Discord',
      subtitle: 'Únete a la conversación',
      description: 'Debate sobre los últimos capítulos de anime y manga, participa en eventos semanales y comparte fanarts.',
      badge: 'OFICIAL',
      badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      gradient: 'from-blue-600/10 via-indigo-600/5 to-transparent',
      btnText: 'Unirse al Servidor',
      btnLink: 'https://discord.gg',
      icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4"
      id="sponsor-sidebar"
    >
      <div className="flex items-center gap-2 px-1 mb-2">
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sponsors Recomendados</h4>
      </div>

      {sponsors.map((sponsor) => (
        <motion.div
          key={sponsor.id}
          variants={fadeInUp}
          className="relative glass-card rounded-2xl p-5 overflow-hidden group hover:border-white/[0.12] hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          {/* Subtle brand glow overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`} />

          {/* Header */}
          <div className="flex justify-between items-start gap-2 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/[0.08] transition-colors">
                {sponsor.icon}
              </div>
              <div>
                <h5 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {sponsor.name}
                </h5>
                <p className="text-xs text-slate-400">{sponsor.subtitle}</p>
              </div>
            </div>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider ${sponsor.badgeColor}`}>
              {sponsor.badge}
            </span>
          </div>

          {/* Body */}
          <p className="text-xs text-slate-400 mt-3 leading-relaxed relative z-10">
            {sponsor.description}
          </p>

          {/* Button CTA */}
          <a
            href={sponsor.btnLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full mt-4 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.1] text-xs font-semibold text-white transition-all duration-300 relative z-10 group/btn"
          >
            <span>{sponsor.btnText}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
}
