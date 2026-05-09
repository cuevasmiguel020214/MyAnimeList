'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getScoreColor } from '@/utils';

interface ScoreCircleProps {
  score: number;
  size?: number;
  label?: string;
}

/**
 * ScoreCircle — Anillo de progreso animado con efecto neón y glow.
 * Usa SVG para el progreso circular y CSS glow para el efecto neón.
 * Se anima de 0 al puntaje objetivo al montar.
 */
export default function ScoreCircle({ score, size = 120, label = 'PUNTUACIÓN' }: ScoreCircleProps) {
  const [mounted, setMounted] = useState(false);
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;
  const color = getScoreColor(score);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2" id="score-circle">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow */}
        <div
          className="absolute inset-2 rounded-full blur-xl opacity-30"
          style={{ background: color }}
        />

        {/* Anillo SVG */}
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Anillo de fondo */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Anillo de progreso */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: mounted ? offset : circumference }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              filter: `drop-shadow(0 0 8px ${color}80)`,
            }}
          />
        </svg>

        {/* Número de puntuación */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {score.toFixed(2)}
          </motion.span>
        </div>
      </div>

      {/* Etiqueta */}
      <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">{label}</span>
    </div>
  );
}
