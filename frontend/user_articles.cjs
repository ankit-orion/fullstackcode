module.exports = {
  web: [
    {
      title: "How the Internet Works",
      article: {
        lead: "The internet is a network of networks. Computers communicate through a standard protocol called TCP/IP.",
        sections: [
          {
            heading: "Example scenario",
            paragraphs: [
              "1. You open your browser.",
              "2. You type `https://google.com`.",
              "3. Your computer sends a request through your ISP.",
              "4. The request travels through multiple servers.",
              "5. Google sends back a response.",
              "Every website interaction follows this basic structure."
            ]
          }
        ]
      }
    },
    {
      title: "HTTP vs HTTPS",
      article: {
        lead: "HTTP stands for HyperText Transfer Protocol. It defines how clients and servers communicate. HTTPS is the secure version of HTTP.",
        sections: [
          {
            heading: "Key difference",
            paragraphs: [
              "**HTTP**: Data travels as plain text.",
              "**HTTPS**: Data is encrypted using SSL or TLS."
            ]
          },
          {
            heading: "Example Requests & Responses",
            paragraphs: [
              "HTTPS protects user data such as passwords and credit card numbers."
            ],
            code: "GET /index.html HTTP/1.1\nHost: example.com\n\nHTTP/1.1 200 OK\nContent-Type: text/html"
          }
        ]
      }
    },
    {
      title: "DNS Resolution",
      article: {
        lead: "Humans remember domain names. Computers use IP addresses. DNS translates domain names into IP addresses.",
        sections: [
          {
            heading: "How it works",
            paragraphs: [
              "Example: `google.com -> 142.250.183.46`",
              "1. Browser checks cache",
              "2. OS checks DNS cache",
              "3. Request goes to DNS resolver",
              "4. DNS server returns IP",
              "Only then can the browser contact the server."
            ]
          }
        ]
      }
    },
    {
      title: "Domain Names and Hosting",
      article: {
        lead: "Domain name: Human readable website address. Hosting: The physical server where the website lives.",
        sections: [
          {
            heading: "Providers",
            paragraphs: [
              "Example Domain: `myportfolio.com`",
              "Example Hosting: AWS server running your code.",
              "Popular hosting providers: AWS, Vercel, Netlify, DigitalOcean."
            ]
          }
        ]
      }
    },
    {
      title: "Client vs Server Architecture",
      article: {
        lead: "Client: User device such as browser or mobile app. Server: Machine that processes requests and sends responses.",
        sections: [
          {
            heading: "Example",
            paragraphs: [
              "Client sends request: `GET /api/users`"
            ],
            code: "{\n  \"name\": \"Ankit\",\n  \"role\": \"developer\"\n}"
          }
        ]
      }
    },
    {
      title: "Request Response Lifecycle",
      article: {
        lead: "Understanding this flow is essential for debugging production issues.",
        sections: [
          {
            heading: "The Flow",
            paragraphs: [
              "When a user clicks a page:",
              "1. Browser sends HTTP request",
              "2. Server processes request",
              "3. Database query runs",
              "4. Server returns response",
              "5. Browser renders UI"
            ]
          }
        ]
      }
    },
    {
      title: "Browser Internals",
      article: {
        lead: "Browsers do more than display pages.",
        sections: [
          {
            heading: "What's inside",
            paragraphs: [
              "They include: Rendering engine, JavaScript engine, Networking layer, Layout engine."
            ]
          },
          {
            heading: "Example process",
            paragraphs: [
              "1. Browser downloads HTML",
              "2. Builds DOM tree",
              "3. Downloads CSS",
              "4. Builds CSSOM",
              "5. Combines into render tree",
              "6. Paints pixels"
            ]
          }
        ]
      }
    },
    {
      title: "Cookies vs Local Storage vs Session Storage",
      article: {
        lead: "Cookies: Small pieces of data stored by the browser and sent with requests. Local Storage: Data stored in browser and persists even after closing the tab. Session Storage: Data exists only during a browser session.",
        sections: [
          {
            heading: "Examples",
            paragraphs: [
              "Cookie: `Set-Cookie: session_id=abc123`"
            ],
            code: "// Local Storage\nlocalStorage.setItem(\"theme\", \"dark\");\n\n// Session Storage\nsessionStorage.setItem(\"cart\", \"3 items\");"
          }
        ]
      }
    },
    {
      title: "CORS",
      article: {
        lead: "CORS stands for Cross Origin Resource Sharing. Browsers block requests between different domains for security.",
        sections: [
          {
            heading: "Headers",
            paragraphs: [
              "Example blocked request: `frontend.com -> api.backend.com`",
              "Server must allow it using headers."
            ],
            code: "Access-Control-Allow-Origin: *"
          }
        ]
      }
    },
    {
      title: "REST vs RPC",
      article: {
        lead: "REST: Resource based API design. RPC: Function based API.",
        sections: [
          {
            heading: "Differences",
            paragraphs: [
              "REST dominates modern web APIs."
            ],
            code: "// REST\nGET /users\nPOST /users\nDELETE /users/1\n\n// RPC\ncreateUser()\ngetUser()"
          }
        ]
      }
    },
    {
      title: "WebSockets Basics",
      article: {
        lead: "HTTP is request response. WebSockets allow real time communication.",
        sections: [
          {
            heading: "Uses",
            paragraphs: [
              "Example uses: Chat apps, Multiplayer games, Stock market dashboards."
            ],
            code: "const socket = new WebSocket(\"ws://example.com\");"
          }
        ]
      }
    },
    {
      title: "JSON vs XML",
      article: {
        lead: "JSON dominates modern APIs because it is lightweight and easier to parse.",
        sections: [
          {
            heading: "Examples",
            paragraphs: [
              "Comparing JSON and XML payloads."
            ],
            code: "// JSON\n{\n  \"name\": \"Ankit\",\n  \"age\": 23\n}\n\n// XML\n<user>\n  <name>Ankit</name>\n  <age>23</age>\n</user>"
          }
        ]
      }
    }
  ],
  html: [
    {
      title: "Basic HTML Document",
      article: {
        lead: "HTML defines the structure of a webpage. Without HTML there is no page to style or script.",
        sections: [
          {
            heading: "The Skeleton",
            paragraphs: [
              "Here is the foundational structure of any HTML document."
            ],
            code: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <p>This is my first page.</p>\n  </body>\n</html>"
          }
        ]
      }
    },
    {
      title: "Semantic HTML",
      article: {
        lead: "Semantic elements describe meaning.",
        sections: [
          {
            heading: "Examples and Benefits",
            paragraphs: [
              "Examples: `<header>`, `<nav>`, `<article>`, `<section>`, `<footer>`",
              "Benefits: Better accessibility, Improved SEO, Cleaner structure."
            ],
            code: "<article>\n  <h1>My Blog Post</h1>\n  <p>This is the article content.</p>\n</article>"
          }
        ]
      }
    },
    {
      title: "Forms and Inputs",
      article: {
        lead: "Forms collect user data.",
        sections: [
          {
            heading: "Input Types",
            paragraphs: [
              "Important input types: email, password, number, date, file."
            ],
            code: "<form>\n  <input type=\"email\" placeholder=\"Email\">\n  <input type=\"password\" placeholder=\"Password\">\n  <button>Login</button>\n</form>"
          }
        ]
      }
    },
    {
      title: "Accessibility",
      article: {
        lead: "Accessible websites work for users with disabilities.",
        sections: [
          {
            heading: "ARIA and Attributes",
            paragraphs: [
              "ARIA attributes help assistive technologies."
            ],
            code: "<img src=\"logo.png\" alt=\"Company Logo\">\n\n<button aria-label=\"Close menu\">X</button>"
          }
        ]
      }
    },
    {
      title: "Meta Tags and SEO",
      article: {
        lead: "Meta tags help search engines understand pages.",
        sections: [
          {
            heading: "Example Tag",
            paragraphs: [],
            code: "<meta name=\"description\" content=\"Learn full stack development\">"
          }
        ]
      }
    },
    {
      title: "Images and Media",
      article: {
        lead: "Embedding rich media content.",
        sections: [
          {
            heading: "Tags",
            paragraphs: [],
            code: "<img src=\"photo.jpg\" alt=\"Landscape\">\n\n<video controls>\n  <source src=\"video.mp4\">\n</video>"
          }
        ]
      }
    }
  ],
  css: [
    {
      title: "CSS Fundamentals",
      article: {
        lead: "CSS controls how websites look. It transforms raw HTML into visually structured interfaces.",
        sections: [
          {
            heading: "Basic Syntax",
            paragraphs: [],
            code: "h1 {\n  color: blue;\n  font-size: 24px;\n}"
          }
        ]
      }
    },
    {
      title: "Selectors",
      article: {
        lead: "Target elements through various selector strategies.",
        sections: [
          {
            heading: "Examples",
            paragraphs: [],
            code: ".class {}\n#id {}\ndiv p {}\nbutton:hover {}"
          }
        ]
      }
    },
    {
      title: "Specificity",
      article: {
        lead: "CSS decides which rule wins based on specificity.",
        sections: [
          {
            heading: "Priority Order",
            paragraphs: [
              "1. Inline styles",
              "2. IDs",
              "3. Classes",
              "4. Elements"
            ]
          }
        ]
      }
    },
    {
      title: "Box Model",
      article: {
        lead: "Every element is a box containing Content, Padding, Border, and Margin.",
        sections: [
          {
            heading: "Example",
            paragraphs: [],
            code: "box {\n  padding: 10px;\n  border: 2px solid black;\n  margin: 20px;\n}"
          }
        ]
      }
    },
    {
      title: "Flexbox",
      article: {
        lead: "Flexbox simplifies 1-dimensional layouts (rows or columns).",
        sections: [
          {
            heading: "Centering with Flexbox",
            paragraphs: [],
            code: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}"
          }
        ]
      }
    },
    {
      title: "CSS Grid",
      article: {
        lead: "Grid is ideal for complex 2-dimensional layouts.",
        sections: [
          {
            heading: "Example Grid",
            paragraphs: [],
            code: ".container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}"
          }
        ]
      }
    },
    {
      title: "Responsive Design",
      article: {
        lead: "Websites must work on phones and desktops. We use media queries for this.",
        sections: [
          {
            heading: "Media Query",
            paragraphs: [],
            code: "@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n}"
          }
        ]
      }
    },
    {
      title: "Animations",
      article: {
        lead: "Create movement and dynamic interactions without JavaScript.",
        sections: [
          {
            heading: "Keyframes",
            paragraphs: [],
            code: "@keyframes fadeIn {\n  from { opacity: 0 }\n  to { opacity: 1 }\n}\n\n.box {\n  animation: fadeIn 1s;\n}"
          }
        ]
      }
    },
    {
      title: "CSS Variables",
      article: {
        lead: "Store values like colors and spacing in variables for easy reuse and theming.",
        sections: [
          {
            heading: "Root Variables",
            paragraphs: [],
            code: ":root {\n  --primary-color: blue;\n}\n\nbutton {\n  background: var(--primary-color);\n}"
          }
        ]
      }
    }
  ]
};
