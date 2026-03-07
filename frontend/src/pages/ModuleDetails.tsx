import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  Code2,
  CheckCircle2,
} from "lucide-react";
import styles from "./ModuleDetails.module.css";

import { CURRICULUM_DATA } from "../data/curriculum";

/* ----------------------------- Types ----------------------------- */

type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  code?: string;
};

type Article = {
  htmlContent?: string;
  lead?: string;
  sections?: ArticleSection[];
};

type Practice = {
  title: string;
  desc: string;
  link: string;
};

type Topic = {
  id: string;
  title: string;
  type: "article" | "practice";
  readingTime?: string;
  article?: Article;
  practice?: Practice;
};

type Section = {
  id: string;
  title: string;
  topics: Topic[];
};

type Module = {
  title: string;
  sections: Section[];
};

/* -------------------------- Component ---------------------------- */

export function ModuleDetails() {
  const { moduleId } = useParams();

  const [activeTopicId, setActiveTopicId] = useState<string>("t1");

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({ s1: true, s2: true });

  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    new Set(["t1"])
  );

  const curriculum = CURRICULUM_DATA as Record<string, Module>;

  const data: Module = curriculum[moduleId as string] || curriculum.html;

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const markComplete = () => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      next.add(activeTopicId);
      return next;
    });
  };

  const { activeTopic, totalTopicsCount } = useMemo(() => {
    let active: Topic | null = null;
    let count = 0;

    for (const section of data.sections) {
      for (const topic of section.topics) {
        count++;

        if (topic.id === activeTopicId) {
          active = topic;
        }
      }
    }

    return { activeTopic: active, totalTopicsCount: count };
  }, [activeTopicId, data]);

  const progressPercent =
    Math.round((completedTopics.size / totalTopicsCount) * 100) || 0;

  return (
    <div className={styles.layout}>
      {/* Sidebar */}

      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link to="/modules" className={styles.backLink}>
            &larr; Back to Modules
          </Link>

          <h2>{data.title}</h2>

          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span>
              {completedTopics.size}/{totalTopicsCount} Completed
            </span>
          </div>
        </div>

        <div className={styles.curriculumList}>
          {data.sections.map((section: Section) => (
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
                  {section.topics.map((topic: Topic) => {
                    const isCompleted = completedTopics.has(topic.id);

                    return (
                      <button
                        key={topic.id}
                        className={`${styles.topicItem} ${
                          activeTopicId === topic.id ? styles.active : ""
                        }`}
                        onClick={() => setActiveTopicId(topic.id)}
                      >
                        <span className={styles.topicIcon}>
                          {isCompleted ? (
                            <CheckCircle2
                              size={16}
                              className={styles.completed}
                            />
                          ) : topic.type === "practice" ? (
                            <Code2 size={16} />
                          ) : (
                            <PlayCircle size={16} />
                          )}
                        </span>

                        <span className={styles.topicName}>
                          {topic.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}

      <main className={styles.contentArea}>
        {activeTopic ? (
          <article className={styles.article}>
            <div className={styles.articleHeader}>
              <span className={styles.readingTime}>
                {activeTopic.readingTime}
              </span>

              <h1>{activeTopic.title}</h1>
            </div>

            <div className={styles.articleBody}>
              {activeTopic.article && (
                <>
                  {activeTopic.article.htmlContent ? (
                    <div
                      className={styles.markdownContent}
                      dangerouslySetInnerHTML={{
                        __html: activeTopic.article.htmlContent,
                      }}
                    />
                  ) : (
                    <>
                      <p
                        className={styles.lead}
                        dangerouslySetInnerHTML={{
                          __html: activeTopic.article.lead || "",
                        }}
                      />

                      {activeTopic.article.sections?.map(
                        (sec: ArticleSection, idx: number) => (
                          <div key={idx}>
                            <h2>{sec.heading}</h2>

                            {sec.paragraphs?.map(
                              (p: string, pIdx: number) => (
                                <p
                                  key={pIdx}
                                  dangerouslySetInnerHTML={{ __html: p }}
                                />
                              )
                            )}

                            {sec.code && (
                              <pre>
                                <code>{sec.code}</code>
                              </pre>
                            )}
                          </div>
                        )
                      )}
                    </>
                  )}
                </>
              )}

              {activeTopic.practice && (
                <div className={styles.practiceInline}>
                  <div className={styles.practiceHeader}>
                    <Code2 size={24} className={styles.practiceIcon} />

                    <div>
                      <h3>{activeTopic.practice.title}</h3>
                      <p>{activeTopic.practice.desc}</p>
                    </div>
                  </div>

                  <Link
                    to={activeTopic.practice.link}
                    className={styles.practiceButton}
                  >
                    Solve Challenge In IDE &rarr;
                  </Link>
                </div>
              )}
            </div>

            <div className={styles.articleFooter}>
              <button
                className={styles.markComplete}
                onClick={markComplete}
                disabled={completedTopics.has(activeTopic.id)}
                style={{
                  opacity: completedTopics.has(activeTopic.id) ? 0.5 : 1,
                  cursor: completedTopics.has(activeTopic.id)
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {completedTopics.has(activeTopic.id)
                  ? "Completed ✓"
                  : "Mark as Complete →"}
              </button>
            </div>
          </article>
        ) : (
          <div
            style={{
              marginTop: "2rem",
              color: "var(--text-secondary)",
            }}
          >
            Select a topic from the sidebar to start learning.
          </div>
        )}
      </main>
    </div>
  );
}