import { Link } from "react-router-dom";
import { Layers, Github, Twitter, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logoArea}>
              <Layers className={styles.logoIcon} size={24} />
              <span>FullStackCode</span>
            </Link>
            <p className={styles.description}>
              The ultimate platform to level up your entire stack. Practice
              building real-world applications.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className={styles.linksGroup}>
            <h3>Curriculum</h3>
            <Link to="/modules">HTML & CSS</Link>
            <Link to="/modules">JavaScript</Link>
            <Link to="/modules">React.js</Link>
            <Link to="/modules">Go Backend</Link>
          </div>

          <div className={styles.linksGroup}>
            <h3>Practice</h3>
            <Link to="/problems">Frontend Challenges</Link>
            <Link to="/problems">Backend Challenges</Link>
            <Link to="/problems">Database Challenges</Link>
          </div>

          <div className={styles.linksGroup}>
            <h3>Legal</h3>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p>
            &copy; {new Date().getFullYear()} FullStackCode. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
