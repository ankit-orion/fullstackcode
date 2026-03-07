# The Complete Web Development Guide
## Modules 1–5: Foundations

---

# Module 1: Internet & Web Fundamentals

Before you write a single line of HTML, you need a mental model of what the web actually is. Most developers skip this and end up confused when things break in production. Don't be that developer.

---

## How the Internet Works

The internet is a global network of computers that agree on how to talk to each other. That agreement is a set of **protocols** — rules for formatting, addressing, and routing data.

When you type `https://github.com` into your browser, here's the actual sequence:

1. Your browser needs to find the IP address for `github.com`
2. Your OS checks its local DNS cache — if it's there, use it
3. If not cached, your OS asks your configured DNS resolver (usually your router or ISP)
4. The resolver walks up the DNS hierarchy until it gets an answer
5. Your browser opens a TCP connection to that IP on port 443
6. A TLS handshake happens — certificates are exchanged, encryption keys are negotiated
7. Your browser sends an HTTP GET request over that encrypted connection
8. The server processes it and sends back a response
9. Your browser parses the HTML, discovers more resources (CSS, JS, images), and fetches those too
10. The page renders

Every single step is a potential failure point. Understanding each one is how you debug real problems.

### The TCP/IP Stack

Networking is organized in layers. You don't need to memorize all of them, but you should understand what each does:

| Layer | Protocol | What it does |
|-------|----------|--------------|
| Application | HTTP, DNS, SMTP | The actual content and commands |
| Transport | TCP, UDP | Reliable (TCP) or fast (UDP) delivery |
| Internet | IP | Addressing and routing between networks |
| Link | Ethernet, Wi-Fi | Physical transmission on a local network |

**TCP** (Transmission Control Protocol) guarantees delivery and ordering. It breaks data into packets, numbers them, and the receiver sends acknowledgements. Lost packets get retransmitted. This is what HTTP runs on.

**UDP** (User Datagram Protocol) just fires packets and forgets them. Faster, but no guarantees. Used for DNS lookups, video streaming, gaming — things where a dropped packet is better than a delayed one.

### Packets and Routing

Data travels in **packets** — small chunks, typically around 1500 bytes. A single HTTP response might be split into hundreds of packets, each potentially taking a different path through the network, arriving out of order, and being reassembled by TCP at the destination.

Routers forward packets toward their destination using routing tables. They don't know the full path — they just know which next hop gets the packet closer.

---

## HTTP vs HTTPS

**HTTP** (HyperText Transfer Protocol) is the language browsers and servers use to communicate. An HTTP request looks like this:

```
GET /api/users/42 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

And a response:

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600

{"id": 42, "name": "Alice", "email": "alice@example.com"}
```

HTTP is plain text. Anyone who can intercept the network traffic can read everything — credentials, session tokens, personal data. This is a serious problem on public Wi-Fi and shared networks.

**HTTPS** is HTTP with TLS (Transport Layer Security) underneath it. The same request and response happen, but they're encrypted so interceptors only see gibberish.

### The TLS Handshake

When your browser connects to an HTTPS site, before any HTTP happens:

1. **Client Hello** — browser sends supported TLS versions and cipher suites
2. **Server Hello** — server picks a cipher suite and sends its certificate
3. **Certificate verification** — browser checks the cert was signed by a trusted Certificate Authority (CA), hasn't expired, and matches the domain
4. **Key exchange** — they negotiate a shared secret using asymmetric cryptography (usually ECDHE)
5. **Finished** — both sides confirm the handshake with a message encrypted using the new keys

From here on, everything is encrypted with symmetric keys (AES is common) — fast enough for bulk data transfer.

### HTTP Versions

- **HTTP/1.1** — one request per TCP connection at a time (browsers work around this by opening 6 connections per domain)
- **HTTP/2** — multiplexing: multiple requests over a single connection, header compression, server push
- **HTTP/3** — runs over QUIC (UDP-based), faster connection setup, better handling of packet loss

Most production sites should be using HTTP/2 at minimum. Check yours with `curl -I --http2 https://yoursite.com`.

### HTTP Status Codes You Need to Know

```
2xx — Success
  200 OK
  201 Created
  204 No Content

3xx — Redirection
  301 Moved Permanently   (update your bookmarks/links)
  302 Found               (temporary redirect)
  304 Not Modified        (use your cached version)

4xx — Client Error (you did something wrong)
  400 Bad Request         (malformed syntax)
  401 Unauthorized        (not authenticated)
  403 Forbidden           (authenticated but not allowed)
  404 Not Found
  409 Conflict            (e.g. duplicate resource)
  422 Unprocessable Entity (validation failed)
  429 Too Many Requests   (rate limited)

5xx — Server Error (server did something wrong)
  500 Internal Server Error
  502 Bad Gateway         (upstream server failed)
  503 Service Unavailable (overloaded or down)
  504 Gateway Timeout     (upstream server too slow)
```

---

## DNS Resolution

The Domain Name System is the internet's phone book. It translates human-readable names like `api.stripe.com` into IP addresses like `54.187.216.72`.

### The Hierarchy

DNS is a distributed, hierarchical database:

```
                    . (root)
                    |
           .com  .org  .net  .io  ...
                    |
              example.com
                    |
         www   api   mail   ...
```

### How a Lookup Works

When your browser needs to resolve `api.example.com`:

1. Check local cache (OS, browser, `/etc/hosts`)
2. Ask the **Recursive Resolver** (your ISP or a public one like `8.8.8.8`)
3. Resolver asks a **Root Nameserver** — "who handles `.com`?"
4. Root says "ask the `.com` TLD nameserver"
5. TLD nameserver says "ask `ns1.example.com`"
6. `ns1.example.com` (the authoritative nameserver) returns the actual IP
7. Resolver caches the result (for the TTL duration) and returns it

### DNS Record Types

```
A      maps domain → IPv4 address
AAAA   maps domain → IPv6 address
CNAME  maps domain → another domain (alias)
MX     mail server for the domain
TXT    arbitrary text (used for SPF, DKIM, site verification)
NS     nameservers for the domain
SOA    administrative info about the zone
```

```bash
# Practical DNS debugging
dig api.example.com A           # A record
dig api.example.com +trace      # full resolution path
dig @8.8.8.8 api.example.com    # use Google's resolver
nslookup api.example.com        # Windows/cross-platform

# Check what TTL is left on a record
dig api.example.com | grep -i ttl
```

**TTL gotcha**: When you're migrating a site and change DNS records, the old IP will be cached everywhere for the duration of the TTL. Lower your TTL to 300 seconds (5 min) a day or two before the migration, then change the record, then raise it back. This is one of those things that bites everyone once.

---

## Domain Names & Hosting

### How Domains Work

You don't buy a domain — you **rent** it from a registrar (Namecheap, Cloudflare, Google Domains, etc.). The registrar updates the TLD's registry with your nameserver information.

```
You → Registrar → TLD Registry → DNS System → Visitors
```

### Hosting Models

**Shared Hosting**: Your site lives on a server with hundreds of others. Cheap, but one bad neighbor can affect your performance. Fine for personal projects or low-traffic sites.

**VPS (Virtual Private Server)**: A virtual machine with dedicated resources. You get root access and full control. DigitalOcean, Linode, Vultr. Good middle ground for serious projects.

**Dedicated Server**: A physical machine just for you. Expensive, but maximum performance and control. Usually only justified at scale.

**Platform as a Service (PaaS)**: Heroku, Railway, Render. You push code, they handle servers. More expensive per compute unit, but saves operational overhead.

**Serverless / Edge**: Vercel, Netlify, Cloudflare Workers. Functions run on demand, globally distributed. Zero operational overhead for many use cases. Cold start latency is the tradeoff.

### Connecting a Domain to Hosting

Typically you either:

1. **Point nameservers** to your hosting provider (they control all DNS from there)
2. **Add an A record** pointing your domain to your server's IP

```
; Example DNS zone file
example.com.     300  IN  A     203.0.113.42
www.example.com. 300  IN  CNAME example.com.
api.example.com. 300  IN  A     203.0.113.43
```

---

## Client vs Server Architecture

### The Basic Model

```
Client (Browser)                    Server
     |                                 |
     |  HTTP Request                   |
     |-------------------------------->|
     |                                 | - reads DB
     |                                 | - runs business logic
     |  HTTP Response                  | - renders/returns data
     |<--------------------------------|
     |                                 |
```

**Client-side** code runs in the browser: JavaScript manipulating the DOM, handling user interactions, making API calls. The user can see and modify it.

**Server-side** code runs on the server: database queries, authentication, business logic, sending emails. The user never sees it directly.

### Rendering Strategies

**Server-Side Rendering (SSR)**: The server builds the full HTML and sends it. Fast initial page load, great for SEO. Traditional web (PHP, Rails, Django) and modern frameworks (Next.js, Nuxt).

**Client-Side Rendering (CSR)**: Server sends a minimal HTML shell plus JavaScript. JS runs in the browser and renders the page. The initial load is slower (blank page until JS runs), but subsequent navigation is fast. Create React App, Vue CLI.

**Static Site Generation (SSG)**: HTML is generated at build time, not request time. Incredibly fast, trivially cacheable. Great for marketing sites, documentation, blogs. Gatsby, Hugo, Next.js with `getStaticProps`.

**Incremental Static Regeneration (ISR)**: Static pages are regenerated in the background after a set interval. Best of both worlds for sites with infrequently changing content. Next.js-specific.

The right choice depends on your content update frequency, SEO requirements, and traffic patterns. Most real applications use a mix.

---

## The Request–Response Lifecycle

Let's trace a real request through a modern web stack. User clicks "Add to Cart" on an e-commerce site:

```
1. Browser
   - User clicks button
   - JavaScript event handler fires
   - fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId: 123 }) })

2. Network
   - DNS lookup (probably cached)
   - TCP connection (probably reused via HTTP/2)
   - TLS already established
   - HTTP/2 stream opened

3. Load Balancer (nginx, AWS ALB)
   - Terminates TLS
   - Routes to an available app server
   - Adds X-Forwarded-For header with client IP

4. App Server (Node.js, etc.)
   - Framework router matches POST /api/cart
   - Authentication middleware: validates JWT token
   - Rate limiting middleware: checks request count
   - Controller function runs:
     a. Validates request body (productId is a number, product exists)
     b. Queries database: SELECT * FROM products WHERE id = 123
     c. Updates database: INSERT INTO cart_items ...
     d. Returns JSON response

5. Database
   - Query executes
   - Returns result set
   - Connection returned to pool

6. Response travels back
   - App server sends HTTP 201 with JSON body
   - Load balancer forwards it
   - Browser receives it
   - JavaScript parses JSON, updates UI
```

Every one of these steps is something you'll debug at some point. Knowing the full picture means you know where to look.

---

## Web Browser Internals

Modern browsers are extraordinarily complex. Here's what happens when they receive HTML:

### The Critical Rendering Path

```
HTML bytes → Tokens → DOM
CSS bytes  → Tokens → CSSOM
                         ↓
DOM + CSSOM = Render Tree
                         ↓
                      Layout (calculate positions and sizes)
                         ↓
                      Paint (fill in pixels)
                         ↓
                      Composite (layers → screen)
```

**DOM** (Document Object Model): A tree representation of the HTML structure. JavaScript interacts with the page through this API.

**CSSOM** (CSS Object Model): A tree of all CSS rules. Combined with the DOM to determine what each element looks like.

**Render Tree**: Only the visible elements (no `display: none`, no `<head>`), each with their computed styles.

**Layout** (also called Reflow): The browser calculates the exact position and size of every element. This is expensive. Triggering it repeatedly (layout thrashing) kills performance.

**Paint**: Fills in pixels for each element — backgrounds, borders, text, shadows.

**Composite**: The browser may split the page into layers (especially for animated or transformed elements) and composites them together on the GPU.

### JavaScript Engine

Browsers use a **Just-In-Time (JIT)** compiler. Your JavaScript isn't interpreted line by line — it's compiled to machine code at runtime. V8 (Chrome/Node.js) optimizes "hot" code paths especially aggressively.

The browser runs JavaScript on a **single thread** using an **event loop**. Long-running JS blocks the UI thread — the page freezes. This is why you use async operations and why Web Workers exist.

### The Event Loop

```javascript
// Mental model of the event loop:

while (true) {
  // 1. Run all synchronous code in the call stack
  runCallStack();

  // 2. Process all microtasks (Promise callbacks, queueMicrotask)
  while (microtaskQueue.length > 0) {
    runMicrotask(microtaskQueue.shift());
  }

  // 3. Render if needed (60fps = every ~16.6ms)
  if (shouldRender()) render();

  // 4. Run one macrotask (setTimeout, setInterval, I/O callback)
  if (macrotaskQueue.length > 0) {
    runMacrotask(macrotaskQueue.shift());
  }
}
```

This explains some non-obvious behavior:

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0); // macrotask queue

Promise.resolve().then(() => console.log('3')); // microtask queue

console.log('4');

// Output: 1, 4, 3, 2
// Synchronous runs first, then microtasks, then macrotasks
```

---

## Cookies vs localStorage vs sessionStorage

All three let you store data in the browser, but they have very different characteristics.

### Cookies

```javascript
// Setting a cookie
document.cookie = "userId=abc123; Max-Age=86400; Path=/; Secure; HttpOnly; SameSite=Strict";

// Reading cookies (clunky API — use a library or helper)
const cookies = Object.fromEntries(
  document.cookie.split('; ').map(c => c.split('='))
);
```

Key characteristics:
- **Sent to the server automatically** with every request. This is their primary purpose.
- Size limit: ~4KB
- Can be set by the server via `Set-Cookie` response header
- `HttpOnly` flag: JavaScript cannot access it (XSS protection for session tokens)
- `Secure` flag: Only sent over HTTPS
- `SameSite` flag: Controls cross-site sending (`Strict`, `Lax`, `None`)
- Expiry: `Max-Age` or `Expires` — without these, it's a session cookie (deleted when browser closes)

**Use cookies for**: session tokens, authentication, anything the server needs to read.

### localStorage

```javascript
// Simple key-value storage
localStorage.setItem('theme', 'dark');
localStorage.setItem('cart', JSON.stringify([{ id: 1, qty: 2 }]));

const theme = localStorage.getItem('theme');              // 'dark'
const cart = JSON.parse(localStorage.getItem('cart'));    // [{ id: 1, qty: 2 }]

localStorage.removeItem('theme');
localStorage.clear(); // nuke everything
```

Key characteristics:
- **Never sent to the server**
- Persists until explicitly cleared (survives browser restarts)
- ~5-10MB storage limit
- Synchronous API — can block the main thread for large operations
- Scoped to origin (protocol + domain + port)

**Use for**: user preferences, non-sensitive cached data, offline-first apps.

### sessionStorage

Same API as localStorage, but:
- Cleared when the tab is closed
- Not shared between tabs (even same origin)
- Good for: wizard state, temporary form data, tab-specific UI state

### The Real Decision Matrix

```
Question: Does the server need to read this data?
  YES → Cookie (with HttpOnly if it's a token)
  NO  → Continue...

Question: Should it persist after the browser closes?
  YES → localStorage
  NO  → sessionStorage
```

**Never store sensitive data** (tokens, passwords, personal info) in localStorage or sessionStorage. XSS attacks can steal everything in there. Session tokens belong in `HttpOnly` cookies.

---

## CORS (Cross-Origin Resource Sharing)

This trips up every developer eventually. Here's what's actually happening.

### The Same-Origin Policy

Browsers enforce a rule: JavaScript on `https://app.example.com` cannot make requests to `https://api.different.com`. Two URLs have the same origin only if protocol, domain, AND port all match.

This is a security feature. Without it, a malicious site could make requests to your bank using your session cookies.

### When CORS Kicks In

CORS is the mechanism for **relaxing** the same-origin policy in a controlled way. The server declares which origins are allowed to make cross-origin requests.

**Simple requests** (GET/POST with basic headers) work like this:

```
Browser → Server:
GET /api/data HTTP/1.1
Origin: https://app.example.com

Server → Browser:
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.example.com
[data]
```

**Preflight requests** — for methods like PUT/DELETE, or requests with custom headers, the browser first sends an `OPTIONS` request:

```
Browser → Server (preflight):
OPTIONS /api/users/42 HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: Authorization

Server → Browser:
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 86400

Browser → Server (actual request):
DELETE /api/users/42 HTTP/1.1
Origin: https://app.example.com
Authorization: Bearer ...
```

### Configuring CORS in Node.js/Express

```javascript
const express = require('express');
const app = express();

// Option 1: Simple setup with the cors package
const cors = require('cors');

app.use(cors({
  origin: ['https://app.example.com', 'https://staging.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,    // Allow cookies to be sent
  maxAge: 86400         // Cache preflight for 24h
}));

// Option 2: Manual middleware (so you understand what's happening)
app.use((req, res, next) => {
  const allowedOrigins = ['https://app.example.com'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin'); // Tell caches this response varies by origin
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
```

**Never use `Access-Control-Allow-Origin: *` with credentials.** Browsers block it. And be careful with `*` in production generally — it allows any site to make requests to your API.

---

## Web Security Basics

### HTTPS Everywhere

Serve everything over HTTPS. Use `Strict-Transport-Security` to prevent protocol downgrade attacks:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

This tells browsers to never try HTTP — always use HTTPS. Once you set this (especially with `preload`), it's very hard to undo, so make sure your whole site is HTTPS-ready first.

### Security Headers

Add these to every response:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

We'll cover each of these in depth in Module 18. For now, the most important one is **Content-Security-Policy (CSP)** — it tells the browser which sources of content are legitimate, blocking many XSS attacks.

### OWASP Top 10 Overview

The [OWASP Top 10](https://owasp.org/www-project-top-ten/) is a list of the most critical security risks. We'll go deep on these in Module 18, but at minimum you should be aware of:

1. **Injection** (SQL, command, LDAP) — never trust user input
2. **Broken Authentication** — weak session management, no MFA
3. **XSS** — injecting scripts into your pages
4. **Insecure Direct Object References** — `GET /invoices/1337` and you can see anyone's invoice
5. **Security Misconfiguration** — default passwords, unnecessary services, verbose error messages

---

## REST vs RPC

Two dominant philosophies for designing APIs.

### REST (Representational State Transfer)

REST is built around **resources** (nouns). You interact with resources using standard HTTP methods:

```
GET    /users          → list users
POST   /users          → create a user
GET    /users/42       → get user 42
PUT    /users/42       → replace user 42
PATCH  /users/42       → partially update user 42
DELETE /users/42       → delete user 42

GET    /users/42/posts → get posts belonging to user 42
```

REST is **stateless**: every request contains all information needed to process it. No server-side session state. This makes it easy to scale horizontally.

### RPC (Remote Procedure Call)

RPC is built around **actions** (verbs). You call procedures on the server:

```
POST /api  { "method": "getUser",    "params": { "id": 42 } }
POST /api  { "method": "createUser", "params": { "name": "Alice" } }
POST /api  { "method": "deleteUser", "params": { "id": 42 } }
```

**gRPC** is Google's modern RPC framework — strongly typed, uses Protocol Buffers, HTTP/2, excellent for microservice-to-microservice communication.

**tRPC** is popular in TypeScript ecosystems — end-to-end type safety between your Next.js frontend and Node.js backend without code generation.

### Which to Use

| Situation | Recommendation |
|-----------|---------------|
| Public API that third parties will use | REST |
| Internal microservices, high performance | gRPC |
| Full-stack TypeScript app | tRPC |
| Complex operations that don't map to CRUD | GraphQL or RPC-style |

The "resource vs action" distinction matters less than people argue. What matters is consistency. Pick one and be consistent.

---

## WebSockets Basics

HTTP is request/response — the client always initiates. WebSockets give you a persistent, **bidirectional** connection. The server can push data to the client at any time.

### How the Handshake Works

WebSockets start as an HTTP request and upgrade:

```
Client → Server:
GET /ws HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

Server → Client:
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

After this, the connection is open. Both sides can send **frames** at any time.

### Simple WebSocket Example

```javascript
// Server (Node.js with 'ws' library)
const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, req) => {
  console.log('Client connected from', req.socket.remoteAddress);

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    console.log('Received:', message);

    // Echo back with a timestamp
    ws.send(JSON.stringify({
      type: 'echo',
      data: message,
      timestamp: Date.now()
    }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });

  // Send a welcome message
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected!' }));
});

// Broadcast to all connected clients
function broadcast(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
```

```javascript
// Client (Browser)
const ws = new WebSocket('wss://yourserver.com/ws');

ws.addEventListener('open', () => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'subscribe', channel: 'prices' }));
});

ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
});

ws.addEventListener('close', (event) => {
  console.log('Disconnected:', event.code, event.reason);
  // Reconnect logic goes here
});

ws.addEventListener('error', (err) => {
  console.error('WebSocket error:', err);
});
```

### When to Use WebSockets

- Real-time features: chat, collaborative editing, live dashboards
- Games
- Live notifications

For simpler one-way server-to-client updates (price tickers, feeds), **Server-Sent Events (SSE)** are often a better fit — they work over regular HTTP, automatically reconnect, and are simpler to implement. We cover these in Module 17.

---

## JSON vs XML

Both are data serialization formats. JSON has largely won for web APIs, but XML still exists in many enterprise and legacy systems.

### JSON

```json
{
  "user": {
    "id": 42,
    "name": "Alice Chen",
    "email": "alice@example.com",
    "roles": ["admin", "editor"],
    "address": {
      "city": "San Francisco",
      "country": "US"
    },
    "active": true,
    "balance": 99.99
  }
}
```

Compact, readable, maps directly to JavaScript objects. Native `JSON.parse()` and `JSON.stringify()`. The default choice for REST APIs.

### XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<user id="42">
  <name>Alice Chen</name>
  <email>alice@example.com</email>
  <roles>
    <role>admin</role>
    <role>editor</role>
  </roles>
  <address city="San Francisco" country="US"/>
  <active>true</active>
  <balance>99.99</balance>
</user>
```

More verbose, but supports attributes, namespaces, schemas (XSD), transformations (XSLT), and has mature tooling. Still common in: SOAP web services, RSS feeds, SVG, Microsoft Office formats, configuration files.

### When You'll Encounter XML

- Third-party integrations with older enterprise systems
- Payment processor APIs (some still use SOAP)
- RSS/Atom feeds
- Android layout files
- Maven/Spring configuration

You'll spend 99% of your time writing JSON. But when XML shows up, don't panic — `DOMParser` in the browser and `xml2js` in Node.js handle it fine.

---

## Mini Project: Build an HTTP Inspector

This tiny project ties together everything in this module. It's a Node.js server that logs detailed information about every incoming request.

```javascript
// http-inspector.js
// Run with: node http-inspector.js
// Then visit http://localhost:3000 or use curl/Postman to test

const http = require('http');
const url = require('url');
const dns = require('dns').promises;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const clientIP = req.socket.remoteAddress;

  // Try to reverse DNS lookup the client
  let hostname = 'unknown';
  try {
    const result = await dns.reverse(clientIP);
    hostname = result[0] || 'unknown';
  } catch (e) {
    // Ignore — reverse DNS often fails
  }

  const requestInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    pathname: parsedUrl.pathname,
    query: parsedUrl.query,
    httpVersion: req.httpVersion,
    client: {
      ip: clientIP,
      hostname,
    },
    headers: req.headers,
    // Check for proxy headers
    realIP: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || clientIP,
  };

  // Read the request body if present
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    if (body) {
      try {
        requestInfo.body = JSON.parse(body);
      } catch (e) {
        requestInfo.body = body;
      }
    }

    // Log to console
    console.log('\n' + '='.repeat(60));
    console.log(JSON.stringify(requestInfo, null, 2));

    // Respond with the request info
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Powered-By': 'HTTP Inspector',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify(requestInfo, null, 2));
  });
});

server.listen(3000, () => {
  console.log('HTTP Inspector running on http://localhost:3000');
  console.log('Make requests and watch them get logged!\n');
  console.log('Try:');
  console.log('  curl http://localhost:3000/api/users?page=2');
  console.log('  curl -X POST -H "Content-Type: application/json" -d \'{"name":"Alice"}\' http://localhost:3000/users');
});
```

Try various requests against it and observe exactly what arrives at the server. This builds intuition that will serve you for years.

---

# Module 2: HTML — The Structure Layer

HTML is the skeleton of the web. It's often dismissed as easy, but bad HTML creates accessibility problems, kills SEO, and makes CSS and JavaScript harder to write. There's real craft here.

---

## HTML Document Structure

Every HTML document has a required structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Metadata — not visible on the page -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A page about building great web apps">
  <meta name="author" content="Alice Chen">

  <title>Page Title — Site Name</title>

  <!-- Preload critical resources -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/main.css">

  <!-- Favicons -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
<body>
  <!-- Visible content -->

  <!-- Scripts at end of body (or use defer/async in <head>) -->
  <script src="/js/main.js" defer></script>
</body>
</html>
```

### The `<head>` in Detail

**`<meta charset="UTF-8">`** — Must be the first thing in `<head>`, within the first 1024 bytes. Tells the browser the character encoding. UTF-8 supports every character in every language.

**`<meta name="viewport">`** — Critical for mobile. Without this, mobile browsers render the page at desktop width and scale it down. This tag tells them to use the device's actual width.

**`<title>`** — Shown in browser tabs, bookmark names, and search engine results. The `Page Title — Site Name` pattern is standard. Keep it under 60 characters.

### Script Loading Strategies

```html
<!-- Blocks HTML parsing — bad, don't do this in <head> without defer/async -->
<script src="app.js"></script>

<!-- defer: downloads in parallel, executes after HTML is parsed, in order -->
<script src="app.js" defer></script>

<!-- async: downloads in parallel, executes immediately when ready (out of order) -->
<script src="analytics.js" async></script>

<!-- module: always deferred, supports import/export -->
<script type="module" src="app.js"></script>
```

**Rule of thumb**: Use `defer` for your own scripts. Use `async` for independent third-party scripts (analytics, ads) where execution order doesn't matter.

---

## Semantic HTML

Semantic HTML uses elements that describe the **meaning** of content, not just its appearance. This matters for:

- **Accessibility**: screen readers use semantics to navigate and describe content
- **SEO**: search engines use semantics to understand page structure
- **Maintainability**: `<nav>` is clearer than `<div class="nav-container-wrapper">`

### Before and After

```html
<!-- Non-semantic: technically works, meaningless to machines -->
<div class="header">
  <div class="logo">MySite</div>
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
    <div class="nav-item"><a href="/about">About</a></div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="article-title">How to Build a Website</div>
    <div class="article-meta">By Alice · March 7, 2025</div>
    <div class="article-content">
      <div class="article-section">
        <div class="section-title">Getting Started</div>
        <div class="section-text">First, you'll need a text editor...</div>
      </div>
    </div>
  </div>
  <div class="sidebar">Related articles...</div>
</div>
<div class="footer">© 2025 MySite</div>
```

```html
<!-- Semantic: describes what everything IS -->
<header>
  <a href="/" class="logo">MySite</a>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <header>
      <h1>How to Build a Website</h1>
      <p>
        By <address><a rel="author" href="/authors/alice">Alice Chen</a></address>
        · <time datetime="2025-03-07">March 7, 2025</time>
      </p>
    </header>

    <section>
      <h2>Getting Started</h2>
      <p>First, you'll need a text editor...</p>
    </section>
  </article>

  <aside aria-label="Related articles">
    Related articles...
  </aside>
</main>

<footer>
  <p>© 2025 MySite</p>
</footer>
```

### Key Semantic Elements

```
Document structure:
  <header>    — Introductory content (for page or for a section)
  <nav>       — Navigation links
  <main>      — Dominant content (one per page)
  <article>   — Self-contained content (could be syndicated)
  <section>   — Thematic grouping of content (with a heading)
  <aside>     — Tangentially related content, sidebars
  <footer>    — Footer content

Text semantics:
  <h1>–<h6>   — Headings (document outline, not visual size)
  <p>          — Paragraph
  <strong>     — Important text (bold by default)
  <em>         — Emphasized text (italic by default)
  <mark>       — Highlighted/relevant text
  <time>       — Date/time (machine-readable with datetime attribute)
  <address>    — Contact information for nearest article/body ancestor
  <abbr>       — Abbreviation with title attribute
  <cite>       — Title of a creative work
  <blockquote> — Extended quotation
  <code>       — Inline code
  <pre>        — Preformatted text (whitespace preserved)
  <kbd>        — Keyboard input
  <var>        — Variable in math or programming
  <samp>       — Sample output

Media:
  <figure>     — Self-contained media with a caption
  <figcaption> — Caption for a <figure>

Interactive:
  <details>    — Disclosure widget
  <summary>    — Visible heading for <details>
  <dialog>     — Modal dialog
```

### Heading Hierarchy

Headings create the document outline. **Don't skip levels** — don't jump from `<h1>` to `<h3>`. Screen reader users navigate pages by jumping between headings.

```html
<h1>Web Development Guide</h1>           <!-- One per page -->
  <h2>Module 1: HTML</h2>
    <h3>Semantic Elements</h3>
    <h3>Forms</h3>
      <h4>Input Types</h4>
  <h2>Module 2: CSS</h2>
```

---

## Forms and Input Types

Forms are how users give you data. Getting them right matters for usability, accessibility, and mobile experience.

```html
<form action="/api/register" method="POST" novalidate>
  <!-- novalidate disables browser validation so we can do it ourselves,
       but we still use proper input types for mobile keyboards -->

  <fieldset>
    <legend>Personal Information</legend>

    <div class="field">
      <label for="fullname">Full name <span aria-hidden="true">*</span></label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        autocomplete="name"
        required
        minlength="2"
        maxlength="100"
        aria-required="true"
        aria-describedby="fullname-hint"
      >
      <span id="fullname-hint" class="hint">First and last name</span>
    </div>

    <div class="field">
      <label for="email">Email address</label>
      <input
        type="email"
        id="email"
        name="email"
        autocomplete="email"
        required
        inputmode="email"
        aria-required="true"
      >
    </div>

    <div class="field">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        autocomplete="new-password"
        required
        minlength="12"
        aria-describedby="password-requirements"
      >
      <ul id="password-requirements" class="hint">
        <li>At least 12 characters</li>
        <li>Include a number and symbol</li>
      </ul>
    </div>

    <div class="field">
      <label for="birthdate">Date of birth</label>
      <input
        type="date"
        id="birthdate"
        name="birthdate"
        autocomplete="bday"
        min="1900-01-01"
        max="2010-12-31"
      >
    </div>

    <div class="field">
      <label for="country">Country</label>
      <select id="country" name="country" autocomplete="country">
        <option value="">Select a country</option>
        <option value="US">United States</option>
        <option value="UK">United Kingdom</option>
        <option value="CA">Canada</option>
      </select>
    </div>

    <div class="field">
      <label for="bio">Bio</label>
      <textarea
        id="bio"
        name="bio"
        rows="4"
        maxlength="500"
        placeholder="Tell us a bit about yourself..."
        aria-describedby="bio-counter"
      ></textarea>
      <span id="bio-counter" class="hint">0 / 500</span>
    </div>
  </fieldset>

  <fieldset>
    <legend>Preferences</legend>

    <!-- Radio buttons: one value from a group -->
    <div class="field" role="group" aria-labelledby="plan-label">
      <span id="plan-label">Subscription plan</span>

      <label>
        <input type="radio" name="plan" value="free" checked>
        Free
      </label>
      <label>
        <input type="radio" name="plan" value="pro">
        Pro ($9/mo)
      </label>
    </div>

    <!-- Checkboxes: multiple values -->
    <div class="field">
      <label>
        <input type="checkbox" name="newsletter" value="yes">
        Subscribe to newsletter
      </label>
    </div>

    <div class="field">
      <label>
        <input type="checkbox" name="terms" required aria-required="true">
        I agree to the <a href="/terms">Terms of Service</a>
      </label>
    </div>
  </fieldset>

  <button type="submit">Create account</button>
</form>
```

### Input Types That Trigger Mobile Keyboards

```html
<!-- Standard text keyboard -->
<input type="text">

<!-- Email keyboard (@ symbol prominent) -->
<input type="email">

<!-- Number pad -->
<input type="tel">
<input type="number">

<!-- Decimal keyboard -->
<input inputmode="decimal">

<!-- URL keyboard (/ and .com prominent) -->
<input type="url">

<!-- Search keyboard (search button) -->
<input type="search">
```

Always use the right `type` — even if you do custom validation. The mobile keyboard experience alone is worth it.

---

## Accessibility (ARIA)

Accessibility isn't optional. It's a legal requirement in many countries (ADA in the US, EN 301 549 in the EU) and affects roughly 15% of the population.

### The Accessibility Tree

Alongside the DOM, browsers build an **accessibility tree** — a parallel structure that assistive technologies (screen readers, voice control software, braille displays) interact with.

Semantic HTML populates this tree automatically. `<button>` is already a button. `<h1>` is already a heading. ARIA (Accessible Rich Internet Applications) is for when native HTML semantics aren't enough.

### ARIA Roles, Properties, and States

```html
<!-- Roles: what is this element? -->
<div role="button" tabindex="0">Click me</div>  <!-- Better: just use <button> -->

<div role="alert" aria-live="assertive">
  Error: Invalid email address  <!-- Announced immediately by screen readers -->
</div>

<div role="status" aria-live="polite">
  Changes saved  <!-- Announced at next opportunity -->
</div>

<!-- Properties: describe the element -->
<input aria-label="Search the site">  <!-- Visible label not present -->
<input aria-labelledby="label-id">    <!-- Point to visible label element -->
<input aria-describedby="hint-id">   <!-- Point to description text -->
<input aria-required="true">
<input aria-invalid="true" aria-errormessage="error-id">

<!-- States: current condition (can change dynamically) -->
<button aria-expanded="false">Menu</button>
<button aria-pressed="true">Bold</button>
<li aria-selected="true">Option 1</li>
<div aria-hidden="true">Decorative content</div>  <!-- Hide from screen readers -->
<div aria-busy="true">Loading...</div>
```

### Practical Patterns

**Skip navigation** (critical for keyboard users):

```html
<!-- First element in body -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<header>...</header>

<main id="main-content" tabindex="-1">
  <!-- Content -->
</main>

<style>
.skip-link {
  position: absolute;
  transform: translateY(-100%);
  left: 1rem;
  top: 1rem;
  transition: transform 0.2s;
}
.skip-link:focus {
  transform: translateY(0);
  background: white;
  padding: 0.5rem 1rem;
  z-index: 1000;
}
</style>
```

**Accessible modal**:

```html
<dialog
  id="confirm-modal"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">Delete account</h2>
  <p id="modal-desc">
    This will permanently delete your account and all associated data.
    This cannot be undone.
  </p>
  <button onclick="document.getElementById('confirm-modal').close()">Cancel</button>
  <button onclick="deleteAccount()">Delete account</button>
</dialog>
```

The `<dialog>` element handles focus trapping, escape key, and ARIA attributes automatically. Use it instead of building your own.

**Focus management for dynamic content**:

```javascript
// When showing an error or dynamic content, move focus to it
function showError(message) {
  const errorEl = document.getElementById('error-message');
  errorEl.textContent = message;
  errorEl.removeAttribute('hidden');
  errorEl.focus(); // Move keyboard focus here
}
```

### The Four Principles (POUR)

Good accessibility follows POUR:

- **Perceivable**: Users can perceive all content (alt text, captions, sufficient contrast)
- **Operable**: Everything is keyboard navigable, no timing traps
- **Understandable**: Clear language, predictable behavior, helpful error messages
- **Robust**: Works with current and future assistive technologies

---

## Meta Tags & SEO Basics

```html
<head>
  <!-- Basic SEO -->
  <title>How to Build a REST API in Node.js — DevGuide</title>
  <meta name="description" content="Step-by-step tutorial for building a production-ready REST API with Node.js, Express, and PostgreSQL. Includes authentication, validation, and deployment.">
  <link rel="canonical" href="https://devguide.io/rest-api-nodejs">

  <!-- Open Graph (Facebook, LinkedIn, Slack previews) -->
  <meta property="og:title" content="How to Build a REST API in Node.js">
  <meta property="og:description" content="Step-by-step tutorial for building a production-ready REST API...">
  <meta property="og:image" content="https://devguide.io/og/rest-api-nodejs.png">
  <meta property="og:url" content="https://devguide.io/rest-api-nodejs">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="DevGuide">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@devguide">
  <meta name="twitter:title" content="How to Build a REST API in Node.js">
  <meta name="twitter:description" content="Step-by-step tutorial...">
  <meta name="twitter:image" content="https://devguide.io/og/rest-api-nodejs.png">

  <!-- Article-specific -->
  <meta property="article:published_time" content="2025-03-07T00:00:00Z">
  <meta property="article:author" content="https://devguide.io/authors/alice">
</head>
```

### What Actually Affects Rankings

Search engines are opaque, but some things are well-established:

- **Page speed** — Core Web Vitals (LCP, CLS, FID/INP) are ranking factors
- **Mobile usability** — Google indexes mobile-first
- **Semantic HTML** — Helps Google understand your content structure
- **Internal linking** — Helps Google discover and understand relationships between pages
- **Title and description** — These appear in search results; write them for humans
- **Structured data** — Enables rich results (star ratings, FAQs, recipes in search results)

What doesn't matter as much as people think: keyword density, meta keywords (ignored), H1 count (one is fine, not mandatory).

---

## Images & Media

```html
<!-- Basic image with required alt text -->
<img src="hero.jpg" alt="Engineer reviewing code on dual monitors in a modern office">

<!-- Decorative image: empty alt so screen readers skip it -->
<img src="divider.svg" alt="">

<!-- Responsive image: different sizes for different screens -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  alt="Team photo from the 2024 offsite"
  width="800"
  height="533"
  loading="lazy"
  decoding="async"
>

<!-- Modern format with fallback -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="..." width="1200" height="800">
</picture>

<!-- Art direction: different image for mobile vs desktop -->
<picture>
  <source
    media="(min-width: 800px)"
    srcset="hero-desktop.webp"
  >
  <img src="hero-mobile.webp" alt="..." width="400" height="400">
</picture>

<!-- Video -->
<video
  controls
  width="1280"
  height="720"
  poster="thumbnail.jpg"
  preload="metadata"
>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="captions.vtt" srclang="en" label="English" default>
  <!-- Fallback for browsers that don't support video -->
  <p>Your browser doesn't support HTML5 video. <a href="video.mp4">Download it</a>.</p>
</video>
```

**Always specify `width` and `height`** on images — even for responsive images. This prevents layout shift (a Core Web Vitals metric) because the browser reserves space before the image loads.

**`loading="lazy"`** defers loading offscreen images until the user scrolls near them. Use this for everything below the fold.

---

## HTML Performance Best Practices

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- 1. Preconnect to external origins you'll use soon -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- 2. Preload critical resources -->
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/css/critical.css" as="style">

  <!-- 3. Critical CSS inline (eliminates render-blocking) -->
  <style>
    /* Just what's needed for above-the-fold content */
    body { margin: 0; font-family: Inter, sans-serif; }
    header { background: #1a1a2e; color: white; padding: 1rem; }
  </style>

  <!-- 4. Main stylesheet loads non-blocking with this trick -->
  <link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="/css/main.css"></noscript>

  <!-- 5. Prefetch next-page resources -->
  <link rel="prefetch" href="/js/dashboard.js">

  <title>...</title>
</head>
<body>
  <!-- 6. Above-the-fold images: don't lazy load -->
  <img src="hero.jpg" alt="..." width="1200" height="600">

  <!-- 7. Below-the-fold images: lazy load -->
  <img src="feature.jpg" alt="..." loading="lazy" width="600" height="400">

  <!-- 8. Scripts at the end with defer/async -->
  <script src="/js/app.js" defer></script>
  <script src="https://analytics.example.com/analytics.js" async></script>
</body>
</html>
```

---

## Mini Project: Semantic Blog Article Page

Here's a complete, accessible, well-structured HTML page — no CSS yet, just clean markup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A deep dive into how JavaScript's event loop works, with visual diagrams and real-world examples.">

  <title>Understanding the JavaScript Event Loop — DevGuide</title>

  <link rel="canonical" href="https://devguide.io/javascript-event-loop">

  <meta property="og:title" content="Understanding the JavaScript Event Loop">
  <meta property="og:description" content="A deep dive into how JavaScript's event loop works.">
  <meta property="og:image" content="https://devguide.io/og/event-loop.png">
  <meta property="og:type" content="article">

  <!-- Structured data for rich search results -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Understanding the JavaScript Event Loop",
    "description": "A deep dive into how JavaScript's event loop works",
    "author": {
      "@type": "Person",
      "name": "Alice Chen",
      "url": "https://devguide.io/authors/alice"
    },
    "datePublished": "2025-03-07",
    "dateModified": "2025-03-07",
    "publisher": {
      "@type": "Organization",
      "name": "DevGuide",
      "url": "https://devguide.io"
    }
  }
  </script>
</head>
<body>

  <!-- Skip to main content for keyboard users -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header>
    <a href="/" aria-label="DevGuide — home">
      <span aria-hidden="true">⚡</span> DevGuide
    </a>

    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/tutorials">Tutorials</a></li>
        <li><a href="/reference">Reference</a></li>
        <li><a href="/newsletter">Newsletter</a></li>
      </ul>
    </nav>

    <button type="button" aria-expanded="false" aria-controls="search-panel">
      Search
    </button>
  </header>

  <div id="search-panel" hidden role="search">
    <form action="/search">
      <label for="site-search">Search DevGuide</label>
      <input
        type="search"
        id="site-search"
        name="q"
        placeholder="e.g. async/await, closures..."
        autocomplete="off"
      >
      <button type="submit">Search</button>
    </form>
  </div>

  <div class="layout">

    <main id="main-content" tabindex="-1">

      <article>
        <header>
          <nav aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/tutorials">Tutorials</a></li>
              <li><a href="/tutorials/javascript">JavaScript</a></li>
              <li aria-current="page">Event Loop</li>
            </ol>
          </nav>

          <div class="tags" aria-label="Article tags">
            <a href="/tag/javascript" rel="tag">JavaScript</a>
            <a href="/tag/async" rel="tag">Async</a>
            <a href="/tag/performance" rel="tag">Performance</a>
          </div>

          <h1>Understanding the JavaScript Event Loop</h1>

          <p class="subtitle">
            Why your code runs in an order you didn't expect — and how to use
            that to your advantage.
          </p>

          <div class="byline">
            <img
              src="/authors/alice-chen.jpg"
              alt=""
              width="48"
              height="48"
              aria-hidden="true"
            >
            <div>
              By <a href="/authors/alice" rel="author">Alice Chen</a>
              <br>
              <time datetime="2025-03-07">March 7, 2025</time>
              · 12 min read
              · Updated <time datetime="2025-03-10">March 10, 2025</time>
            </div>
          </div>
        </header>

        <!-- Table of contents -->
        <nav aria-labelledby="toc-heading">
          <h2 id="toc-heading">Contents</h2>
          <ol>
            <li><a href="#the-single-thread">The Single Thread</a></li>
            <li><a href="#call-stack">The Call Stack</a></li>
            <li><a href="#event-loop">The Event Loop</a></li>
            <li><a href="#microtasks">Microtasks vs Macrotasks</a></li>
            <li><a href="#real-world">Real-World Implications</a></li>
          </ol>
        </nav>

        <!-- Article body -->
        <section id="the-single-thread">
          <h2>The Single Thread</h2>
          <p>
            JavaScript runs on a single thread. One operation at a time, no
            exceptions. This seems like a severe limitation — but the event loop
            makes it work remarkably well for I/O-heavy applications like web UIs.
          </p>

          <figure>
            <img
              src="/images/single-thread-diagram.png"
              alt="Diagram showing JavaScript's single thread processing one task at a time, compared to multi-threaded languages handling multiple tasks simultaneously"
              width="800"
              height="400"
              loading="lazy"
            >
            <figcaption>
              JavaScript's single thread vs multi-threaded execution.
              While one thread handles tasks sequentially, the event loop
              ensures I/O operations don't block it.
            </figcaption>
          </figure>
        </section>

        <section id="call-stack">
          <h2>The Call Stack</h2>
          <p>
            When your code calls a function, it goes onto the call stack.
            When a function returns, it comes off the stack.
          </p>

          <figure>
            <pre><code>function greet(name) {
  return `Hello, ${name}`;
}

function main() {
  const message = greet('World');
  console.log(message);
}

main();</code></pre>
            <figcaption>
              <code>main()</code> is pushed first, then <code>greet()</code>,
              then <code>console.log()</code>. Each pops off when it returns.
            </figcaption>
          </figure>

          <p>
            If the call stack gets too deep (infinite recursion, for example),
            you get a <strong>stack overflow</strong>. Modern engines typically
            allow 10,000–15,000 stack frames before throwing a
            <code>RangeError: Maximum call stack size exceeded</code>.
          </p>
        </section>

        <!-- Comments section -->
        <section aria-labelledby="comments-heading">
          <h2 id="comments-heading">Comments <span>(24)</span></h2>

          <form aria-label="Post a comment" novalidate>
            <div class="field">
              <label for="comment-name">Name</label>
              <input type="text" id="comment-name" name="name" required autocomplete="name">
            </div>
            <div class="field">
              <label for="comment-body">Comment</label>
              <textarea
                id="comment-body"
                name="body"
                required
                rows="5"
                maxlength="2000"
              ></textarea>
            </div>
            <button type="submit">Post comment</button>
          </form>

          <ol aria-label="Comments" class="comments">
            <li id="comment-1">
              <article aria-labelledby="comment-1-author">
                <header>
                  <strong id="comment-1-author">Bob Smith</strong>
                  <time datetime="2025-03-08T14:22:00Z">March 8, 2025</time>
                </header>
                <p>Great explanation! The microtask/macrotask distinction finally clicked for me.</p>
                <footer>
                  <button type="button" aria-label="Reply to Bob Smith">Reply</button>
                  <button type="button" aria-label="Like Bob Smith's comment (12 likes)" aria-pressed="false">
                    ♥ 12
                  </button>
                </footer>
              </article>
            </li>
          </ol>
        </section>
      </article>

    </main>

    <aside aria-labelledby="sidebar-heading">
      <h2 id="sidebar-heading">Related articles</h2>
      <nav aria-label="Related articles">
        <ul>
          <li>
            <a href="/async-await">
              <article>
                <h3>Async/Await Deep Dive</h3>
                <p>The syntax that made promises readable.</p>
              </article>
            </a>
          </li>
          <li>
            <a href="/web-workers">
              <article>
                <h3>Web Workers</h3>
                <p>Escape the single thread for CPU-intensive work.</p>
              </article>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

  </div>

  <footer>
    <nav aria-label="Footer navigation">
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/rss.xml" type="application/rss+xml">RSS Feed</a></li>
      </ul>
    </nav>
    <p>
      <small>© 2025 DevGuide. Written by developers, for developers.</small>
    </p>
  </footer>

</body>
</html>
```

This is the kind of HTML that makes accessibility auditors happy, search engines understand your content, and future developers (including you) appreciate.

---

# Module 3: CSS — Styling and Layout

CSS has a reputation for being deceptively tricky. You can write CSS that works in one browser and breaks in another, works on one screen size and collapses on another, styles one element and accidentally styles a hundred others. This module builds the mental models that prevent those problems.

---

## CSS Fundamentals

### How CSS Works

A CSS rule has two parts: a **selector** (which elements to target) and a **declaration block** (what to do to them):

```css
/* selector    property   value */
   h1        { color:     #1a1a2e; }

/* Multiple declarations */
.card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

CSS is applied **in cascade** — if multiple rules target the same element and set the same property, the winner is determined by: importance → specificity → order in source.

---

## Selectors

```css
/* ——— Basic selectors ——— */
*             { }  /* Universal: every element */
div           { }  /* Type: all <div> elements */
.card         { }  /* Class */
#header       { }  /* ID (avoid for styling — high specificity) */

/* ——— Combinators ——— */
nav a         { }  /* Descendant: <a> anywhere inside <nav> */
nav > a       { }  /* Child: <a> that is a direct child of <nav> */
h1 + p        { }  /* Adjacent sibling: <p> immediately after <h1> */
h1 ~ p        { }  /* General sibling: all <p> after <h1> */

/* ——— Attribute selectors ——— */
[type="text"]      { }  /* Exact attribute value */
[href^="https"]    { }  /* Starts with */
[href$=".pdf"]     { }  /* Ends with */
[class*="icon-"]   { }  /* Contains */

/* ——— Pseudo-classes ——— */
a:hover            { }  /* Mouse over */
a:focus            { }  /* Keyboard focus */
a:focus-visible    { }  /* Focus via keyboard (not mouse) */
a:active           { }  /* Being clicked */
a:visited          { }  /* Already visited */

button:disabled    { }
input:checked      { }
input:valid        { }
input:invalid      { }
input:placeholder-shown { }

li:first-child     { }
li:last-child      { }
li:nth-child(2)    { }   /* Specific index */
li:nth-child(odd)  { }
li:nth-child(2n+1) { }   /* Every other, starting at 1 */
li:nth-child(3n)   { }   /* Every 3rd */
li:not(.disabled)  { }   /* Negation */

/* ——— Pseudo-elements ——— */
p::before          { content: ''; }  /* Before content */
p::after           { content: ''; }  /* After content */
p::first-line      { }
p::first-letter    { }
::placeholder      { }  /* Input placeholder text */
::selection        { }  /* Selected text */
::marker           { }  /* List bullet/number */
```

---

## Specificity

Specificity determines which rule wins when two rules target the same element. It's calculated as a score:

```
Specificity = (inline styles, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements)
              (      1       ,  x ,               y                  ,            z           )
```

Higher numbers in earlier columns win:

```css
/* 0,0,0,1 — element */
p { color: blue; }

/* 0,0,1,0 — class */
.text { color: red; }

/* 0,0,1,1 — class + element */
p.text { color: green; }

/* 0,1,0,0 — ID */
#intro { color: orange; }

/* 0,1,1,0 — ID + class */
#intro .text { color: purple; }
```

```html
<!-- Which color? -->
<p id="intro" class="text">Hello</p>
<!-- Answer: orange — ID wins (0,1,0,0 > 0,0,1,1) -->
```

**!important** overrides everything:
```css
p { color: red !important; } /* Always wins (except another !important) */
```

Avoid `!important` except for utilities. It creates a specificity war that's hard to win out of.

### Practical Specificity Advice

Keep specificity low and consistent. Prefer classes over IDs for styling. Prefer single classes over long selectors. This makes overriding predictable:

```css
/* Low specificity: easy to override */
.button { }
.button-primary { }

/* High specificity: hard to override */
nav > ul > li > a.button.button-primary { }
```

---

## The Box Model

Every element on a page is a rectangular box with four layers:

```
┌─────────────────────────────────┐
│           margin                │  Space outside the border
│  ┌───────────────────────────┐  │
│  │         border            │  │  The visible border
│  │  ┌─────────────────────┐  │  │
│  │  │      padding        │  │  │  Space inside the border
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │    content    │  │  │  │  Your actual content
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**The gotcha**: by default (`box-sizing: content-box`), `width` applies to the content area only. Add padding and border, and the element gets bigger than you specified.

Always use `border-box`:

```css
/* Reset at the top of every stylesheet */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Now `width: 300px` means the entire element (border + padding + content) is 300px wide. This is what you expect.

```css
.box {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}

/* With content-box: actual rendered width = 300 + 20 + 20 + 2 + 2 = 344px */
/* With border-box:  actual rendered width = 300px (padding+border counted inside) */
```

---

## Units

```css
/* ——— Absolute ——— */
px   /* Pixels. Not actually screen pixels anymore — 1px = 1/96in in CSS */
pt   /* Points (1pt = 1/72in). Use only for print */

/* ——— Relative to font size ——— */
em   /* Relative to the element's own font-size */
     /* If element has font-size: 20px, then 1em = 20px, 2em = 40px */
     /* Compounding: nested elements multiply their em values */

rem  /* Relative to the root <html> element's font-size */
     /* Usually 16px by default. 1rem = 16px, 2rem = 32px */
     /* Predictable, no compounding — prefer rem for text */

/* ——— Relative to viewport ——— */
vw   /* 1% of viewport width */
vh   /* 1% of viewport height */
vmin /* 1% of smaller dimension */
vmax /* 1% of larger dimension */
dvh  /* Dynamic viewport height (excludes mobile browser chrome) */
     /* Use dvh for full-screen mobile sections, not vh */

/* ——— Percentage ——— */
%    /* Relative to parent element (for width/height/padding) */
     /* For font-size: relative to inherited font-size */

/* ——— Modern ——— */
ch   /* Width of the "0" character — useful for readable line lengths */
lh   /* Line height of the element */
```

**Practical rules**:
- Use `rem` for font sizes and most spacing
- Use `px` for borders, box shadows, and things that shouldn't scale with font size
- Use `%` or `fr` for layout widths
- Use `em` for padding/margin on components that should scale with their own text
- Use `ch` for text container widths (45–75ch is the optimal reading line length)

---

## Colors and Typography

```css
/* ——— Color formats ——— */
color: red;                    /* Named */
color: #1a1a2e;                /* Hex */
color: #1a1a2e80;              /* Hex with alpha */
color: rgb(26, 26, 46);        /* RGB */
color: rgba(26, 26, 46, 0.5);  /* RGBA */
color: hsl(240, 28%, 14%);     /* HSL (Hue 0-360, Saturation %, Lightness %) */
color: hsla(240, 28%, 14%, 0.5);
color: oklch(0.3 0.05 264);   /* OKLCh: perceptually uniform, modern */

/* ——— Typography ——— */
font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
/* Always list fallbacks. system-ui uses the OS default font. */

font-size: 1rem;       /* Base size */
font-weight: 400;      /* 100-900. 400=normal, 700=bold */
font-style: italic;
line-height: 1.6;      /* Unitless is best — 1.6 = 160% of font-size */
letter-spacing: 0.01em;
text-transform: uppercase;
text-decoration: underline;
text-align: left;

/* Variable fonts (one file, many weights/styles) */
font-weight: 100 900;  /* Range supported */

/* ——— Web fonts ——— */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;  /* Show fallback font while loading, swap when ready */
}
```

**`font-display: swap`** is important for performance. Without it, text is invisible while the web font loads (Flash of Invisible Text). With `swap`, users see text in the fallback font immediately.

---

## Layout: Flexbox

Flexbox is for **one-dimensional layout** — either a row or a column.

```css
.container {
  display: flex;

  /* Direction */
  flex-direction: row;          /* Default: left to right */
  flex-direction: column;       /* Top to bottom */
  flex-direction: row-reverse;
  flex-direction: column-reverse;

  /* Wrapping */
  flex-wrap: nowrap;   /* Default: everything in one line */
  flex-wrap: wrap;     /* Overflow to next line */

  /* Main axis alignment (flex-direction's direction) */
  justify-content: flex-start;    /* Default */
  justify-content: flex-end;
  justify-content: center;
  justify-content: space-between; /* Items spread out, no space at edges */
  justify-content: space-around;  /* Equal space around each item */
  justify-content: space-evenly;  /* Equal space between and at edges */

  /* Cross axis alignment (perpendicular to flex-direction) */
  align-items: stretch;     /* Default: fill cross-axis */
  align-items: flex-start;
  align-items: flex-end;
  align-items: center;
  align-items: baseline;    /* Align by text baseline */

  /* Gap between items */
  gap: 1rem;            /* Both row and column */
  gap: 1rem 2rem;       /* row-gap column-gap */
}

/* Child properties */
.item {
  flex-grow: 0;    /* How much to grow to fill available space */
  flex-shrink: 1;  /* How much to shrink when not enough space */
  flex-basis: auto;/* Starting size before grow/shrink */

  /* Shorthand */
  flex: 1;         /* flex: 1 1 0 — take equal share of space */
  flex: 0 0 200px; /* Fixed 200px, don't grow or shrink */
  flex: auto;      /* flex: 1 1 auto */

  /* Override container alignment for this item */
  align-self: center;

  /* Reorder visually (doesn't affect DOM/tab order) */
  order: -1;  /* Move to front */
}
```

### Real-World Flexbox Patterns

```css
/* ——— Holy grail header ——— */
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 2rem;
}
.header .logo { margin-right: auto; }  /* Push nav and button to the right */
/* Logo | ... gap ... | Nav | | Button */

/* ——— Equal-height cards ——— */
.card-row {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;  /* All cards same height */
}
.card { flex: 1; }  /* Equal widths */

/* ——— Centering ——— */
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ——— Sticky footer ——— */
body {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
main { flex: 1; }  /* Grow to fill space, pushing footer down */
```

---

## Layout: CSS Grid

CSS Grid is for **two-dimensional layout** — rows and columns simultaneously.

```css
.grid {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 1fr 1fr;     /* Fixed + flexible */
  grid-template-columns: repeat(3, 1fr);    /* 3 equal columns */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive */

  /* Define rows */
  grid-template-rows: auto;         /* Let content determine height */
  grid-template-rows: 100px 1fr;    /* Fixed header, flexible content */

  /* Gaps */
  gap: 1.5rem;
  gap: 1rem 2rem;  /* row-gap column-gap */

  /* Named template areas */
  grid-template-areas:
    "header header header"
    "sidebar main   main  "
    "footer  footer footer";
}

/* Place items in named areas */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Manual placement */
.hero {
  grid-column: 1 / -1;     /* Span all columns (start at 1, end at last) */
  grid-column: 2 / 4;      /* From line 2 to line 4 */
  grid-column: span 2;     /* Span 2 columns from current position */
  grid-row: 1 / 3;         /* Span rows 1–3 */
}
```

### The `fr` Unit

`fr` (fraction) is Grid's superpower. `1fr` means "one part of the remaining space."

```css
/* 3 equal columns */
grid-template-columns: 1fr 1fr 1fr;

/* Sidebar + content, sidebar is 1/4 of the width */
grid-template-columns: 1fr 3fr;

/* Fixed sidebar + flexible main */
grid-template-columns: 250px 1fr;
```

### Responsive Grid Without Media Queries

```css
/* Cards auto-arrange in as many columns as fit, min 250px each */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
```

This is one of the most useful CSS tricks ever. At large viewports, you might get 4 columns. At medium, 3. At small, 2. At tiny, 1. No media queries at all.

---

## Positioning

```css
position: static;    /* Default: in normal flow */
position: relative;  /* Offset from its normal position; establishes stacking context */
position: absolute;  /* Positioned relative to nearest positioned ancestor */
position: fixed;     /* Positioned relative to viewport; stays on scroll */
position: sticky;    /* Relative until scroll threshold, then fixed */

/* Used with relative/absolute/fixed/sticky: */
top: 0;
right: 0;
bottom: 0;
left: 0;
inset: 0;          /* Shorthand for all four */
z-index: 10;       /* Stacking order (only works on positioned elements) */
```

```css
/* Common pattern: overlay a child on parent */
.card {
  position: relative;  /* Positioning context for children */
}
.card-badge {
  position: absolute;
  top: -8px;
  right: -8px;
}

/* Sticky header */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
}

/* Sticky table headers */
th {
  position: sticky;
  top: 0;
  background: inherit;  /* Important — transparent by default */
}

/* Fixed overlay */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
}
```

---

## Responsive Design & Media Queries

```css
/* ——— Breakpoints ——— */
/* Mobile first: base styles are mobile, add complexity for larger screens */

/* Base: mobile (< 640px assumed) */
.container { padding: 1rem; }
.nav { display: none; } /* Mobile: hide desktop nav */
.hamburger { display: block; }

/* Small tablet and up */
@media (min-width: 640px) {
  .container { padding: 1.5rem; }
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Tablet and up */
@media (min-width: 768px) {
  .layout {
    display: grid;
    grid-template-columns: 240px 1fr;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
  .nav { display: flex; } /* Show desktop nav */
  .hamburger { display: none; }
}

/* Large desktop */
@media (min-width: 1280px) {
  .card-grid { grid-template-columns: repeat(4, 1fr); }
}

/* ——— Other media features ——— */

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f0f13;
    --color-text: #e8e8f0;
  }
}

/* Reduced motion — always respect this */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode */
@media (forced-colors: active) {
  .button { border: 2px solid ButtonText; }
}

/* Print styles */
@media print {
  nav, aside, .ads { display: none; }
  a[href]::after { content: " (" attr(href) ")"; }
}
```

---

## CSS Custom Properties (Variables)

```css
/* Define on :root to make globally available */
:root {
  /* Design tokens */
  --color-brand: #6366f1;
  --color-brand-dark: #4f46e5;
  --color-text: #1a1a2e;
  --color-text-muted: #6b7280;
  --color-bg: #ffffff;
  --color-bg-subtle: #f9fafb;
  --color-border: #e5e7eb;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', 'Cascadia Code', monospace;

  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-8: 2rem;

  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #e8e8f0;
    --color-bg: #0f0f13;
    --color-bg-subtle: #1a1a24;
    --color-border: #2d2d40;
  }
}

/* Manual dark mode via class */
.dark {
  --color-text: #e8e8f0;
  --color-bg: #0f0f13;
}

/* Use variables */
.button {
  background: var(--color-brand);
  color: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
  transition: background var(--transition-fast);
}

.button:hover {
  background: var(--color-brand-dark);
}

/* Variables with fallback */
color: var(--color-custom, var(--color-text));
/* If --color-custom not defined, use --color-text */
```

---

## Animations and Transitions

```css
/* ——— Transitions: smooth property changes ——— */
.button {
  background: var(--color-brand);
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
  /* Transition specific properties */
  transition:
    background 150ms ease,
    transform 150ms ease,
    box-shadow 150ms ease;
}

.button:hover {
  background: var(--color-brand-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ——— Keyframe animations ——— */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

/* Apply animations */
.card {
  animation: fadeIn 300ms ease forwards;
  animation-delay: 100ms;       /* Wait before starting */
  animation-fill-mode: both;    /* Apply from/to styles outside active period */
}

.spinner {
  animation: spin 800ms linear infinite;
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* ——— Performance tip ——— */
/* Only animate/transition these properties — they're handled by the GPU compositor */
/* and don't trigger layout or paint: */
transform: translateX/Y/Z(), rotate(), scale(), skew()
opacity

/* These force layout recalculation on every frame — avoid for animation: */
/* width, height, top, left, margin, padding, font-size */
```

---

## BEM Methodology

BEM (Block-Element-Modifier) is a naming convention that prevents specificity wars and makes the relationship between classes explicit.

```
Block:    Standalone component   .card
Element:  Part of a block        .card__title
Modifier: Variant of a block     .card--featured
          or element             .card__title--truncated
```

```html
<article class="card card--featured">
  <img class="card__image" src="..." alt="...">
  <div class="card__body">
    <span class="card__tag">Tutorial</span>
    <h2 class="card__title card__title--truncated">
      How to Build a REST API
    </h2>
    <p class="card__excerpt">...</p>
  </div>
  <footer class="card__footer">
    <div class="card__author">
      <img class="card__avatar" src="..." alt="...">
      <span class="card__author-name">Alice Chen</span>
    </div>
    <time class="card__date" datetime="2025-03-07">March 7</time>
  </footer>
</article>
```

```css
/* All selectors are single classes — maximum 0,1,0,0 specificity */
.card { }
.card--featured { }
.card__image { }
.card__body { }
.card__title { }
.card__title--truncated {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

Every rule is a single class. No nesting, no combinators, no specificity issues. Easy to reason about, easy to override.

---

## Modern CSS: Container Queries

Media queries respond to the **viewport** size. Container queries respond to the **parent element's** size. This is huge for reusable components.

```css
/* Make the card container a "containment context" */
.card-wrapper {
  container-type: inline-size;
  container-name: card;   /* Optional name for multi-container scenarios */
}

/* Style the card based on ITS container, not the viewport */
.card {
  display: flex;
  flex-direction: column;
}

@container card (min-width: 500px) {
  .card {
    flex-direction: row;  /* Horizontal layout when container is wide enough */
  }
  .card__image {
    width: 200px;
    flex-shrink: 0;
  }
}
```

Now the card can be placed in a narrow sidebar or a wide main area, and it adapts automatically without any media queries or JavaScript.

---

## Mini Project: Responsive Dashboard Layout

A CSS-only responsive dashboard with everything we've covered:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Analytics Dashboard</title>
  <style>
    /* ——— Custom Properties ——— */
    :root {
      --sidebar-width: 250px;
      --header-height: 64px;

      --color-brand: #6366f1;
      --color-brand-light: #818cf8;
      --color-bg: #f8fafc;
      --color-surface: #ffffff;
      --color-text: #1e293b;
      --color-text-muted: #64748b;
      --color-border: #e2e8f0;

      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
      --shadow-md: 0 4px 12px rgba(0,0,0,0.08);

      --radius: 12px;
      --transition: 200ms ease;

      --font: 'Inter', system-ui, -apple-system, sans-serif;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --color-bg: #0f172a;
        --color-surface: #1e293b;
        --color-text: #f1f5f9;
        --color-text-muted: #94a3b8;
        --color-border: #334155;
      }
    }

    /* ——— Reset ——— */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--font);
      background: var(--color-bg);
      color: var(--color-text);
      line-height: 1.6;
      min-height: 100dvh;
    }

    /* ——— Layout ——— */
    .dashboard {
      display: grid;
      grid-template-columns: var(--sidebar-width) 1fr;
      grid-template-rows: var(--header-height) 1fr;
      grid-template-areas:
        "sidebar header"
        "sidebar main";
      min-height: 100dvh;
    }

    @media (max-width: 768px) {
      .dashboard {
        grid-template-columns: 1fr;
        grid-template-rows: var(--header-height) 1fr auto;
        grid-template-areas:
          "header"
          "main"
          "sidebar";
      }
    }

    /* ——— Sidebar ——— */
    .sidebar {
      grid-area: sidebar;
      background: var(--color-surface);
      border-right: 1px solid var(--color-border);
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: sticky;
      top: 0;
      height: 100dvh;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .sidebar {
        position: static;
        height: auto;
        flex-direction: row;
        overflow-x: auto;
        padding: 0.75rem;
        border-right: none;
        border-top: 1px solid var(--color-border);
      }
    }

    .sidebar__logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-brand);
      padding: 0 0.5rem;
      margin-bottom: 1rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 768px) {
      .sidebar__logo { display: none; }
    }

    .nav__item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.75rem;
      border-radius: 8px;
      color: var(--color-text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background var(--transition), color var(--transition);
      white-space: nowrap;
    }

    .nav__item:hover {
      background: var(--color-bg);
      color: var(--color-text);
    }

    .nav__item--active {
      background: #eef2ff;
      color: var(--color-brand);
    }

    @media (prefers-color-scheme: dark) {
      .nav__item--active { background: rgba(99,102,241,0.15); }
    }

    .nav__icon { width: 18px; height: 18px; flex-shrink: 0; }

    /* ——— Header ——— */
    .header {
      grid-area: header;
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .header__title {
      font-size: 1rem;
      font-weight: 600;
    }

    .header__actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--color-brand);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
    }

    /* ——— Main content ——— */
    .main {
      grid-area: main;
      padding: 2rem;
      overflow-y: auto;
    }

    @media (max-width: 640px) {
      .main { padding: 1rem; }
    }

    /* ——— Stat cards ——— */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      transition: transform var(--transition), box-shadow var(--transition);
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .stat-card__label {
      font-size: 0.8125rem;
      color: var(--color-text-muted);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .stat-card__value {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .stat-card__change {
      font-size: 0.8125rem;
      font-weight: 500;
    }

    .stat-card__change--up   { color: #10b981; }
    .stat-card__change--down { color: #ef4444; }

    /* ——— Section titles ——— */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .section-title {
      font-size: 1rem;
      font-weight: 600;
    }

    /* ——— Table ——— */
    .table-wrapper {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .table th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 500;
      color: var(--color-text-muted);
      border-bottom: 1px solid var(--color-border);
      background: var(--color-bg);
      white-space: nowrap;
    }

    .table td {
      padding: 0.875rem 1rem;
      border-bottom: 1px solid var(--color-border);
    }

    .table tbody tr:last-child td { border-bottom: none; }

    .table tbody tr:hover { background: var(--color-bg); }

    /* ——— Badge ——— */
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.2em 0.6em;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .badge--success { background: #dcfce7; color: #166534; }
    .badge--warning { background: #fef9c3; color: #854d0e; }
    .badge--danger  { background: #fee2e2; color: #991b1b; }

    @media (prefers-color-scheme: dark) {
      .badge--success { background: rgba(16,185,129,0.15); color: #4ade80; }
      .badge--warning { background: rgba(234,179,8,0.15); color: #facc15; }
      .badge--danger  { background: rgba(239,68,68,0.15); color: #f87171; }
    }

    /* ——— Button ——— */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: background var(--transition), transform var(--transition);
    }

    .btn:active { transform: scale(0.97); }

    .btn--primary {
      background: var(--color-brand);
      color: white;
    }

    .btn--primary:hover { background: #4f46e5; }

    .btn--ghost {
      background: transparent;
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
    }

    .btn--ghost:hover {
      background: var(--color-bg);
      color: var(--color-text);
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>

<div class="dashboard">

  <!-- Sidebar -->
  <nav class="sidebar" aria-label="Main navigation">
    <a href="/" class="sidebar__logo">
      <svg class="nav__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
      Analytics
    </a>

    <a href="/dashboard" class="nav__item nav__item--active" aria-current="page">
      <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
      Dashboard
    </a>

    <a href="/analytics" class="nav__item">
      <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
      Analytics
    </a>

    <a href="/users" class="nav__item">
      <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      Users
    </a>

    <a href="/settings" class="nav__item">
      <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
      Settings
    </a>
  </nav>

  <!-- Header -->
  <header class="header">
    <h1 class="header__title">Dashboard</h1>
    <div class="header__actions">
      <button class="btn btn--ghost">Export</button>
      <button class="btn btn--primary">+ New Report</button>
      <div class="avatar" role="img" aria-label="User: Alice Chen">AC</div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="main" id="main-content">

    <!-- Stat Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card__label">Total Revenue</div>
        <div class="stat-card__value">$48,291</div>
        <div class="stat-card__change stat-card__change--up">↑ 12.5% vs last month</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">Active Users</div>
        <div class="stat-card__value">3,842</div>
        <div class="stat-card__change stat-card__change--up">↑ 8.1% vs last month</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">Churn Rate</div>
        <div class="stat-card__value">2.4%</div>
        <div class="stat-card__change stat-card__change--down">↑ 0.3% vs last month</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">Avg. Session</div>
        <div class="stat-card__value">4m 12s</div>
        <div class="stat-card__change stat-card__change--up">↑ 22s vs last month</div>
      </div>
    </div>

    <!-- Recent Transactions Table -->
    <div class="section-header">
      <h2 class="section-title">Recent Transactions</h2>
      <button class="btn btn--ghost">View all</button>
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Customer</th>
            <th scope="col">Plan</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alice Chen</td>
            <td>Pro Annual</td>
            <td>$299.00</td>
            <td><time datetime="2025-03-07">Mar 7, 2025</time></td>
            <td><span class="badge badge--success">Paid</span></td>
          </tr>
          <tr>
            <td>Bob Smith</td>
            <td>Starter Monthly</td>
            <td>$29.00</td>
            <td><time datetime="2025-03-06">Mar 6, 2025</time></td>
            <td><span class="badge badge--warning">Pending</span></td>
          </tr>
          <tr>
            <td>Carol White</td>
            <td>Pro Monthly</td>
            <td>$49.00</td>
            <td><time datetime="2025-03-05">Mar 5, 2025</time></td>
            <td><span class="badge badge--danger">Failed</span></td>
          </tr>
          <tr>
            <td>Dave Johnson</td>
            <td>Enterprise</td>
            <td>$999.00</td>
            <td><time datetime="2025-03-04">Mar 4, 2025</time></td>
            <td><span class="badge badge--success">Paid</span></td>
          </tr>
        </tbody>
      </table>
    </div>

  </main>

</div>

</body>
</html>
```

---

# Module 4: JavaScript Fundamentals

JavaScript is the only programming language that runs natively in browsers. It's also one of the most misunderstood. This module builds the mental models that turn people from "copy-pasting until it works" to actually understanding what's happening.

---

## Variables: `var`, `let`, `const`

```javascript
// var: function-scoped, hoisted, can be re-declared
// Almost never use var in modern code.
var x = 1;
var x = 2; // No error — confusing

// let: block-scoped, not re-declarable
let count = 0;
count = 1; // OK
// let count = 2; // Error: already declared

// const: block-scoped, can't be reassigned (but contents can be mutated)
const PI = 3.14159;
// PI = 3; // Error: assignment to constant variable

const user = { name: 'Alice' };
user.name = 'Bob'; // OK — you're mutating, not reassigning
// user = {}; // Error: can't reassign

const nums = [1, 2, 3];
nums.push(4); // OK — mutating the array
// nums = [1, 2]; // Error
```

**Rule**: Use `const` by default. Use `let` when you need to reassign. Never use `var`.

### Hoisting

```javascript
// var declarations are hoisted to the top of the function (but not the value)
console.log(x); // undefined (not an error!)
var x = 5;

// This is what actually happens:
var x;           // declaration hoisted
console.log(x);  // undefined
x = 5;

// let and const are hoisted too, but into the "temporal dead zone"
// Accessing them before declaration throws a ReferenceError
console.log(y);  // ReferenceError: Cannot access 'y' before initialization
let y = 5;

// Function declarations are fully hoisted
greet(); // 'Hello' — works!
function greet() { console.log('Hello'); }

// Function expressions are NOT fully hoisted
greet(); // TypeError: greet is not a function
var greet = function() { console.log('Hello'); };
```

---

## Data Types

JavaScript has 8 data types:

```javascript
// Primitives (stored by value)
typeof undefined    // 'undefined' — declared but no value assigned
typeof null         // 'object'    — this is a famous bug; null IS its own type
typeof true         // 'boolean'
typeof 42           // 'number'
typeof 3.14         // 'number'    — no separate float type
typeof NaN          // 'number'    — "Not a Number" is ironically a number
typeof Infinity     // 'number'
typeof 'hello'      // 'string'
typeof Symbol('id') // 'symbol'    — unique, immutable identifier
typeof 9007199254740991n // 'bigint' — integers beyond Number.MAX_SAFE_INTEGER

// Object (stored by reference)
typeof {}           // 'object'
typeof []           // 'object'   — arrays are objects
typeof null         // 'object'   — the infamous bug
typeof function(){} // 'function' — technically an object
```

### Type Coercion

JavaScript automatically converts types in certain operations. This is the source of most "JavaScript is weird" memes.

```javascript
// == does type coercion (avoid!)
0 == false          // true
0 == ''             // true
'' == false         // true
null == undefined   // true
null == false       // false (!)

// === does NO coercion (always use this)
0 === false         // false
0 === ''            // false

// + is both addition and string concatenation
1 + 2               // 3
'1' + 2             // '12' (number coerced to string)
1 + '2'             // '12'
1 + 2 + '3'         // '33' (left-to-right: 3 then '33')
'1' + 2 + 3         // '123'

// Other operators coerce to numbers
'5' - 2             // 3
'5' * '2'           // 10
true + 1            // 2
false + 1           // 1
null + 1            // 1
undefined + 1       // NaN

// Falsy values (coerce to false in boolean context)
if (false)     {} // false
if (0)         {} // false
if (-0)        {} // false
if (0n)        {} // false (BigInt zero)
if ('')        {} // false
if (null)      {} // false
if (undefined) {} // false
if (NaN)       {} // false

// Everything else is truthy, including:
if ([])   {} // true (empty array!)
if ({})   {} // true (empty object!)
if ('0')  {} // true (non-empty string!)
```

**The rule**: always use `===` and `!==`. Avoid relying on implicit coercion.

---

## Scope and Closures

**Scope** is the context in which a variable is accessible.

```javascript
// Global scope: accessible everywhere
const globalVar = 'I am global';

function outer() {
  // Function scope: accessible within outer and its children
  const outerVar = 'I am outer';

  function inner() {
    // Block scope: accessible only in inner
    const innerVar = 'I am inner';

    // Can access all parent scopes
    console.log(globalVar);  // ✓
    console.log(outerVar);   // ✓
    console.log(innerVar);   // ✓
  }

  // console.log(innerVar);  // ✗ ReferenceError
  inner();
}

// Block scope with let/const
{
  let blockScoped = 'only here';
  const alsoBlock = 'also only here';
  var notBlock = 'everywhere in function'; // var ignores blocks!
}

// console.log(blockScoped);  // ✗ ReferenceError
console.log(notBlock);         // ✓ Works (var leaks out of blocks)
```

### Closures

A closure is a function that **remembers** the variables from its outer scope, even after that outer function has returned.

```javascript
function makeCounter(initialValue = 0) {
  let count = initialValue; // This variable is "closed over"

  return {
    increment() { count++; },
    decrement() { count--; },
    reset()     { count = initialValue; },
    getValue()  { return count; }
  };
}

const counter = makeCounter(10);
counter.increment(); // count = 11
counter.increment(); // count = 12
counter.decrement(); // count = 11
console.log(counter.getValue()); // 11

const counter2 = makeCounter(); // Separate count variable
counter2.increment();
console.log(counter2.getValue()); // 1
console.log(counter.getValue());  // 11 (unaffected)
```

The `count` variable inside `makeCounter` keeps living as long as `counter` exists, because `counter`'s methods hold a reference to it. This is the closure.

### Practical Closure Uses

```javascript
// 1. Data privacy / encapsulation
function createUser(name, email) {
  // Private — only accessible through the returned methods
  let _loginCount = 0;
  let _lastLogin = null;

  return {
    getName: () => name,
    getEmail: () => email,
    recordLogin() {
      _loginCount++;
      _lastLogin = new Date();
    },
    getStats: () => ({ loginCount: _loginCount, lastLogin: _lastLogin })
  };
}

// 2. Memoization
function memoize(fn) {
  const cache = new Map(); // Closed over
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  // Simulate expensive computation
  return n * n;
});

// 3. Partial application
function multiply(a, b) { return a * b; }
const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);
console.log(double(5)); // 10
console.log(triple(5)); // 15
```

---

## Objects and Arrays

### Objects

```javascript
// Object literal
const user = {
  id: 42,
  name: 'Alice Chen',
  email: 'alice@example.com',
  role: 'admin',
  createdAt: new Date('2024-01-15'),

  // Method shorthand
  greet() {
    return `Hello, I'm ${this.name}`;
  },

  // Computed property names
  [`data_${Date.now()}`]: 'dynamic key'
};

// Property access
user.name;           // 'Alice Chen'
user['email'];       // 'alice@example.com' (use for dynamic keys)

// Destructuring
const { name, email, role = 'user' } = user; // role defaults to 'user' if undefined
const { name: userName } = user;             // rename: userName = 'Alice Chen'
const { address: { city } = {} } = user;     // nested with default

// Spread
const updatedUser = { ...user, name: 'Bob', email: 'bob@example.com' };
const merged = { ...defaults, ...overrides };

// Rest in destructuring
const { id, ...rest } = user;
// id = 42, rest = { name, email, role, ... }

// Optional chaining
user.address?.city           // undefined instead of TypeError
user.getProfile?.()          // undefined if getProfile doesn't exist
user.addresses?.[0]?.city    // safe array access

// Nullish coalescing
const name = user.name ?? 'Anonymous';  // Only falls back on null/undefined
const count = user.count || 0;          // Falls back on any falsy (0, '', false too!)

// Object methods
Object.keys(user)    // ['id', 'name', 'email', ...]
Object.values(user)  // [42, 'Alice Chen', ...]
Object.entries(user) // [['id', 42], ['name', 'Alice Chen'], ...]
Object.assign({}, defaults, overrides)  // Merge (mutates first arg!)
Object.freeze(user)  // Make immutable (shallow)
```

### Arrays

```javascript
const fruits = ['apple', 'banana', 'cherry', 'date'];

// Access
fruits[0];          // 'apple'
fruits.at(-1);      // 'date' (negative index from end)
fruits.length;      // 4

// Mutating methods (modify the original array)
fruits.push('elderberry');      // Add to end → returns new length
fruits.pop();                   // Remove from end → returns removed item
fruits.unshift('acai');         // Add to start → returns new length
fruits.shift();                 // Remove from start → returns removed item
fruits.splice(1, 2);            // Remove 2 items at index 1 → returns removed
fruits.splice(1, 0, 'blueberry'); // Insert without removing
fruits.reverse();               // Reverses in place
fruits.sort();                  // Sorts in place (lexicographic by default!)
fruits.sort((a, b) => a.localeCompare(b)); // Proper string sort
[3,1,2].sort((a, b) => a - b);  // Numeric ascending sort
[3,1,2].sort((a, b) => b - a);  // Numeric descending sort

// Non-mutating methods (return new array/value)
fruits.slice(1, 3);              // Shallow copy of [1,3)
fruits.concat(['fig', 'grape']); // Merge arrays
fruits.join(', ');               // 'apple, banana, cherry, date'

// The big four transformation methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map: transform every element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter: keep elements that pass a test
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6, 8, 10]

// reduce: accumulate to a single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 55

// find/findIndex: get first match
const firstEven = numbers.find(n => n % 2 === 0);     // 2
const firstEvenIdx = numbers.findIndex(n => n % 2 === 0); // 1

// some/every: boolean tests
numbers.some(n => n > 5);  // true (at least one)
numbers.every(n => n > 0); // true (all pass)

// flat/flatMap
[[1, 2], [3, 4]].flat();           // [1, 2, 3, 4]
[1, 2, 3].flatMap(n => [n, n * 2]); // [1, 2, 2, 4, 3, 6]

// Spread and destructuring
const [first, second, ...rest] = fruits;
const copy = [...fruits];
const merged = [...fruits, ...morefruits];

// Checking membership
fruits.includes('apple');             // true
fruits.indexOf('banana');             // 1 (or -1 if not found)
```

---

## Asynchronous JavaScript

JavaScript is single-threaded, so it can't literally do two things at once. Async allows it to **start** an operation and continue with other work while waiting for the result.

### Callbacks (Old School)

```javascript
// Node.js-style callback: (error, result)
fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read file:', err);
    return;
  }

  const config = JSON.parse(data);

  db.connect(config.database, (err, connection) => {
    if (err) {
      console.error('DB connection failed:', err);
      return;
    }

    connection.query('SELECT * FROM users', (err, users) => {
      if (err) { /* handle */ return; }

      // This is callback hell: deeply nested, error handling repeated,
      // hard to read, hard to reason about
      users.forEach(user => {
        sendEmail(user.email, 'Welcome!', (err) => {
          if (err) { /* handle */ }
        });
      });
    });
  });
});
```

### Promises

A Promise represents a value that will be available in the future. It's in one of three states: pending, fulfilled, or rejected.

```javascript
// Creating a Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    // Simulate async work
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error('Invalid user ID'));
        return;
      }
      resolve({ id, name: 'Alice', email: 'alice@example.com' });
    }, 100);
  });
}

// Using .then/.catch/.finally
fetchUser(42)
  .then(user => {
    console.log('Got user:', user);
    return fetchUserPosts(user.id); // Return a promise to chain
  })
  .then(posts => {
    console.log('Got posts:', posts);
  })
  .catch(err => {
    // Catches any error in the chain above
    console.error('Something failed:', err.message);
  })
  .finally(() => {
    // Always runs, success or failure
    hideLoadingSpinner();
  });

// Parallel execution
Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)])
  .then(([user1, user2, user3]) => {
    // All three resolved
    console.log(user1, user2, user3);
  })
  .catch(err => {
    // If ANY promise rejects, the whole thing rejects
    console.error(err);
  });

// First to resolve wins
Promise.race([fetchFromUS(), fetchFromEU()])
  .then(result => console.log('Fastest response:', result));

// All settle (resolve or reject), don't fail fast
Promise.allSettled([fetchUser(1), fetchUser(-1), fetchUser(2)])
  .then(results => {
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        console.log(`User ${i + 1}:`, result.value);
      } else {
        console.log(`User ${i + 1} failed:`, result.reason.message);
      }
    });
  });

// First to RESOLVE (not reject) wins
Promise.any([fetchFromPrimary(), fetchFromBackup()])
  .then(result => console.log('Got result from first available:', result))
  .catch(() => console.error('All sources failed'));
```

### Async/Await

Async/await is syntactic sugar over promises. It makes async code read like synchronous code.

```javascript
// async function always returns a Promise
async function loadUserDashboard(userId) {
  try {
    // await pauses execution until the promise settles
    const user = await fetchUser(userId);
    const [posts, followers, analytics] = await Promise.all([
      fetchUserPosts(user.id),
      fetchFollowers(user.id),
      fetchAnalytics(user.id)
    ]);

    return {
      user,
      posts,
      followers,
      analytics
    };
  } catch (err) {
    if (err instanceof NetworkError) {
      // Retry logic
      return loadUserDashboard(userId); // Be careful — infinite retry risk
    }
    throw err; // Re-throw errors you can't handle here
  } finally {
    trackMetric('dashboard_load');
  }
}

// Top-level await (in ES modules)
const dashboard = await loadUserDashboard(42);
console.log(dashboard.user.name);
```

### Common Async Pitfalls

```javascript
// WRONG: await inside forEach doesn't work as expected
async function processUsers(users) {
  users.forEach(async (user) => {
    await sendEmail(user.email); // This runs, but forEach doesn't wait for it
  });
  // Function returns before emails are sent!
}

// RIGHT: Use for...of
async function processUsers(users) {
  for (const user of users) {
    await sendEmail(user.email); // Sequential — one at a time
  }
}

// BETTER for parallel: use Promise.all with map
async function processUsers(users) {
  await Promise.all(users.map(user => sendEmail(user.email))); // All at once
}

// Sequential vs parallel
// SLOW: sequential — waits for each one
const user = await fetchUser(id);
const posts = await fetchPosts(id);
const comments = await fetchComments(id);

// FAST: parallel — all three start at the same time
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id)
]);
```

---

## DOM Manipulation

The DOM is the live representation of your HTML that JavaScript can read and modify.

```javascript
// ——— Selecting elements ———
const el = document.getElementById('myId');
const el = document.querySelector('.card');           // First match
const els = document.querySelectorAll('.card');        // All matches (NodeList)
const parent = el.closest('.container');              // Nearest ancestor matching selector
const children = el.children;                         // HTMLCollection of direct children
const siblings = el.parentElement.children;

// ——— Reading and writing content ———
el.textContent;                // Text only (safe from XSS)
el.innerHTML;                  // HTML string (dangerous — XSS risk with user input!)
el.outerHTML;                  // Element + its HTML

el.textContent = 'New text';   // Safe
el.innerHTML = '<strong>Bold</strong>'; // OK when you control the content
// NEVER: el.innerHTML = userInput; — always sanitize first

// ——— Attributes ———
el.getAttribute('data-id');         // 'abc123'
el.setAttribute('aria-expanded', 'true');
el.removeAttribute('disabled');
el.hasAttribute('required');        // true/false
el.dataset.userId;                  // data-user-id attribute
el.dataset.userId = '42';          // Set data-user-id attribute

// ——— Classes ———
el.classList.add('active', 'highlighted');
el.classList.remove('loading');
el.classList.toggle('expanded');
el.classList.toggle('active', isActive);  // Force on/off
el.classList.contains('active');          // true/false
el.classList.replace('old', 'new');

// ——— Styles ———
el.style.backgroundColor = 'red';     // Camel case for CSS properties
el.style.setProperty('--custom-color', 'blue'); // CSS variables
el.style.removeProperty('background-color');
window.getComputedStyle(el).getPropertyValue('color'); // Read computed styles

// ——— Creating and inserting elements ———
const card = document.createElement('div');
card.className = 'card';
card.textContent = 'Hello';

// Modern insertion methods
parent.append(card);             // Add at end (accepts strings too)
parent.prepend(card);            // Add at start
parent.before(card);             // Insert before parent
parent.after(card);              // Insert after parent
el.replaceWith(card);            // Replace el with card
el.remove();                     // Remove element

// insertAdjacentHTML — fast, doesn't re-parse existing DOM
el.insertAdjacentHTML('beforebegin', '<p>Before the element</p>');
el.insertAdjacentHTML('afterbegin', '<p>Inside, before first child</p>');
el.insertAdjacentHTML('beforeend', '<p>Inside, after last child</p>');
el.insertAdjacentHTML('afterend', '<p>After the element</p>');

// DocumentFragment — batch DOM insertions for performance
const fragment = document.createDocumentFragment();
users.forEach(user => {
  const li = document.createElement('li');
  li.textContent = user.name;
  fragment.appendChild(li);
});
list.appendChild(fragment); // One DOM operation instead of N
```

### Event Handling

```javascript
// ——— Adding event listeners ———
const button = document.getElementById('submit-btn');

function handleClick(event) {
  event.preventDefault();   // Stop form submission, link navigation, etc.
  event.stopPropagation();  // Stop event from bubbling up

  console.log(event.type);       // 'click'
  console.log(event.target);     // Element that was actually clicked
  console.log(event.currentTarget); // Element the listener is attached to
  console.log(event.clientX, event.clientY); // Mouse position
}

button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick); // Must pass same function reference

// Options
button.addEventListener('click', handler, {
  once: true,       // Auto-remove after first trigger
  passive: true,    // Won't call preventDefault (performance hint for scroll)
  capture: true,    // Fire during capture phase (down the tree) vs bubble (up)
});

// ——— Event delegation ———
// Instead of attaching listeners to every item, attach to the parent
// and check what was clicked. Better performance, works for dynamically added items.

document.getElementById('todo-list').addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('[data-action="delete"]');
  if (!deleteBtn) return;

  const todoId = deleteBtn.dataset.todoId;
  deleteTodo(todoId);
});

// ——— Common events ———
// Mouse: click, dblclick, mousedown, mouseup, mouseover, mouseout, mousemove, contextmenu
// Keyboard: keydown, keyup, keypress (deprecated)
// Form: submit, change, input, focus, blur, focusin, focusout
// Window: load, DOMContentLoaded, resize, scroll, hashchange
// Touch: touchstart, touchend, touchmove
// Custom: dispatchEvent(new CustomEvent('my-event', { detail: data }))
```

---

## The Fetch API

```javascript
// ——— GET request ———
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    // fetch() only rejects on network errors, not HTTP errors!
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// ——— POST request ———
async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? `HTTP ${response.status}`);
  }

  return response.json();
}

// ——— File upload ———
async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('userId', getCurrentUserId());

  const response = await fetch('/api/upload/avatar', {
    method: 'POST',
    // Don't set Content-Type — browser will set it with the boundary
    body: formData,
  });

  return response.json();
}

// ——— Request with timeout ———
async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

// ——— Retry wrapper ———
async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok && response.status >= 500 && attempt < maxRetries) {
        // Server error — retry
        const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await new Promise(resolve => setTimeout(resolve, backoff));
        continue;
      }
      return response;
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  throw lastError;
}
```

---

## Advanced JavaScript: Prototypes and Classes

JavaScript's inheritance model is **prototypal** — objects inherit from other objects, not classes. ES6 `class` syntax is syntactic sugar over this system.

```javascript
// ——— Prototypal inheritance ———
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  }
};

const dog = Object.create(animal); // dog's prototype is animal
dog.name = 'Rex';
dog.bark = function() { return 'Woof!'; };

dog.speak(); // 'Rex makes a sound' — found via prototype chain
dog.bark();  // 'Woof!' — found directly on dog

// ——— ES6 Classes ———
class Animal {
  // Private fields (real privacy — not accessible outside class)
  #name;
  #sound;

  constructor(name, sound) {
    this.#name = name;
    this.#sound = sound;
  }

  speak() {
    return `${this.#name} says ${this.#sound}`;
  }

  get name() { return this.#name; }

  // Static method — on the class, not the instance
  static create(name, sound) {
    return new Animal(name, sound);
  }
}

class Dog extends Animal {
  #tricks = [];

  constructor(name) {
    super(name, 'Woof'); // Must call super() before using this
  }

  learnTrick(trick) {
    this.#tricks.push(trick);
  }

  perform() {
    return this.#tricks.map(trick =>
      `${this.name} performs ${trick}`
    );
  }
}

const rex = new Dog('Rex');
rex.speak();              // 'Rex says Woof'
rex.learnTrick('sit');
rex.learnTrick('shake');
rex.perform();            // ['Rex performs sit', 'Rex performs shake']
rex instanceof Dog;       // true
rex instanceof Animal;    // true
```

### Mixins Pattern

JavaScript only supports single inheritance. Mixins let you compose behaviors:

```javascript
const Serializable = (superclass) => class extends superclass {
  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    return Object.assign(new this(), JSON.parse(data));
  }
};

const Validatable = (superclass) => class extends superclass {
  validate() {
    const errors = [];
    for (const [field, rule] of Object.entries(this.constructor.rules ?? {})) {
      if (rule.required && !this[field]) {
        errors.push(`${field} is required`);
      }
    }
    return errors;
  }
};

class User extends Serializable(Validatable(class {})) {
  static rules = {
    name: { required: true },
    email: { required: true }
  };

  constructor(name, email) {
    super();
    this.name = name;
    this.email = email;
  }
}

const user = new User('Alice', 'alice@example.com');
user.validate();    // []
user.serialize();   // '{"name":"Alice","email":"alice@example.com"}'
```

---

## Error Handling

```javascript
// ——— Custom error classes ———
class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    // Maintains proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ValidationError extends AppError {
  constructor(message, fields = {}) {
    super(message, 'VALIDATION_ERROR', 422);
    this.fields = fields;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, 'NOT_FOUND', 404);
    this.resource = resource;
  }
}

class NetworkError extends AppError {
  constructor(message, retryable = true) {
    super(message, 'NETWORK_ERROR', 503);
    this.retryable = retryable;
  }
}

// ——— Using custom errors ———
async function getUser(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError('Invalid user ID', { id: 'Must be a positive integer' });
  }

  const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);

  if (!user) {
    throw new NotFoundError('User', id);
  }

  return user;
}

// ——— Catching specific errors ———
async function handleRequest(req, res) {
  try {
    const user = await getUser(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({
        error: err.message,
        fields: err.fields
      });
    }

    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }

    // Unknown error — log it and return generic message
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

---

## Functional Programming Patterns

```javascript
// ——— Pure functions ———
// Same input → always same output, no side effects
const add = (a, b) => a + b;           // Pure
const getDate = () => new Date();       // Impure (different output each time)
let state = 0;
const increment = () => ++state;        // Impure (modifies external state)

// ——— Immutability ———
// Instead of mutating, create new versions
const user = { name: 'Alice', age: 30 };
const updatedUser = { ...user, age: 31 }; // New object, original unchanged

const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);     // New array

// ——— Higher-order functions ———
// Functions that take or return functions
const pipe = (...fns) => (value) =>
  fns.reduce((acc, fn) => fn(acc), value);

const compose = (...fns) => (value) =>
  fns.reduceRight((acc, fn) => fn(acc), value);

// Process user names: trim, lowercase, replace spaces
const sanitizeName = pipe(
  str => str.trim(),
  str => str.toLowerCase(),
  str => str.replace(/\s+/g, '_')
);

sanitizeName('  Alice Chen  '); // 'alice_chen'

// ——— Currying ———
const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
};

const add3 = curry((a, b, c) => a + b + c);
add3(1)(2)(3);     // 6
add3(1, 2)(3);     // 6
add3(1)(2, 3);     // 6
add3(1, 2, 3);     // 6

const addTo10 = add3(10);   // Partial application
addTo10(2)(3);              // 15
```

---

## Mini Project: Implement Debounce and an Event Emitter

### Debounce

Debounce delays a function call until after a period of inactivity. The classic use: don't fire a search API call on every keystroke, fire it when the user stops typing.

```javascript
/**
 * Creates a debounced version of a function.
 * The debounced function will only call fn after
 * `delay` ms have passed without being called again.
 *
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Milliseconds to wait
 * @param {Object} options
 * @param {boolean} options.leading - Call immediately on first invocation
 * @param {boolean} options.trailing - Call after delay (default: true)
 */
function debounce(fn, delay, { leading = false, trailing = true } = {}) {
  let timerId = null;
  let lastArgs = null;
  let lastContext = null;

  function invoke() {
    fn.apply(lastContext, lastArgs);
    lastArgs = null;
    lastContext = null;
  }

  function debounced(...args) {
    lastArgs = args;
    lastContext = this;

    const callNow = leading && !timerId;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      if (trailing && !callNow) invoke();
    }, delay);

    if (callNow) invoke();
  }

  debounced.cancel = function() {
    clearTimeout(timerId);
    timerId = null;
  };

  debounced.flush = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
      if (lastArgs) invoke();
    }
  };

  return debounced;
}

// Usage:
const searchInput = document.getElementById('search');
const performSearch = debounce(async (query) => {
  if (!query.trim()) return;
  const results = await fetchSearchResults(query);
  displayResults(results);
}, 300);

searchInput.addEventListener('input', (e) => performSearch(e.target.value));
```

### Throttle (companion to debounce)

Throttle ensures a function runs at most once per interval. Use for scroll handlers, resize handlers — things that fire rapidly and just need periodic sampling.

```javascript
function throttle(fn, interval) {
  let lastCall = 0;
  let timerId = null;

  return function throttled(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastCall);

    if (remaining <= 0) {
      // Enough time has passed — call immediately
      clearTimeout(timerId);
      lastCall = now;
      fn.apply(this, args);
    } else {
      // Schedule call for when interval completes
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        lastCall = Date.now();
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// Usage:
const onScroll = throttle(() => {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  updateProgressBar(scrollPercent);
}, 16); // ~60fps

window.addEventListener('scroll', onScroll, { passive: true });
```

### Event Emitter

The event emitter pattern decouples components — one part of your code emits events, other parts react to them, without direct coupling.

```javascript
class EventEmitter {
  #listeners = new Map();
  #onceListeners = new Map();

  /**
   * Register a listener for an event
   */
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);

    // Return unsubscribe function (convenient for cleanup)
    return () => this.off(event, listener);
  }

  /**
   * Register a listener that fires only once
   */
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    if (!this.#onceListeners.has(event)) {
      this.#onceListeners.set(event, new Map());
    }
    this.#onceListeners.get(event).set(listener, wrapper);

    return this.on(event, wrapper);
  }

  /**
   * Remove a listener
   */
  off(event, listener) {
    // Check if this is a once-wrapped listener
    const onceMap = this.#onceListeners.get(event);
    if (onceMap?.has(listener)) {
      const wrapper = onceMap.get(listener);
      onceMap.delete(listener);
      this.#listeners.get(event)?.delete(wrapper);
      return this;
    }

    this.#listeners.get(event)?.delete(listener);
    return this;
  }

  /**
   * Emit an event, calling all registered listeners
   */
  emit(event, ...args) {
    const listeners = this.#listeners.get(event);
    if (!listeners?.size) return false;

    // Copy before iterating in case a listener removes itself
    for (const listener of [...listeners]) {
      try {
        listener(...args);
      } catch (err) {
        console.error(`Error in listener for "${event}":`, err);
      }
    }

    return true;
  }

  /**
   * Remove all listeners for an event, or all listeners if no event specified
   */
  removeAllListeners(event) {
    if (event) {
      this.#listeners.delete(event);
      this.#onceListeners.delete(event);
    } else {
      this.#listeners.clear();
      this.#onceListeners.clear();
    }
    return this;
  }

  /**
   * List registered events
   */
  eventNames() {
    return [...this.#listeners.keys()].filter(
      key => this.#listeners.get(key).size > 0
    );
  }

  listenerCount(event) {
    return this.#listeners.get(event)?.size ?? 0;
  }
}

// ——— Usage: a shopping cart ———
class ShoppingCart extends EventEmitter {
  #items = [];

  add(product, quantity = 1) {
    const existing = this.#items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.#items.push({ product, quantity });
    }
    this.emit('item:added', { product, quantity });
    this.emit('change', this.getState());
  }

  remove(productId) {
    const index = this.#items.findIndex(i => i.product.id === productId);
    if (index === -1) return;
    const [removed] = this.#items.splice(index, 1);
    this.emit('item:removed', removed);
    this.emit('change', this.getState());
  }

  getState() {
    const total = this.#items.reduce(
      (sum, { product, quantity }) => sum + product.price * quantity,
      0
    );
    return {
      items: [...this.#items],
      total,
      count: this.#items.reduce((n, { quantity }) => n + quantity, 0)
    };
  }
}

const cart = new ShoppingCart();

// Different parts of the UI listen independently
const unsubscribeCount = cart.on('change', ({ count }) => {
  document.getElementById('cart-badge').textContent = count;
});

cart.on('change', ({ total }) => {
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
});

cart.once('item:added', ({ product }) => {
  showToast(`${product.name} added to cart`);
});

// Unsubscribe when component unmounts
function onComponentUnmount() {
  unsubscribeCount();
}
```

---

# Module 5: TypeScript

TypeScript is JavaScript with a type system on top. It compiles away at build time — the browser still runs plain JavaScript. The types exist only to help you write correct code.

This isn't about writing more characters. It's about the feedback loop: TypeScript catches entire categories of bugs before you run a single line.

---

## Why TypeScript

```javascript
// In JavaScript, this is valid code
function getUser(id) {
  return db.query(`SELECT * FROM users WHERE id = ${id}`);
}

// You can call it with anything:
getUser(42);              // ✓ intended
getUser('alice');         // Probably a bug
getUser(null);            // SQL injection? Bug?
getUser({ id: 42 });      // SQL: "WHERE id = [object Object]" — definitely a bug

// TypeScript version — the compiler tells you what's wrong immediately
function getUser(id: number): Promise<User | null> {
  return db.query(`SELECT * FROM users WHERE id = ?`, [id]);
}

getUser('alice');          // Error: Argument of type 'string' not assignable to 'number'
getUser(null);             // Error: Argument of type 'null' not assignable to 'number'
getUser({ id: 42 });       // Error: Argument of type '{id: number}' not assignable to 'number'
```

TypeScript is a "linter on steroids" that understands the shape of your data.

---

## The Type System Basics

```typescript
// ——— Primitive types ———
const name: string = 'Alice';
const age: number = 30;
const active: boolean = true;
const nothing: null = null;
const nada: undefined = undefined;
const id: symbol = Symbol('userId');
const bigNum: bigint = 9007199254740993n;

// ——— Type inference ———
// TypeScript infers types — you don't always need annotations
const name = 'Alice';     // TypeScript infers: string
const age = 30;           // TypeScript infers: number
const active = true;      // TypeScript infers: boolean

// Annotate when inference isn't specific enough, or for documentation
const pi: number = 3.14159; // Redundant but explicit
let count: number;           // Necessary — can't infer without a value

// ——— Arrays ———
const names: string[] = ['Alice', 'Bob'];
const ids: number[] = [1, 2, 3];
const flags: boolean[] = [true, false, true];
const mixed: (string | number)[] = ['Alice', 42, 'Bob', 1];

// Generic array syntax (equivalent)
const names: Array<string> = ['Alice', 'Bob'];

// Readonly array — can't be mutated
const frozen: readonly number[] = [1, 2, 3];
// frozen.push(4); // Error

// ——— Tuples: fixed-length arrays with specific types ———
const point: [number, number] = [10, 20];
const entry: [string, number] = ['Alice', 42];
const response: [number, string, boolean] = [200, 'OK', true];

// Named tuple elements
const rgb: [red: number, green: number, blue: number] = [255, 128, 0];

// ——— Unions: one of several types ———
type ID = number | string;
type Status = 'active' | 'inactive' | 'pending' | 'banned';
type Result<T> = T | null | undefined;

function formatId(id: ID): string {
  return typeof id === 'number' ? id.toString(16) : id;
}

// ——— Intersections: combine types ———
type Timestamped = { createdAt: Date; updatedAt: Date };
type SoftDeletable = { deletedAt: Date | null };
type AuditedRecord = Timestamped & SoftDeletable;

// ——— Literal types: exact values ———
type Direction = 'north' | 'south' | 'east' | 'west';
type Dice = 1 | 2 | 3 | 4 | 5 | 6;
type Answer = true; // Only true, not false

let heading: Direction = 'north';
// heading = 'up'; // Error: not a valid Direction
```

---

## Interfaces vs Types

Both define the shape of objects. The differences are subtle but matter in certain situations.

```typescript
// ——— Interface ———
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  avatar?: string;    // Optional
  readonly apiKey: string; // Can't be changed after creation
}

// Interfaces can be extended
interface AdminUser extends User {
  permissions: string[];
  canDeleteUsers: boolean;
}

// Interfaces can be merged (declaration merging)
interface User {
  // This ADDS to the above definition, not replaces it
  lastLoginAt?: Date;
}

// ——— Type alias ———
type User = {
  id: number;
  name: string;
  // ... same fields
};

// Type aliases can represent anything (not just objects)
type ID = string | number;
type Callback<T> = (error: Error | null, result: T | null) => void;
type Transform<T, U> = (value: T) => U;
type Nullable<T> = T | null;

// Type aliases can extend with intersection
type AdminUser = User & {
  permissions: string[];
};

// Type aliases can use conditional types (interfaces can't)
type NonNullable<T> = T extends null | undefined ? never : T;
```

**Rule of thumb**: Use `interface` for object shapes (especially public API shapes). Use `type` for everything else: unions, intersections, mapped types, utility types, primitives, functions.

---

## Functions

```typescript
// ——— Function signatures ———
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const add = (a: number, b: number): number => a + b;

// Optional parameters
function greet(name: string, title?: string): string {
  return title ? `Hello, ${title} ${name}` : `Hello, ${name}`;
}

// Default parameters
function createUser(
  name: string,
  role: 'admin' | 'user' = 'user',
  active: boolean = true
): User {
  // ...
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// Function type
type MathFn = (a: number, b: number) => number;
const multiply: MathFn = (a, b) => a * b;

// Overloads: different signatures for different call patterns
function formatDate(date: Date): string;
function formatDate(timestamp: number): string;
function formatDate(dateString: string): string;
function formatDate(value: Date | number | string): string {
  // Implementation handles all cases
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

formatDate(new Date());         // ✓
formatDate(1709769600000);      // ✓
formatDate('2025-03-07');       // ✓
formatDate(true);               // Error: none of the overloads match
```

---

## Generics

Generics let you write reusable code that works with multiple types while preserving type information.

```typescript
// ——— Basic generic ———
function identity<T>(value: T): T {
  return value;
}

identity<string>('hello');    // Returns string
identity<number>(42);         // Returns number
identity('hello');            // TypeScript infers T = string
identity(42);                 // TypeScript infers T = number

// ——— Generic containers ———
interface Box<T> {
  value: T;
  isEmpty: boolean;
}

interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// Usage:
const userPage: Paginated<User> = {
  data: [user1, user2, user3],
  total: 100,
  page: 1,
  perPage: 10,
  totalPages: 10
};

// ——— Generic functions with constraints ———
// T must have an 'id' property of type number or string
function findById<T extends { id: number | string }>(
  items: T[],
  id: number | string
): T | undefined {
  return items.find(item => item.id === id);
}

findById(users, 42);          // Returns User | undefined
findById(products, 'abc');    // Returns Product | undefined
// findById([1, 2, 3], 1);   // Error: number doesn't have an 'id' property

// ——— Multiple type parameters ———
function zip<A, B>(as: A[], bs: B[]): [A, B][] {
  return as.slice(0, bs.length).map((a, i) => [a, bs[i]]);
}

const pairs = zip([1, 2, 3], ['a', 'b', 'c']);
// Type: [number, string][]

// ——— Generic React component ———
interface TableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  }[];
}

function Table<T extends Record<string, unknown>>({
  data,
  columns
}: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td key={String(col.key)}>
                {col.render
                  ? col.render(row[col.key], row)
                  : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Fully typed usage — TypeScript knows the shape of User
<Table<User>
  data={users}
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', render: (role) => <Badge>{role}</Badge> }
  ]}
/>
```

---

## Utility Types

TypeScript has built-in generic types for common transformations:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// Partial<T> — all properties optional
type UserUpdate = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// Required<T> — all properties required
type StrictConfig = Required<Partial<Config>>;

// Readonly<T> — all properties read-only
type ImmutableUser = Readonly<User>;

// Pick<T, K> — only certain properties
type UserPublicProfile = Pick<User, 'id' | 'name' | 'role'>;
// { id: number; name: string; role: 'admin' | 'user' }

// Omit<T, K> — all except certain properties
type UserWithoutPassword = Omit<User, 'password'>;
// { id: number; name: string; email: string; role: ...; createdAt: Date }

// Record<K, V> — object type with keys K and values V
type RolePermissions = Record<'admin' | 'editor' | 'viewer', string[]>;
type UsersById = Record<number, User>;

// Exclude<T, U> — remove from union
type NonAdmin = Exclude<'admin' | 'editor' | 'viewer', 'admin'>;
// 'editor' | 'viewer'

// Extract<T, U> — keep matching from union
type AdminOrEditor = Extract<'admin' | 'editor' | 'viewer', 'admin' | 'editor'>;
// 'admin' | 'editor'

// NonNullable<T> — remove null and undefined
type DefinitelyUser = NonNullable<User | null | undefined>;
// User

// ReturnType<T> — get return type of function
function getUser(): User { /* ... */ }
type UserResult = ReturnType<typeof getUser>; // User

// Parameters<T> — get parameter types as tuple
type GetUserParams = Parameters<typeof getUser>; // []

// Awaited<T> — unwrap Promise
type ResolvedUser = Awaited<Promise<User>>; // User
type DeepResolved = Awaited<Promise<Promise<User>>>; // User

// ——— Combining utility types ———
// API response: pick certain fields, make them readonly
type UserAPIResponse = Readonly<Pick<User, 'id' | 'name' | 'email' | 'role'>>;

// Form state: all required fields, no id or dates
type UserCreateForm = Required<Omit<User, 'id' | 'createdAt'>>;

// PATCH endpoint: all optional except id
type UserPatch = Pick<User, 'id'> & Partial<Omit<User, 'id'>>;
```

---

## Type Narrowing

Type narrowing is how TypeScript refines a broader type to a more specific one inside a conditional.

```typescript
// ——— typeof narrowing ———
function formatInput(value: string | number | boolean): string {
  if (typeof value === 'string') {
    return value.toUpperCase(); // TypeScript knows: value is string here
  }
  if (typeof value === 'number') {
    return value.toFixed(2);    // TypeScript knows: value is number here
  }
  return value ? 'Yes' : 'No';  // TypeScript knows: value is boolean here
}

// ——— instanceof narrowing ———
function handleError(err: unknown) {
  if (err instanceof ValidationError) {
    return { type: 'validation', fields: err.fields };
  }
  if (err instanceof NetworkError) {
    return { type: 'network', retryable: err.retryable };
  }
  if (err instanceof Error) {
    return { type: 'error', message: err.message };
  }
  return { type: 'unknown', raw: err };
}

// ——— 'in' narrowing ———
interface Bird { fly(): void; species: string; }
interface Fish { swim(): void; species: string; }

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    animal.fly(); // TypeScript knows: animal is Bird
  } else {
    animal.swim(); // TypeScript knows: animal is Fish
  }
}

// ——— Discriminated unions ———
// A "discriminant" field (same name, different literal type in each branch)
// gives TypeScript a reliable way to narrow the type.
type APIResponse =
  | { status: 'success'; data: User[] }
  | { status: 'error'; code: number; message: string }
  | { status: 'loading' };

function handleResponse(response: APIResponse) {
  switch (response.status) {
    case 'success':
      renderUsers(response.data);   // TS knows response has .data
      break;
    case 'error':
      showError(response.message);  // TS knows response has .message and .code
      break;
    case 'loading':
      showSpinner();
      break;
    default:
      // TypeScript will error here if you add a new status without handling it
      const _exhaustive: never = response;
  }
}

// ——— Type guards (custom narrowing) ———
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value &&
    typeof (value as User).email === 'string'
  );
}

function processResponse(data: unknown) {
  if (isUser(data)) {
    // TypeScript knows data is User here
    console.log(data.email.toLowerCase());
  }
}

// ——— Assertion functions ———
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new TypeError('Expected a User object');
  }
}

const rawData = await fetchJSON('/api/me');
assertUser(rawData); // throws if not a User
rawData.email;       // TypeScript knows it's a User from here
```

---

## Mini Project: Build a Typed API Client

A fully type-safe HTTP client — the kind of thing you'd actually use in a real project.

```typescript
// api-client.ts

// ——— Types ———
interface ApiConfig {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
}

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
}

type ApiResponse<T> =
  | { ok: true;  status: number; data: T }
  | { ok: false; status: number; error: ApiError };

interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

// ——— The client ———
class TypedApiClient {
  readonly #config: Required<ApiConfig>;

  constructor(config: ApiConfig) {
    this.#config = {
      headers: {},
      timeout: 10000,
      ...config
    };
  }

  async get<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.#request<T>('GET', path, undefined, options);
  }

  async post<T>(path: string, body: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.#request<T>('POST', path, body, options);
  }

  async put<T>(path: string, body: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.#request<T>('PUT', path, body, options);
  }

  async patch<T>(path: string, body: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.#request<T>('PATCH', path, body, options);
  }

  async delete<T = void>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.#request<T>('DELETE', path, undefined, options);
  }

  async #request<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = new URL(path, this.#config.baseURL);

    // Add query params
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.#config.timeout
    );

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...this.#config.headers,
          ...options?.headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: options?.signal ?? controller.signal,
      });

      const contentType = response.headers.get('content-type');
      const isJSON = contentType?.includes('application/json');

      if (response.ok) {
        const data = isJSON ? await response.json() as T : undefined as T;
        return { ok: true, status: response.status, data };
      } else {
        const error: ApiError = isJSON
          ? await response.json()
          : { message: response.statusText };
        return { ok: false, status: response.status, error };
      }

    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        return {
          ok: false,
          status: 0,
          error: { message: 'Request timed out', code: 'TIMEOUT' }
        };
      }
      return {
        ok: false,
        status: 0,
        error: { message: (err as Error).message, code: 'NETWORK_ERROR' }
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  // Create a new client with added headers (e.g., after auth)
  withHeaders(headers: Record<string, string>): TypedApiClient {
    return new TypedApiClient({
      ...this.#config,
      headers: { ...this.#config.headers, ...headers }
    });
  }
}

// ——— Domain types ———
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string; // ISO date string from API
}

interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
  publishedAt: string | null;
}

interface CreateUserPayload {
  name: string;
  email: string;
  role?: User['role'];
}

// ——— API service layer ———
const httpClient = new TypedApiClient({
  baseURL: 'https://api.example.com',
  timeout: 15000,
});

// Authenticated client factory
function createAuthClient(token: string) {
  return httpClient.withHeaders({
    'Authorization': `Bearer ${token}`
  });
}

// ——— Resource-specific APIs ———
function usersAPI(token: string) {
  const client = createAuthClient(token);

  return {
    async list(params?: { page?: number; perPage?: number; role?: User['role'] }) {
      const response = await client.get<User[]>('/users', { params });
      if (!response.ok) throw new Error(response.error.message);
      return response.data;
    },

    async get(id: number) {
      const response = await client.get<User>(`/users/${id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(response.error.message);
      }
      return response.data;
    },

    async create(payload: CreateUserPayload) {
      const response = await client.post<User>('/users', payload);
      if (!response.ok) {
        if (response.status === 422) {
          throw new ValidationError('Validation failed', response.error.details ?? {});
        }
        throw new Error(response.error.message);
      }
      return response.data;
    },

    async update(id: number, payload: Partial<CreateUserPayload>) {
      const response = await client.patch<User>(`/users/${id}`, payload);
      if (!response.ok) throw new Error(response.error.message);
      return response.data;
    },

    async delete(id: number) {
      const response = await client.delete(`/users/${id}`);
      if (!response.ok) throw new Error(response.error.message);
    },
  };
}

// ——— Usage ———
async function main() {
  const users = usersAPI(localStorage.getItem('token') ?? '');

  // TypeScript knows the return type of each method
  const allUsers = await users.list({ role: 'admin' });
  // allUsers: User[]

  const user = await users.get(42);
  // user: User | null

  const newUser = await users.create({
    name: 'Alice Chen',
    email: 'alice@example.com',
    role: 'editor'
  });
  // newUser: User

  await users.update(newUser.id, { role: 'admin' });

  console.log(`Created: ${newUser.name} (${newUser.role})`);
}
```

This client is used exactly as typed — autocomplete tells you what's available, TypeScript tells you when you're passing the wrong thing, and the discriminated union return type forces you to handle both success and error cases.

---