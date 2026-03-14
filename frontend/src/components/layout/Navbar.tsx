import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, Layers, BookOpen, Code2, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Navbar.module.css";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoArea} onClick={closeMenu}>
        <Layers className={styles.logoIcon} size={26} />
        <span>Vertex</span>
      </Link>

      {/* Desktop Links */}
      <div className={styles.navLinks}>
        <NavLink
          to="/modules"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <BookOpen size={18} />
          Modules
        </NavLink>
        <NavLink
          to="/problems"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <Code2 size={18} />
          Problems
        </NavLink>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile menu toggle */}
        <button
          className={styles.mobileMenuBtn}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.mobileMenu}>
              <NavLink
                to="/modules"
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileActive : ""}`
                }
                onClick={closeMenu}
              >
                <BookOpen size={20} />
                Modules
              </NavLink>
              <NavLink
                to="/problems"
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileActive : ""}`
                }
                onClick={closeMenu}
              >
                <Code2 size={20} />
                Problems
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
