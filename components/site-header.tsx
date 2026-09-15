'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useShyduck } from '@/lib/store';
import { ShyduckMascot } from './shyduck-mascot';
import {
  Search,
  BookMarked,
  Bell,
  PenSquare,
  Compass,
  Home,
  Users,
  Sun,
  Moon,
  Shield,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export function SiteHeader() {
  const pathname = usePathname();
  const {
    user,
    theme,
    toggleTheme,
    unreadNotificationsCount,
    openSearch,
    logout
  } = useShyduck();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!profileMenuOpen) return;
    const handleClick = () => setProfileMenuOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [profileMenuOpen]);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/discover', label: 'Discover', icon: Compass },
    { href: '/genres', label: 'Genres', icon: Sparkles },
    { href: '/community', label: 'Community', icon: Users },
    { 
      href: '/write', 
      label: 'Write', 
      isCreator: user?.role === 'writer',
      icon: PenSquare, 
      highlight: true 
    },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(10, 11, 20, 0.88)' : 'var(--bg-overlay)',
        borderBottom: `1px solid ${scrolled ? 'rgba(233, 182, 90, 0.08)' : 'var(--line)'}`,
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      <div
        className="shell"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? '60px' : '72px',
          gap: '24px',
          transition: 'height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        {/* Left: Brand Logo & Mascot */}
        <Link
          href="/"
          className="group"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            flexShrink: 0
          }}
        >
          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <ShyduckMascot size={scrolled ? 30 : 36} mood="curious" />
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: scrolled ? '1rem' : '1.15rem',
                letterSpacing: '-0.04em',
                color: 'var(--text-main)',
                display: 'block',
                lineHeight: 1,
                transition: 'font-size 0.3s',
              }}
            >
              SHYDUCK TALES
            </span>
            <span
              style={{
                fontSize: '0.66rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 700,
                transition: 'opacity 0.3s',
                opacity: scrolled ? 0 : 1,
                maxHeight: scrolled ? 0 : '20px',
                overflow: 'hidden',
              }}
            >
              Stories Deserve Worlds
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="desktop-only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-underline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive
                    ? 'var(--gold)'
                    : item.highlight
                    ? 'var(--text-main)'
                    : 'var(--text-muted)',
                  backgroundColor: isActive
                    ? 'var(--gold-subtle)'
                    : item.highlight
                    ? 'rgba(255,255,255,0.04)'
                    : 'transparent',
                  border: item.highlight && !isActive ? '1px solid var(--line-strong)' : '1px solid transparent',
                  transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  position: 'relative',
                }}
              >
                <item.icon size={15} />
                <span>{item.label}</span>
                {item.isCreator && (
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      backgroundColor: isActive ? 'var(--gold)' : 'rgba(233, 182, 90, 0.16)',
                      color: isActive ? '#0a0b14' : 'var(--gold)',
                      padding: '1.5px 6px',
                      borderRadius: '9999px',
                      marginLeft: '2px',
                    }}
                  >
                    Studio
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search, Library, Notifications, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Command K Search Trigger */}
          <button
            onClick={openSearch}
            className="desktop-only group"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--line)',
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            aria-label="Search stories and authors"
          >
            <Search size={15} color="var(--gold)" className="transition-transform group-hover:scale-110" />
            <span>Search...</span>
            <span
              style={{
                fontSize: '0.68rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}
            >
              ⌘K
            </span>
          </button>

          {/* Mobile Search Button */}
          <button
            onClick={openSearch}
            className="mobile-only btn-icon"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Library Link */}
          <Link
            href="/library"
            className="btn-icon"
            style={{
              color: pathname.startsWith('/library') ? 'var(--gold)' : 'var(--text-muted)',
              borderColor: pathname.startsWith('/library') ? 'var(--gold-border)' : 'var(--line)'
            }}
            aria-label="My Library"
          >
            <BookMarked size={17} />
          </Link>

          {/* Notifications Link */}
          <Link
            href="/notifications"
            className="btn-icon"
            style={{
              position: 'relative',
              color: pathname === '/notifications' ? 'var(--gold)' : 'var(--text-muted)'
            }}
            aria-label="Notifications"
          >
            <Bell size={17} />
            {unreadNotificationsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--bg-surface)',
                  animation: 'pulseGlow 2s ease-in-out infinite',
                }}
              >
                {unreadNotificationsCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={17} color="var(--gold)" /> : <Moon size={17} />}
          </button>

          {/* Profile & Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProfileMenuOpen(!profileMenuOpen);
              }}
              className="group"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--line)',
                transition: 'border-color 0.2s',
              }}
              aria-expanded={profileMenuOpen}
              aria-label="User Account Menu"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt={user?.name || 'User'}
                className="avatar-ring-hover"
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <ChevronDown
                size={14}
                color="var(--text-muted)"
                style={{
                  marginRight: '4px',
                  transition: 'transform 0.2s',
                  transform: profileMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                }}
              />
            </button>

            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    position: 'absolute',
                    top: '115%',
                    right: 0,
                    width: '240px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--line-strong)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-floating)',
                    padding: '8px',
                    zIndex: 100,
                  }}
                >
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user?.name || 'Guest User'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {user ? `@${user.username}` : 'Not signed in'}
                    </div>
                    {user && (
                      <span className="badge badge-gold" style={{ marginTop: '6px', fontSize: '0.68rem' }}>
                        Role: {user.role.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '4px 0' }}>
                    {[
                      { href: `/authors/${user?.username || 'manish_writer'}`, label: 'Public Profile' },
                      { href: '/write', label: 'Writer Studio' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setProfileMenuOpen(false)}
                        className="hover:bg-white/5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          fontSize: '0.84rem',
                          color: 'var(--text-main)',
                          borderRadius: '6px',
                          transition: 'background-color 0.15s',
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}

                    <Link
                      href="/admin"
                      onClick={() => setProfileMenuOpen(false)}
                      className="hover:bg-white/5"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        fontSize: '0.84rem',
                        color: 'var(--lavender)',
                        borderRadius: '6px',
                        transition: 'background-color 0.15s',
                      }}
                    >
                      <Shield size={14} /> Admin Console
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setProfileMenuOpen(false)}
                      className="hover:bg-white/5"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        fontSize: '0.84rem',
                        color: 'var(--text-main)',
                        borderRadius: '6px',
                        transition: 'background-color 0.15s',
                      }}
                    >
                      Preferences & Themes
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setProfileMenuOpen(false);
                      }}
                      className="hover:bg-red-500/10"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        fontSize: '0.84rem',
                        color: '#ef4444',
                        borderRadius: '6px',
                        textAlign: 'left',
                        transition: 'background-color 0.15s',
                      }}
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
