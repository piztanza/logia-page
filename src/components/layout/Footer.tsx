export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-title">Address:</div>
            <div className="footer-text">South Tangerang, Indonesia</div>
            <div className="footer-text">info@logia-initiative.com</div>
          </div>
          <div>
            <div className="footer-title">Contact:</div>
            <div className="footer-text">+62 813-1873-2870</div>
            <div className="footer-text">sales@logia-initiative.com</div>
          </div>
          <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center' }}>
            <a href="https://www.linkedin.com/company/logia-initiative/" target="_blank" rel="noopener noreferrer" aria-label="Logia Initiative on LinkedIn">
              <img src="/images/LinkedIn-Logo.png" alt="LinkedIn logo" className="h-10 w-auto" loading="lazy" decoding="async" />
            </a>
          </div>
        </div>
        <div style={{ marginTop: 24, height: 1, background: '#2a3444' }}></div>
        <div style={{ color: '#9CA3AF', fontSize: 14, textAlign: 'center', marginTop: 16 }}>© 2025 Logia Initiative</div>
      </div>
    </footer>
  );
}


