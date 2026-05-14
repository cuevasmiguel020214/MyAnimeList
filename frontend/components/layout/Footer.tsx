import Link from 'next/link';
import { Heart } from 'lucide-react';

/**
 * Footer — Pie de página premium con enlaces y marca.
 * Componente de servidor — no requiere interactividad.
 */
export default function Footer() {
  const footerLinks = [
    {
      title: 'Explorar',
      links: [
        { label: 'Anime', href: '/' },
        { label: 'Manga', href: '/manga' },
        { label: 'Rankings', href: '#' },
        { label: 'Temporada', href: '#' },
      ],
    },
    {
      title: 'Comunidad',
      links: [
        { label: 'Foros', href: '#' },
        { label: 'Clubes', href: '#' },
        { label: 'Reseñas', href: '#' },
        { label: 'Recomendaciones', href: '#' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Acerca de', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Empleos', href: '#' },
        { label: 'Contacto', href: '#' },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/[0.04] mt-20" id="footer">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">AV</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AniVault
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Una plataforma moderna y premium para seguimiento de anime y manga. Hecha para la comunidad, por la comunidad.
            </p>
          </div>

          {/* Columnas de enlaces */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-bold text-white mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Barra inferior */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2026 AniVault. Proyecto Universitario. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-600">
            Hecho con <Heart className="w-3 h-3 text-pink-500 fill-current" /> para fans del anime
          </p>
        </div>
      </div>
    </footer>
  );
}
