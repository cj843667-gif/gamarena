"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Gamepad2, Moon, Sun } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('gamarena-theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.add('light');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.remove('light');
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('gamarena-theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('gamarena-theme', 'light');
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "GAMES", href: "/games" },
    { name: "BLOG", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? "py-2" : "py-4"
      }`}
      style={{
        background: isScrolled ? 'rgba(var(--bg-primary-rgb, 13,17,23), 0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div className="w-7 h-7 bg-[var(--accent)] rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <Gamepad2 className="text-black" size={16} />
          </div>
          <span className="text-base font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>
            GAM<span className="text-[var(--accent)]">ARENA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                pathname === link.href 
                  ? "bg-[var(--accent)] text-black" 
                  : "hover:bg-[var(--bg-card)]"
              }`}
              style={{ color: pathname === link.href ? '#000' : 'var(--text-primary)' }}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-lg transition-colors hover:bg-[var(--bg-card)]"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link 
            href="/search" 
            className="p-2.5 rounded-lg transition-colors hover:bg-[var(--bg-card)]"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Search"
          >
            <Search size={18} />
          </Link>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-lg"
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2.5 rounded-lg"
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — CSS animation, no framer-motion */}
      {isMobileMenuOpen && (
        <div className="md:hidden menu-enter" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`p-3 rounded-xl text-base font-bold ${
                  pathname === link.href ? "bg-[var(--accent)] text-black" : ""
                }`}
                style={{ color: pathname === link.href ? '#000' : 'var(--text-primary)' }}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/search"
              className="p-3 rounded-xl text-base font-bold flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <Search size={18} /> SEARCH
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
