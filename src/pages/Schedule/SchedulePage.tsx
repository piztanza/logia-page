import styles from './SchedulePage.module.css';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/layout/Footer';
import TopbarSchedule from '../../components/layout/TopbarSchedule';

export default function SchedulePage() {
  return (
    <div className={styles.schedulePage}>
      <Helmet>
        <title>Book a Research Interview | Logia Initiative</title>
        <meta name="robots" content="noindex,follow" />
        <meta name="description" content="Book a 30-minute research interview with Logia Initiative." />
        <link rel="canonical" href="https://logia-initiative.com/schedule" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Book a Research Interview | Logia Initiative" />
        <meta property="og:description" content="Share your insights on enterprise knowledge management." />
        <meta property="og:url" content="https://logia-initiative.com/schedule" />
        <meta property="og:image" content="https://logia-initiative.com/images/Logo-Logia.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Book a Research Interview | Logia Initiative" />
        <meta name="twitter:description" content="Share your insights on enterprise knowledge management." />
      </Helmet>

      <TopbarSchedule />

      <main>
        <h1 className="sr-only">Book a Research Interview</h1>
        <div className={styles.container}>
          <iframe
            title="Logia Initiative research interview form"
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
      </main>

      <Footer />
    </div>
  );
}


