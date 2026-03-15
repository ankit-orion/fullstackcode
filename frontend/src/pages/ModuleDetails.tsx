import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ArrowLeft,
  List,
  Lock
} from "lucide-react";
import { marked } from "marked";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./ModuleDetails.module.css";
import { api } from "../lib/api";
import type { ModuleDetail, TopicDetail } from "../lib/api";

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: { duration: 0.2 } 
  }
};

// Configure marked for safe, clean rendering
marked.setOptions({ breaks: true });

// ─── Types used internally in this component ─────────────────────────────────

type TopicUI = {
  id: string;
  title: string;
  type: "reading";
  readingTime: string;
  htmlContent: string;
};

type SectionUI = {
  id: string;
  title: string;
  topics: TopicUI[];
};

// ─── Helper: parse markdown → html ───────────────────────────────────────────

function mdToHtml(markdown: string): string {
  const result = marked.parse(markdown);
  return typeof result === "string" ? result : "";
}

// ─── Helper: rough reading-time estimate ─────────────────────────────────────

function readingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

// ─── Helper: convert backend topics → UI sections ────────────────────────────

function toSections(topics: TopicDetail[]): SectionUI[] {
  const section: SectionUI = {
    id: "s1",
    title: "Curriculum Topics",
    topics: topics.map((t) => ({
      // Use t.id (slug) if available, fallback to stringified order
      id: t.id || t.order.toString(),
      title: t.title,
      type: "reading" as const,
      readingTime: readingTime(t.content),
      htmlContent: mdToHtml(t.content),
    })),
  };
  return [section];
}

export function ModuleDetails() {
  const { moduleId } = useParams<{ moduleId: string }>();

  const [moduleData, setModuleData] = useState<ModuleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [activeTopicId, setActiveTopicId] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ s1: true });
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jumpWarningId, setJumpWarningId] = useState<string | null>(null);

  useEffect(() => {
    if (!moduleId) return;

    setLoading(true);
    setFetchError(null);
    setActiveTopicId("");
    setCompletedTopics(new Set());

    api
      .getModule(moduleId)
      .then((data) => {
        setModuleData(data);
        if (data.topics.length > 0) {
          // Initialize with first topic ID (slug or order)
          const firstTopic = data.topics[0];
          setActiveTopicId(firstTopic.id || firstTopic.order.toString());
        }
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error(err);
        setFetchError("Failed to access high-level curriculum data.");
        setLoading(false);
      });
  }, [moduleId]);

  const sections: SectionUI[] = useMemo(
    () => (moduleData ? toSections(moduleData.topics) : []),
    [moduleData]
  );

  const allTopics: TopicUI[] = useMemo(
    () => sections.flatMap((s) => s.topics),
    [sections]
  );

  const activeTopic: TopicUI | undefined = useMemo(
    () => allTopics.find((t) => t.id === activeTopicId),
    [allTopics, activeTopicId]
  );

  const totalTopicsCount = allTopics.length;
  const progressPercent = totalTopicsCount > 0
    ? Math.round((completedTopics.size / totalTopicsCount) * 100)
    : 0;

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const markComplete = () => {
    // 1. Mark current as complete
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      next.add(activeTopicId);
      return next;
    });

    // 2. Navigate to next topic if it exists
    const currentIndex = allTopics.findIndex(t => t.id === activeTopicId);
    if (currentIndex !== -1 && currentIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentIndex + 1];
      setActiveTopicId(nextTopic.id);
      
      // Scroll to top when moving to next article
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setJumpWarningId(null);
    }
  };

  const handleTopicClick = (topicId: string) => {
    const topicIndex = allTopics.findIndex(t => t.id === topicId);
    const isLocked = topicIndex > 0 && !completedTopics.has(allTopics[topicIndex - 1].id);
    const isCompleted = completedTopics.has(topicId);

    if (isLocked && !isCompleted) {
      setJumpWarningId(topicId);
      setActiveTopicId(topicId);
    } else {
      setJumpWarningId(null);
      setActiveTopicId(topicId);
    }
    setIsSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <Loader2 size={32} className={styles.spinner} />
        <p>Initializing curriculum workspace...</p>
      </div>
    );
  }

  if (fetchError || !moduleData) {
    return (
      <div className={styles.errorState}>
        <AlertCircle size={32} />
        <p>{fetchError ?? "Module not found."}</p>
        <Link to="/modules" className={styles.backBtn}>
          Return to Curriculum
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      {/* Mobile Toggle Button */}
      <button 
        className={styles.mobileCurriculumToggle}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <List size={20} />
        <span>Curriculum</span>
      </button>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <Link to="/modules" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Modules
          </Link>

          <h2>{moduleData.title}</h2>

          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>
              {completedTopics.size}/{totalTopicsCount} Objectives Completed
            </span>
          </div>
        </div>

        <div className={styles.curriculumList}>
          {sections.map((section) => (
            <div key={section.id} className={styles.section}>
              <button
                className={styles.sectionHeader}
                onClick={() => toggleSection(section.id)}
              >
                <div className={styles.sectionTitle}>
                  {expandedSections[section.id] ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                  <span>{section.title}</span>
                </div>
              </button>

              {expandedSections[section.id] && (
                <div className={styles.topicList}>
                  {section.topics.map((topic, index) => {
                    const isCompleted = completedTopics.has(topic.id);
                    const isLocked = index > 0 && !completedTopics.has(section.topics[index - 1].id);
                    const isActive = activeTopicId === topic.id;

                    return (
                      <button
                        key={topic.id}
                        className={`${styles.topicItem} ${
                          isActive ? styles.active : ""
                        } ${isLocked && !isCompleted ? styles.locked : ""}`}
                        onClick={() => handleTopicClick(topic.id)}
                      >
                        <span className={styles.topicIcon}>
                          {isCompleted ? (
                            <CheckCircle2 size={16} className={styles.completed} />
                          ) : isLocked ? (
                            <Lock size={16} className={styles.lockIcon} />
                          ) : (
                            <PlayCircle size={16} />
                          )}
                        </span>
                        <span className={styles.topicName}>{topic.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <main className={styles.contentArea}>
        <AnimatePresence mode="wait">
          {jumpWarningId && activeTopic ? (
            <motion.div
              key="jump-warning"
              className={styles.jumpWarning}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
            >
              <div className={styles.skeletonContainer}>
                <div className={styles.skeletonHeader} />
                <div className={styles.skeletonLine} style={{ width: "80%" }} />
                <div className={styles.skeletonLine} style={{ width: "90%" }} />
                <div className={styles.skeletonLine} style={{ width: "70%" }} />
              </div>

              <div className={styles.warningCard}>
                <Lock size={48} className={styles.warningIcon} />
                <h2>Article Locked</h2>
                <p>
                  You still have not completed the previous articles. 
                  Are you sure you want to jump ahead and skip the prerequisite content?
                </p>
                <div className={styles.warningActions}>
                  <button 
                    className={styles.proceedBtn}
                    onClick={() => setJumpWarningId(null)}
                  >
                    Yes, go ahead
                  </button>
                  <button 
                    className={styles.goBackBtn}
                    onClick={() => {
                      const firstIncomplete = allTopics.find(t => !completedTopics.has(t.id));
                      if (firstIncomplete) {
                        setActiveTopicId(firstIncomplete.id);
                        setJumpWarningId(null);
                      }
                    }}
                  >
                    Complete previous articles
                  </button>
                </div>
              </div>
            </motion.div>
          ) : activeTopic ? (
            <motion.article 
              key={activeTopic.id}
              className={styles.article}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
            >
              <div className={styles.articleHeader}>
                <span className={styles.readingTime}>{activeTopic.readingTime}</span>
                <h1>{activeTopic.title}</h1>
              </div>

              <div className={styles.articleBody}>
                <div
                  className={styles.markdownContent}
                  dangerouslySetInnerHTML={{ __html: activeTopic.htmlContent }}
                />
              </div>

              <div className={styles.articleFooter}>
                <button
                  className={styles.markComplete}
                  onClick={markComplete}
                >
                  {allTopics.findIndex(t => t.id === activeTopic.id) === allTopics.length - 1
                    ? (completedTopics.has(activeTopic.id) ? "Module Finished ✓" : "Finish Module ✓")
                    : "Next Section →"}
                </button>
              </div>
            </motion.article>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: "var(--text-tertiary)", marginTop: "2rem" }}
            >
              Select a module objective to begin.
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}