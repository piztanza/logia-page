import styles from '../../pages/Schedule/SchedulePage.module.css';

export default function TopbarSchedule() {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarInner}>
        <a href="/" className={styles.brand} aria-label="Logia Initiative Home">
          <img src="/images/Logo-Logia.png" alt="Logia Initiative logo" loading="eager" decoding="async" />
        </a>
        <a className={styles.backLink} href="/" aria-label="Back to Home">
          <span style={{ display: 'inline-block', transform: 'translateY(-1px)' }}>←</span>
          <span>Back to Home</span>
        </a>
      </div>
    </div>
  );
}


