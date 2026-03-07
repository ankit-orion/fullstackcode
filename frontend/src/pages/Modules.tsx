import React from "react";
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
} from "lucide-react";
import styles from "./Modules.module.css";

const MOCK_MODULES = [
  {
    id: "web",
    title: "Internet & Web Fundamentals",
    description:
      "Understand how the web works, HTTP/HTTPS, DNS, and fundamental client-server architectures.",
    icon: Globe,
    colorClass: styles.webColor,
    topicsCount: 13,
  },
  {
    id: "html",
    title: "HTML (Structure Layer)",
    description:
      "Learn the semantic structure of the web, forms, accessibility, and SEO basics.",
    icon: FileCode2,
    colorClass: styles.htmlColor,
    topicsCount: 11,
  },
  {
    id: "css",
    title: "CSS (Styling & Layout)",
    description:
      "Master Flexbox, Grid, animations, BEM, and modern responsive design patterns.",
    icon: Paintbrush,
    colorClass: styles.cssColor,
    topicsCount: 23,
  },
  {
    id: "js",
    title: "JavaScript Fundamentals",
    description:
      "Deep dive into closures, scope, standard APIs, the Event Loop, and asynchronous programming.",
    icon: Braces,
    colorClass: styles.jsColor,
    topicsCount: 28,
  },
  {
    id: "ts",
    title: "TypeScript",
    description:
      "Add robust static typing to JS with interfaces, generics, type narrowing, and utility types.",
    icon: Code2,
    colorClass: styles.tsColor,
    topicsCount: 9,
  },
  {
    id: "git",
    title: "Git & Version Control",
    description:
      "Master branching, rebasing, resolving conflicts, and standard GitHub PR workflows.",
    icon: GitBranch,
    colorClass: styles.gitColor,
    topicsCount: 10,
  },
  {
    id: "react",
    title: "Frontend Framework (React)",
    description:
      "Build reactive UI with generic components, hooks, lifecycle, context APIs, and routing.",
    icon: TerminalSquare,
    colorClass: styles.reactColor,
    topicsCount: 26,
  },
  {
    id: "node",
    title: "Backend Development",
    description:
      "Write robust server-side APIs, understand MVC architecture, middleware, and core backend patterns.",
    icon: Server,
    colorClass: styles.nodeColor,
    topicsCount: 19,
  },
  {
    id: "db",
    title: "Databases",
    description:
      "Design efficient SQL schemas, learn complex joins, indexing strategies, and explore NoSQL alternatives.",
    icon: Database,
    colorClass: styles.dbColor,
    topicsCount: 16,
  },
  {
    id: "api",
    title: "API Design",
    description:
      "Construct scalable RESTful interfaces, introduce GraphQL, implement websockets, and pagination patterns.",
    icon: Network,
    colorClass: styles.apiColor,
    topicsCount: 8,
  },
  {
    id: "auth",
    title: "Authentication & Authorization",
    description:
      "Implement secure login via Sessions, JWTs, OAuth2, and manage complex RBAC systems.",
    icon: ShieldCheck,
    colorClass: styles.authColor,
    topicsCount: 8,
  },
  {
    id: "system-design",
    title: "System Design for Web Apps",
    description:
      "Architect scale through load balancing, caching, CDNs, message queues, and microservices.",
    icon: LayoutTemplate,
    colorClass: styles.systemDesignColor,
    topicsCount: 7,
  },
  {
    id: "perf",
    title: "Performance Optimization",
    description:
      "Implement tree shaking, code splitting, edge caching, and bundle optimization techniques.",
    icon: Gauge,
    colorClass: styles.perfColor,
    topicsCount: 8,
  },
  {
    id: "testing",
    title: "Testing",
    description:
      "Write robust Unit tests natively, Integration tests, and End-to-End browser tests (Jest, Cypress).",
    icon: TestTube,
    colorClass: styles.testingColor,
    topicsCount: 6,
  },
  {
    id: "devops",
    title: "DevOps Basics",
    description:
      "Automate delivery using CI/CD pipelines, containerize architectures, and manage environments.",
    icon: Workflow,
    colorClass: styles.devopsColor,
    topicsCount: 6,
  },
  {
    id: "cloud",
    title: "Cloud & Deployment",
    description:
      "Navigate Serverless architecture deployment, edge functions, and horizontal autoscaling.",
    icon: Cloud,
    colorClass: styles.cloudColor,
    topicsCount: 6,
  },
  {
    id: "realtime",
    title: "Real-Time Applications",
    description:
      "Architect robust Pub/Sub patterns, Server-Sent Events, and real-time chat architectures.",
    icon: Zap,
    colorClass: styles.realtimeColor,
    topicsCount: 4,
  },
  {
    id: "security",
    title: "Security Engineering",
    description:
      "Defend against XSS, CSRF attacks, implement strict CSP headers, and mitigate OWASP top 10.",
    icon: Lock,
    colorClass: styles.securityColor,
    topicsCount: 6,
  },
  {
    id: "adv-frontend",
    title: "Advanced Frontend Architecture",
    description:
      "Scale large client apps via Micro-frontends, sophisticated component libraries, and global state.",
    icon: Layers,
    colorClass: styles.advFrontendColor,
    topicsCount: 5,
  },
];

export function Modules() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>Curriculum Tracks</div>
        <h1 className={styles.title}>
          Comprehensive <span className={styles.highlight}>Modules</span>
        </h1>
        <p className={styles.subtitle}>
          Master the full stack with in-depth reading materials and interactive
          practice questions tailored for each technology domain.
        </p>
      </header>

      <div className={styles.grid}>
        {MOCK_MODULES.map((module) => {
          const IconComponent = module.icon;
          return (
            <Link
              to={`/modules/${module.id}`}
              key={module.id}
              className={styles.card}
            >
              <div className={`${styles.iconWrapper} ${module.colorClass}`}>
                <IconComponent size={28} />
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.topicCount}>
                  {module.topicsCount} Topics
                </span>
                <span className={styles.actionText}>Start Learning &rarr;</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
