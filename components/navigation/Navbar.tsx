'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Heart,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Bookmark,
  TrendingUp,
} from 'lucide-react';
import { useScrollPosition } from '@/hooks';
import { slideUp } from '@/lib/animations';

const navLinks = [
  { label: 'Anime', href: '/' },
  { label: 'Manga', href: '/manga' },
  { label: 'Comunidad', href: '#' },
  { label: 'Rankings', href: '#' },
  { label: 'Noticias', href: '#' },
];

export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[rgba(15,23,42,0.85)] backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* IZQUIERDA — Logo + Navegación */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-shadow duration-300">
                    <span className="text-white font-bold text-sm">AV</span>
                  </div>
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hidden sm:block">
                  AniVault
                </span>
              </Link>

              {/* Enlaces de navegación escritorio */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    id={`nav-${link.label.toLowerCase()}`}
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg transition-colors duration-200 group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-2/3 transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CENTRO — Barra de búsqueda */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div
                className={`relative w-full transition-all duration-300 ${
                  searchFocused ? 'scale-105' : 'scale-100'
                }`}
              >
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="nav-search"
                  type="text"
                  placeholder="Buscar anime, manga, personajes..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 ${
                    searchFocused
                      ? 'bg-white/10 border border-blue-500/50 shadow-lg shadow-blue-500/10'
                      : 'bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                />
              </div>
            </div>

            {/* DERECHA — Acciones */}
            <div className="flex items-center gap-2">
              {/* Búsqueda móvil */}
              <button className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors" id="nav-mobile-search">
                <Search className="w-5 h-5" />
              </button>

              {/* Notificaciones */}
              <button className="hidden sm:flex relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors" id="nav-notifications">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-[#0F172A]" />
              </button>

              {/* Favoritos */}
              <button className="hidden sm:flex p-2.5 rounded-xl text-slate-400 hover:text-pink-400 hover:bg-white/[0.06] transition-colors" id="nav-favorites">
                <Heart className="w-5 h-5" />
              </button>

              {/* Avatar y menú desplegable */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.06] transition-colors"
                  id="nav-user-menu"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                    U
                  </div>
                  <ChevronDown className={`hidden sm:block w-4 h-4 text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      variants={slideUp}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 top-full mt-2 w-56 rounded-xl glass-strong overflow-hidden shadow-2xl"
                      id="user-dropdown"
                    >
                      <div className="p-3 border-b border-white/[0.06]">
                        <p className="text-sm font-semibold text-white">OtakuUser</p>
                        <p className="text-xs text-slate-400">@otakuuser2026</p>
                      </div>
                      {[
                        { icon: User, label: 'Perfil', href: '#' },
                        { icon: Bookmark, label: 'Mi Lista', href: '#' },
                        { icon: TrendingUp, label: 'Estadísticas', href: '#' },
                        { icon: Settings, label: 'Configuración', href: '#' },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-white/[0.06]">
                        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:bg-white/[0.06] transition-colors">
                          <LogOut className="w-4 h-4" />
                          Cerrar Sesión
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Menú móvil */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                id="nav-mobile-toggle"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Menú móvil superpuesto */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] glass-strong border-l border-white/[0.06] pt-20 px-6"
              id="mobile-menu"
            >
              {/* Búsqueda móvil */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-slate-500 outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>

              {/* Enlaces móviles */}
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Acciones móviles */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-1">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors">
                  <Bell className="w-4 h-4" />
                  Notificaciones
                  <span className="ml-auto w-5 h-5 rounded-full bg-blue-500 text-xs flex items-center justify-center text-white">3</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors">
                  <Heart className="w-4 h-4" />
                  Favoritos
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
