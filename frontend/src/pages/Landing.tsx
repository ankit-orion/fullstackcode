import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Terminal,
  Code2,
  Database,
  LayoutTemplate,
  ArrowRight,
  Check,
  Zap,
  Server,
  Layers,
  ShieldCheck,
  Cloud,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import styles from "./Landing.module.css";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" as Easing 
    } 
  }
};

const WordCycle = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words]);

  return (
    <span className={styles.warpText}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 20, opacity: 0, filter: "blur(10px)", scale: 0.8 }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ y: -20, opacity: 0, filter: "blur(10px)", scale: 1.1 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.23, 1, 0.32, 1],
            filter: { duration: 0.5 }
          }}
          className={styles.cyclingWord}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const TypingText = ({ texts }: { texts: string[] }) => {
  const [tIndex, setTIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = texts[tIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setTIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, tIndex, texts]);

  return (
    <span className={styles.typingContainer}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className={styles.cursor}
      >
        |
      </motion.span>
    </span>
  );
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function Landing() {
  const targetAudiences = ["Developers", "Students", "Coders", "Architects", "Engineers"];
  const techStack = ["Full-Stack", "JavaScript", "React", "Node.js", "TypeScript", "SQL"];

  return (
    <div className={styles.container}>
      <div className={styles.gridBackground}></div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.badgeIcon}><Sparkles size={14} /></span>
          <span className={styles.badgeText}>The Ultimate Training Ground for Developers</span>
          <span className={styles.badgeArrow}>🚀</span>
        </motion.div>
        
        <motion.h1
          className={styles.title}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          Master <WordCycle words={techStack} /> <br />
          Engineering with <span className={styles.warpSpeed}>Vertex</span>
        </motion.h1>
        
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Solve real-world architectural challenges. Master the entire stack through 
          interactive modules, system design problems, and professional practice.
        </motion.p>
        
        <div className={styles.tailoredSection}>
          <span className={styles.tailoredText}>Built for </span>
          <TypingText texts={targetAudiences} />
        </div>

        <motion.div
          className={styles.heroLogos}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className={styles.userAvatars}>
             {[1,2,3,4,5].map(i => (
               <div key={i} className={styles.avatar} style={{zIndex: 5-i}}>
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="user" />
               </div>
             ))}
             <div className={styles.userRating}>
               <div className={styles.stars}>★★★★★</div>
               <span className={styles.ratingText}>Mastered by 5,000+ developers</span>
             </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.techIcons}>
            <LayoutTemplate size={20} />
            <Terminal size={20} />
            <Database size={20} />
            <Code2 size={20} />
            <Zap size={20} />
          </div>
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/problems" className={styles.getAccessBtn}>
            Start Solving <span className={styles.btnIcon}>✱</span>
          </Link>
          <Link to="/modules" className={styles.exploreBtn}>
            View Modules <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className={styles.features}>
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <h2>Professional Curriculum</h2>
          <p>Everything you need to master full-stack engineering, from pixels to production.</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { 
              icon: LayoutTemplate, 
              title: "Frontend Architecture", 
              desc: "Master React, TypeScript, and modern UI patterns to build lightning-fast, accessible interfaces." 
            },
            { 
              icon: Server, 
              title: "Backend Engineering", 
              desc: "Design robust REST & GraphQL APIs and scalable server-side logic using Node.js and Go." 
            },
            { 
              icon: Database, 
              title: "Database Design", 
              desc: "Optimize complex schemas, write efficient raw SQL, and master data modeling at scale." 
            },
            { 
              icon: Layers, 
              title: "System Architecture", 
              desc: "Learn load balancing, caching strategies, and architectural patterns used by industry leaders." 
            },
            { 
              icon: ShieldCheck, 
              title: "Security & Auth", 
              desc: "Implement secure OAuth flows, session management, and protect your apps from modern exploits." 
            },
            { 
              icon: Cloud, 
              title: "Cloud & DevOps", 
              desc: "Deploy with confidence using CI/CD pipelines, Docker, Kubernetes, and modern cloud providers." 
            },
          ].map((feat, i) => (
            <motion.div key={i} className={styles.card} variants={fadeUpVariant} whileHover={{ y: -5 }}>
              <feat.icon className={styles.icon} size={32} />
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricingSection}>
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <div className={styles.pricingBadge}>
            <Zap size={14} className={styles.zapIcon} />
            Pricing Plans
          </div>
          <h2>Accelerate Your Career</h2>
          <p>Choose the track that fits your professional goals.</p>
        </motion.div>

        <motion.div 
          className={styles.pricingGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Free Tier */}
          <motion.div className={styles.pricingCard} variants={fadeUpVariant} whileHover={{ y: -5 }}>
              <h3 className={styles.planName}>Community</h3>
              <div className={styles.price}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>0</span>
                <span className={styles.period}>/forever</span>
              </div>
              <p className={styles.planDesc}>Free access to core modules and basic practice problems.</p>
              <button className={`${styles.button} ${styles.secondary} ${styles.fullWidth}`}>
                Get Started
              </button>
            <div className={styles.featuresList}>
              {['50+ Basic Problems', 'Standard Modules', 'Community Discord', 'Basic Progress Tracking'].map((feat, i) => (
                <div key={i} className={styles.featureItem}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pro Tier (Glowing Border) */}
          <motion.div className={styles.pricingCardPro} variants={fadeUpVariant} whileHover={{ y: -5, scale: 1.02 }}>
              <div className={styles.popularBadge}>Most Popular</div>
                <h3 className={styles.planName}>Professional</h3>
                <div className={styles.price}>
                  <span className={styles.currency}>$</span>
                  <span className={styles.amount}>24</span>
                  <span className={styles.period}>/month</span>
                </div>
                <p className={styles.planDesc}>Lifetime access to all premium challenges and system design tracks.</p>
                <button className={`${styles.button} ${styles.primary} ${styles.fullWidth}`}>
                  Go Pro
                </button>
              <div className={styles.featuresList}>
                {[
                  'All 200+ Premium Problems', 
                  'System Design Workshops', 
                  'Advanced Architecture Tracks',
                  'Unlimited Sandbox Executions',
                  'Mock Interview Scenarios',
                  'Verified Certificate'
                ].map((feat, i) => (
                  <div key={i} className={styles.featureItem}>
                    <Check size={16} className={styles.checkIcon} />
                    <span className={styles.proText}>{feat}</span>
                  </div>
                ))}
              </div>
          </motion.div>

          {/* Enterprise Tier */}
          <motion.div className={styles.pricingCard} variants={fadeUpVariant} whileHover={{ y: -5 }}>
              <h3 className={styles.planName}>Enterprise</h3>
              <div className={styles.price}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>59</span>
                <span className={styles.period}>/user/month</span>
              </div>
              <p className={styles.planDesc}>For engineering teams looking to level up their senior staff.</p>
              <button className={`${styles.button} ${styles.secondary} ${styles.fullWidth}`}>
                Contact Team
              </button>
            <div className={styles.featuresList}>
              {['Everything in Pro', 'Custom Team Tracks', 'Manager Dashboard', 'Private Workshops', 'Priority Support'].map((feat, i) => (
                <div key={i} className={styles.featureItem}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
