import { Link } from "react-router-dom";
import {
  Terminal,
  Code2,
  Database,
  LayoutTemplate,
  ArrowRight,
} from "lucide-react";
import styles from "./Landing.module.css";

export function Landing() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.badge} ${styles.animateFadeUp}`}>
          <span className={styles.glow}></span>
          New: Beta Version Live
        </div>
        <h1
          className={`${styles.title} ${styles.animateFadeUp} ${styles.delay1}`}
        >
          Master Full-Stack Engineering, <br />
          <span className={styles.highlight}>One Challenge at a Time</span>
        </h1>
        <p
          className={`${styles.subtitle} ${styles.animateFadeUp} ${styles.delay2}`}
        >
          The ultimate platform to level up your entire stack. Practice building
          React components, designing robust Go backends, and optimizing
          databases with real-world scenarios.
        </p>
        <div
          className={`${styles.actions} ${styles.animateFadeUp} ${styles.delay3}`}
        >
          <Link to="/problems" className={`${styles.button} ${styles.primary}`}>
            Start Practicing
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/modules"
            className={`${styles.button} ${styles.secondary}`}
          >
            Explore Curriculum
          </Link>
        </div>

        {/* Mock Stats/Preview */}
        <div
          className={`${styles.statsPanel} ${styles.animateFadeUp} ${styles.delay4} ${styles.float}`}
        >
          <div className={styles.stat}>
            <h3>150+</h3>
            <p>Curated Problems</p>
          </div>
          <div className={styles.stat}>
            <h3>Live</h3>
            <p>Code Execution</p>
          </div>
          <div className={styles.stat}>
            <h3>3</h3>
            <p>Tech Domains</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className={styles.features}>
        <div className={`${styles.sectionHeader} ${styles.animateFadeUp}`}>
          <h2>What you will learn</h2>
          <p>Comprehensive curriculum covering the entire modern web stack.</p>
        </div>

        <div className={styles.grid}>
          <div
            className={`${styles.card} ${styles.animateFadeUp} ${styles.delay1}`}
          >
            <LayoutTemplate className={styles.icon} size={32} />
            <h3>Frontend UI/UX</h3>
            <p>
              Build pixel-perfect React components, handle state management, and
              master modern CSS architectures.
            </p>
          </div>
          <div
            className={`${styles.card} ${styles.animateFadeUp} ${styles.delay2}`}
          >
            <Terminal className={styles.icon} size={32} />
            <h3>Backend APIs</h3>
            <p>
              Design RESTful APIs, implement authentication flows, and write
              scalable server logic in Go and Node.
            </p>
          </div>
          <div
            className={`${styles.card} ${styles.animateFadeUp} ${styles.delay3}`}
          >
            <Database className={styles.icon} size={32} />
            <h3>Database Design</h3>
            <p>
              Write optimized raw SQL, conceptualize complex schemas, and handle
              data migrations.
            </p>
          </div>
          <div
            className={`${styles.card} ${styles.animateFadeUp} ${styles.delay4}`}
          >
            <Code2 className={styles.icon} size={32} />
            <h3>Code Architecture</h3>
            <p>
              Learn clean code principles, testing strategies, and system design
              for full-scale web applications.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
