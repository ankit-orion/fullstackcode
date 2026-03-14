import { Link } from "react-router-dom";
import { Layers, Github, Twitter, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.ribbon}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logoArea}>
              <Layers className={styles.logoIcon} size={20} />
              <span>Vertex</span>
            </Link>
          </div>
          
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} FullStackCode. All rights reserved.</p>
          </div>

          <div className={styles.socials}>
            <a href="#" aria-label="Github"><Github size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
