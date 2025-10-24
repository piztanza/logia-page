import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerStyle: React.CSSProperties = {
    background: scrolled ? 'rgba(15, 20, 25, 0.9)' : 'transparent',
    borderBottom: scrolled ? '1px solid #2a3444' : '1px solid transparent',
    backdropFilter: scrolled ? 'saturate(150%) blur(8px)' : 'none',
  };

  return (
    <header className={styles.header} style={headerStyle}>
      <div className={styles.inner}>
        <a href="/" aria-label="Logia Initiative Home" className="inline-flex items-center shrink-0">
          <img src="/images/Logo-Logia.png" alt="Logia Initiative" className={styles.brandImage} loading="eager" decoding="async" />
        </a>

        <nav className={styles.desktopNav}>
          <a href="#team" className={styles.desktopLink}>Team</a>
          <a href="#expertise" className={styles.desktopLink}>Expertise</a>
          <Link to="/schedule" className={styles.ctaLink}>Book Research</Link>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className={styles.mobileButton}
          onClick={() => setIsOpen(v => !v)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className={styles.mobilePanel}>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <a href="#team" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Team</a>
            <a href="#expertise" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Expertise</a>
            <Link to="/schedule" className={styles.mobileCTA} onClick={() => setIsOpen(false)}>Book Research</Link>
          </div>
        </div>
      )}
    </header>
  );
}


