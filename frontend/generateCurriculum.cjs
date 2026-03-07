const fs = require('fs');
const path = require('path');
const userArticles = require('./parsed_premium_data.json');
const { marked } = require('marked');

// Configure marked to sanitize or customize if needed
marked.use({
  gfm: true,
  breaks: true,
});

const curriculum = [
  {
    id: "web",
    title: "Internet & Web Fundamentals",
    description: "This ensures beginners understand how the web works.",
    topics: ["How the Internet Works", "HTTP vs HTTPS", "DNS Resolution", "Domain Names & Hosting", "Client vs Server Architecture", "Request–Response Lifecycle", "Web Browsers Internals", "Cookies vs Local Storage vs Session Storage", "CORS", "Web Security Basics", "REST vs RPC", "WebSockets Basics", "JSON vs XML"],
    practices: []
  },
  {
    id: "html",
    title: "HTML (Structure Layer)",
    description: "Learn HTML fundamentals.",
    topics: ["HTML Document Structure", "Semantic HTML", "Common Tags", "Forms & Input Types", "Accessibility (ARIA)", "Meta Tags & SEO Basics", "Images & Media", "Tables", "HTML Validation", "Microdata & Structured Data", "HTML Performance Best Practices"],
    practices: ["Build form validation", "Accessible navigation", "Semantic blog page"]
  },
  {
    id: "css",
    title: "CSS (Styling & Layout)",
    description: "Learn CSS styling and layout.",
    topics: ["CSS Fundamentals", "Selectors", "Specificity", "Box Model", "Units", "Colors", "Typography", "Layout", "Flexbox", "CSS Grid", "Positioning", "Responsive Design", "Media Queries", "Advanced CSS", "Animations", "Transitions", "Variables", "BEM methodology", "CSS Architecture", "Modern CSS", "Container Queries", "Logical Properties", "Modern responsive patterns"],
    practices: ["Responsive dashboard", "Complex grid layouts", "CSS animations challenge"]
  },
  {
    id: "js",
    title: "JavaScript Fundamentals",
    description: "Learn JS.",
    topics: ["Basics", "Variables", "Data Types", "Operators", "Control Flow", "Functions", "Scope", "Closures", "Objects & Arrays", "Object manipulation", "Array methods", "Iterators", "Asynchronous JS", "Callbacks", "Promises", "Async/Await", "Event Loop", "Browser APIs", "DOM Manipulation", "Events", "Fetch API", "Storage APIs", "Advanced JS", "Prototypes", "Classes", "Modules", "Error handling", "Functional programming patterns"],
    practices: ["Implement debounce", "Build event emitter", "Promise implementation", "Deep clone object"]
  },
  {
    id: "ts",
    title: "TypeScript",
    description: "Learn TS",
    topics: ["Type System", "Interfaces", "Types vs Interfaces", "Generics", "Utility Types", "Type Narrowing", "Decorators", "Advanced Types", "Type-safe APIs"],
    practices: ["Convert JS project to TypeScript", "Build typed API client"]
  },
  {
    id: "git",
    title: "Git & Version Control",
    description: "Learn Git.",
    topics: ["Git Basics", "Commits", "Branching", "Merging", "Rebasing", "Conflict Resolution", "Git Workflows", "GitHub Pull Requests", "Git Hooks", "Semantic Versioning"],
    practices: ["Resolve merge conflict challenge", "Rebase vs merge scenario"]
  },
  {
    id: "react",
    title: "Frontend Framework (React)",
    description: "Learn React.",
    topics: ["React Basics", "Components", "JSX", "Props", "State", "Events", "Hooks", "useState", "useEffect", "useRef", "useMemo", "useCallback", "Advanced React", "Context API", "Custom Hooks", "Performance optimization", "Suspense", "Error Boundaries", "Architecture", "Component design patterns", "State management", "Feature folder structure", "Ecosystem", "Routing", "Forms", "Data fetching"],
    practices: ["Build Todo App", "Infinite scroll", "Virtualized list", "Drag & drop"]
  },
  {
    id: "node",
    title: "Backend Development",
    description: "Learn Node.",
    topics: ["Node Basics", "Node architecture", "Event-driven programming", "NPM ecosystem", "API Development", "REST API design", "Middleware", "Controllers", "Error handling", "Authentication", "Sessions", "JWT", "OAuth", "Role-based access", "Security", "Rate limiting", "Input validation", "XSS", "CSRF", "SQL injection"],
    practices: ["Build login system", "API pagination", "Rate limiter implementation"]
  },
  {
    id: "db",
    title: "Databases",
    description: "Learn Databases.",
    topics: ["SQL", "Relational concepts", "SELECT queries", "Joins", "Aggregations", "Indexing", "Transactions", "Query optimization", "NoSQL", "Document databases", "Schema design", "Indexing", "Aggregation pipelines", "Database Design", "Normalization", "Data modeling", "Scaling databases", "Replication"],
    practices: ["Design schema for social network", "Optimize slow query"]
  },
  {
    id: "api",
    title: "API Design",
    description: "Learn APIs.",
    topics: ["RESTful design", "GraphQL", "API versioning", "Pagination", "Rate limiting", "Idempotency", "Webhooks", "API documentation"],
    practices: ["Design URL shortener API", "Design comment system API"]
  },
  {
    id: "auth",
    title: "Authentication & Authorization",
    description: "Learn Auth.",
    topics: ["Sessions", "JWT", "OAuth2", "SSO", "RBAC", "Token refresh strategies", "Password hashing", "MFA"],
    practices: ["Implement JWT auth", "Role based dashboard"]
  },
  {
    id: "system-design",
    title: "System Design for Web Apps",
    description: "Learn System Design.",
    topics: ["Load balancing", "Caching", "CDN", "Horizontal scaling", "Microservices vs monolith", "Message queues", "Event-driven architecture"],
    practices: ["Design Twitter", "Design YouTube comments", "Design chat app"]
  },
  {
    id: "perf",
    title: "Performance Optimization",
    description: "Learn Performance.",
    topics: ["Frontend", "Code splitting", "Lazy loading", "Tree shaking", "Bundle optimization", "Backend", "Caching", "DB query optimization", "Async processing", "Infrastructure", "CDN", "Edge computing"],
    practices: ["Optimize slow website challenge"]
  },
  {
    id: "testing",
    title: "Testing",
    description: "Learn Testing.",
    topics: ["Unit testing", "Integration testing", "E2E testing", "Mocking", "Test driven development", "Tools examples:", "Jest", "Playwright", "Cypress"],
    practices: ["Write tests for API", "Test React component"]
  },
  {
    id: "devops",
    title: "DevOps Basics",
    description: "Learn DevOps.",
    topics: ["CI/CD", "Docker", "Containers", "Deployment strategies", "Environment variables", "Infrastructure as code"],
    practices: ["Containerize app", "Setup CI pipeline"]
  },
  {
    id: "cloud",
    title: "Cloud & Deployment",
    description: "Learn Cloud.",
    topics: ["Cloud fundamentals", "Serverless", "Edge functions", "Hosting architectures", "CDN", "Autoscaling"],
    practices: ["Deploy full stack app"]
  },
  {
    id: "realtime",
    title: "Real-Time Applications",
    description: "Learn Real-Time.",
    topics: ["WebSockets", "Server Sent Events", "Pub/Sub systems", "Chat architecture", "Notification systems"],
    practices: ["Build real-time chat"]
  },
  {
    id: "security",
    title: "Security Engineering",
    description: "Learn Security.",
    topics: ["XSS", "CSRF", "CSP", "Secure headers", "Authentication attacks", "OWASP Top 10"],
    practices: ["Fix vulnerable app challenge"]
  },
  {
    id: "adv-frontend",
    title: "Advanced Frontend Architecture",
    description: "Learn Adv Frontend.",
    topics: ["State management", "Micro frontends", "Design systems", "Component libraries", "Accessibility engineering"],
    practices: ["Build reusable UI library"]
  }
];

const generatedData = {};

let topicGlobalId = 1;

curriculum.forEach(mod => {
  const sections = [];
  
  if (userArticles[mod.id]) {
    const customTopics = userArticles[mod.id].topics.map(t => {
      return {
        id: "t" + (topicGlobalId++),
        title: t.title,
        type: "reading",
        readingTime: t.article.timeToRead + " min read",
        article: {
          htmlContent: marked.parse(t.article.content)
        }
      };
    });
    sections.push({
      id: "s1",
      title: "Core Concepts",
      topics: customTopics
    });
  } else {
    // Create a section for Theory
    const theoryTopics = mod.topics.map((t, i) => {
      return {
        id: "t" + (topicGlobalId++),
        title: t,
        type: "reading",
        readingTime: Math.floor(Math.random() * 10 + 5) + " min read",
        article: {
          lead: `Understanding ${t} is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of ${t}.`,
          sections: [
            {
              heading: `Diving into ${t}`,
              paragraphs: [
                `${t} forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.`,
                `The core concepts of ${t} include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to ${t}.`
              ],
              code: `// Example of ${t}\nconsole.log('Practicing ${t}');\nfunction init() {\n  return 'Success';\n}`
            },
            {
              heading: `Advanced Concepts in ${t}`,
              paragraphs: [
                `When working with ${t} at scale, performance and security become paramount. Always ensure you are following the latest industry standards.`,
                `Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of ${t}. Always validate inputs and handle errors gracefully.`
              ]
            }
          ]
        }
      };
    });
    
    if (theoryTopics.length > 0) {
      sections.push({
        id: "s1",
        title: "Core Concepts",
        topics: theoryTopics
      });
    }
  }

  // Create a section for Practices
  const practiceTopics = mod.practices.map((p, i) => {
    return {
      id: "t" + (topicGlobalId++),
      title: p,
      type: "practice",
      readingTime: "Practice Task",
      practice: {
        title: p,
        desc: `Put your knowledge to the test by implementing "${p}". Try to write clean, optimal, and performant code.`,
        link: `/workspace/${mod.id}-${i+1}`
      }
    };
  });

  if (practiceTopics.length > 0) {
    sections.push({
      id: "s2",
      title: "Challenges & Practice",
      topics: practiceTopics
    });
  }

  generatedData[mod.id] = {
    id: mod.id,
    title: mod.title,
    description: mod.description,
    sections: sections
  };
});

const fileContent = `// AUTO-GENERATED CURRICULUM DATA
export const CURRICULUM_DATA: any = ${JSON.stringify(generatedData, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src/data/curriculum.ts'), fileContent, 'utf-8');
console.log('Successfully generated curriculum.ts with all topics!');
