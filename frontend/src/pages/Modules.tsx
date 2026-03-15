import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileCode2,
  Paintbrush,
  Braces,
  TerminalSquare,
  Server,
  Database,
  Globe,
  Code2,
  GitBranch,
  Network,
  ShieldCheck,
  LayoutTemplate,
  Gauge,
  TestTube,
  Workflow,
  Cloud,
  Zap,
  Lock,
  Layers,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./Modules.module.css";
import { api } from "../lib/api";
import type { ModuleListItem } from "../lib/api";

const ORDER_META: Record<
  number,
  { icon: React.ElementType; colorClass: string }
> = {
  1:  { icon: Globe,          colorClass: styles.webColor },
  2:  { icon: FileCode2,      colorClass: styles.htmlColor },
  3:  { icon: Paintbrush,     colorClass: styles.cssColor },
  4:  { icon: Braces,         colorClass: styles.jsColor },
  5:  { icon: Code2,          colorClass: styles.tsColor },
  6:  { icon: GitBranch,      colorClass: styles.gitColor },
  7:  { icon: TerminalSquare, colorClass: styles.reactColor },
  8:  { icon: Server,         colorClass: styles.nodeColor },
  9:  { icon: Database,       colorClass: styles.dbColor },
  10: { icon: Network,        colorClass: styles.apiColor },
  11: { icon: ShieldCheck,    colorClass: styles.authColor },
  12: { icon: LayoutTemplate, colorClass: styles.systemDesignColor },
  13: { icon: Gauge,          colorClass: styles.perfColor },
  14: { icon: TestTube,       colorClass: styles.testingColor },
  15: { icon: Workflow,       colorClass: styles.devopsColor },
  16: { icon: Cloud,          colorClass: styles.cloudColor },
  17: { icon: Zap,            colorClass: styles.realtimeColor },
  18: { icon: Lock,           colorClass: styles.securityColor },
  19: { icon: Layers,         colorClass: styles.advFrontendColor },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export function Modules() {
  const [modules, setModules] = useState<ModuleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getModules()
      .then((data) => {
        setModules(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error(err);
        setError("Failed to load curriculum. Is the backend running?");
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.gridBackground}></div>
      
      <motion.header 
        className={styles.header}
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
      >
        <div className={styles.premiumBadge}>
          <Sparkles size={14} className={styles.sparkleIcon} />
          <span>Curriculum Tracks</span>
        </div>
        <h1 className={styles.title}>
          Master the <span className={styles.warpSpeed}>Full Stack</span>
        </h1>
        <p className={styles.subtitle}>
          In-depth reading materials and interactive practice questions 
          meticulously crafted for each technology domain.
        </p>
      </motion.header>

      {loading && (
        <div className={styles.statusMsg}>
          <div className={styles.loader}></div>
          <p>Analyzing curriculum components...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorMsg}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <motion.div 
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {modules.map((module) => {
            const meta = ORDER_META[module.order] ?? {
              icon: Globe,
              colorClass: styles.webColor,
            };
            const IconComponent = meta.icon;

            return (
              <motion.div key={module.id} variants={fadeUpVariant}>
                <Link
                  to={`/modules/${module.id}`}
                  className={styles.card}
                >
                  <div className={styles.cardGlow}></div>
                  <div className={`${styles.iconWrapper} ${meta.colorClass}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.topicCount}>
                      {module.topicsCount} specialized topics
                    </span>
                    <span className={styles.actionText}>
                      Start <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
