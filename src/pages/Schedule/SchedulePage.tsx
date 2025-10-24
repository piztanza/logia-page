import styles from './SchedulePage.module.css';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/layout/Footer';
import TopbarSchedule from '../../components/layout/TopbarSchedule';

export default function SchedulePage() {
  return (
    <div className={styles.schedulePage}>
      <Helmet>
        <meta name="robots" content="noindex" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <title>Book Schedule</title>
        <link rel="icon" type="image/png" href="/images/LogoIcon-Logia.png" />
      </Helmet>

      <TopbarSchedule />

      <div className={styles.container}>
        <iframe
          className={styles.iframe}
          src="https://docs.google.com/forms/d/e/1FAIpQLSfZJbdNbTiqpPJVKpOJb2M-ymR5bwZOYaLWYlrXVc_eB_upyw/viewform?embedded=true"
          width="640"
          height="4712"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
        >
          Loading…
        </iframe>
      </div>

      <Footer />
    </div>
  );
}


