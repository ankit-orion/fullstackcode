import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, Layers, BookOpen, Code2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoArea}>
        <Layers className={styles.logoIcon} size={26} />
        <span>FullStackCode</span>
      </Link>

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
      </div>
    </nav>
  );
}
