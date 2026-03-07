// AUTO-GENERATED CURRICULUM DATA
export const CURRICULUM_DATA: any = {
  "web": {
    "id": "web",
    "title": "Internet & Web Fundamentals",
    "description": "This ensures beginners understand how the web works.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t1",
            "title": "How the Internet Works",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>The internet is a global network of computers that agree on how to talk to each other. That agreement is a set of <strong>protocols</strong> — rules for formatting, addressing, and routing data.</p>\n<p>When you type <code>https://github.com</code> into your browser, here&#39;s the actual sequence:</p>\n<ol>\n<li>Your browser needs to find the IP address for <code>github.com</code></li>\n<li>Your OS checks its local DNS cache — if it&#39;s there, use it</li>\n<li>If not cached, your OS asks your configured DNS resolver (usually your router or ISP)</li>\n<li>The resolver walks up the DNS hierarchy until it gets an answer</li>\n<li>Your browser opens a TCP connection to that IP on port 443</li>\n<li>A TLS handshake happens — certificates are exchanged, encryption keys are negotiated</li>\n<li>Your browser sends an HTTP GET request over that encrypted connection</li>\n<li>The server processes it and sends back a response</li>\n<li>Your browser parses the HTML, discovers more resources (CSS, JS, images), and fetches those too</li>\n<li>The page renders</li>\n</ol>\n<p>Every single step is a potential failure point. Understanding each one is how you debug real problems.</p>\n<h3>The TCP/IP Stack</h3>\n<p>Networking is organized in layers. You don&#39;t need to memorize all of them, but you should understand what each does:</p>\n<table>\n<thead>\n<tr>\n<th>Layer</th>\n<th>Protocol</th>\n<th>What it does</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Application</td>\n<td>HTTP, DNS, SMTP</td>\n<td>The actual content and commands</td>\n</tr>\n<tr>\n<td>Transport</td>\n<td>TCP, UDP</td>\n<td>Reliable (TCP) or fast (UDP) delivery</td>\n</tr>\n<tr>\n<td>Internet</td>\n<td>IP</td>\n<td>Addressing and routing between networks</td>\n</tr>\n<tr>\n<td>Link</td>\n<td>Ethernet, Wi-Fi</td>\n<td>Physical transmission on a local network</td>\n</tr>\n</tbody></table>\n<p><strong>TCP</strong> (Transmission Control Protocol) guarantees delivery and ordering. It breaks data into packets, numbers them, and the receiver sends acknowledgements. Lost packets get retransmitted. This is what HTTP runs on.</p>\n<p><strong>UDP</strong> (User Datagram Protocol) just fires packets and forgets them. Faster, but no guarantees. Used for DNS lookups, video streaming, gaming — things where a dropped packet is better than a delayed one.</p>\n<h3>Packets and Routing</h3>\n<p>Data travels in <strong>packets</strong> — small chunks, typically around 1500 bytes. A single HTTP response might be split into hundreds of packets, each potentially taking a different path through the network, arriving out of order, and being reassembled by TCP at the destination.</p>\n<p>Routers forward packets toward their destination using routing tables. They don&#39;t know the full path — they just know which next hop gets the packet closer.</p>\n<hr>\n"
            }
          },
          {
            "id": "t2",
            "title": "HTTP vs HTTPS",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<p><strong>HTTP</strong> (HyperText Transfer Protocol) is the language browsers and servers use to communicate. An HTTP request looks like this:</p>\n<pre><code>GET /api/users/42 HTTP/1.1\nHost: api.example.com\nAccept: application/json\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\n</code></pre>\n<p>And a response:</p>\n<pre><code>HTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: max-age=3600\n\n{&quot;id&quot;: 42, &quot;name&quot;: &quot;Alice&quot;, &quot;email&quot;: &quot;alice@example.com&quot;}\n</code></pre>\n<p>HTTP is plain text. Anyone who can intercept the network traffic can read everything — credentials, session tokens, personal data. This is a serious problem on public Wi-Fi and shared networks.</p>\n<p><strong>HTTPS</strong> is HTTP with TLS (Transport Layer Security) underneath it. The same request and response happen, but they&#39;re encrypted so interceptors only see gibberish.</p>\n<h3>The TLS Handshake</h3>\n<p>When your browser connects to an HTTPS site, before any HTTP happens:</p>\n<ol>\n<li><strong>Client Hello</strong> — browser sends supported TLS versions and cipher suites</li>\n<li><strong>Server Hello</strong> — server picks a cipher suite and sends its certificate</li>\n<li><strong>Certificate verification</strong> — browser checks the cert was signed by a trusted Certificate Authority (CA), hasn&#39;t expired, and matches the domain</li>\n<li><strong>Key exchange</strong> — they negotiate a shared secret using asymmetric cryptography (usually ECDHE)</li>\n<li><strong>Finished</strong> — both sides confirm the handshake with a message encrypted using the new keys</li>\n</ol>\n<p>From here on, everything is encrypted with symmetric keys (AES is common) — fast enough for bulk data transfer.</p>\n<h3>HTTP Versions</h3>\n<ul>\n<li><strong>HTTP/1.1</strong> — one request per TCP connection at a time (browsers work around this by opening 6 connections per domain)</li>\n<li><strong>HTTP/2</strong> — multiplexing: multiple requests over a single connection, header compression, server push</li>\n<li><strong>HTTP/3</strong> — runs over QUIC (UDP-based), faster connection setup, better handling of packet loss</li>\n</ul>\n<p>Most production sites should be using HTTP/2 at minimum. Check yours with <code>curl -I --http2 https://yoursite.com</code>.</p>\n<h3>HTTP Status Codes You Need to Know</h3>\n<pre><code>2xx — Success\n  200 OK\n  201 Created\n  204 No Content\n\n3xx — Redirection\n  301 Moved Permanently   (update your bookmarks/links)\n  302 Found               (temporary redirect)\n  304 Not Modified        (use your cached version)\n\n4xx — Client Error (you did something wrong)\n  400 Bad Request         (malformed syntax)\n  401 Unauthorized        (not authenticated)\n  403 Forbidden           (authenticated but not allowed)\n  404 Not Found\n  409 Conflict            (e.g. duplicate resource)\n  422 Unprocessable Entity (validation failed)\n  429 Too Many Requests   (rate limited)\n\n5xx — Server Error (server did something wrong)\n  500 Internal Server Error\n  502 Bad Gateway         (upstream server failed)\n  503 Service Unavailable (overloaded or down)\n  504 Gateway Timeout     (upstream server too slow)\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t3",
            "title": "DNS Resolution",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<p>The Domain Name System is the internet&#39;s phone book. It translates human-readable names like <code>api.stripe.com</code> into IP addresses like <code>54.187.216.72</code>.</p>\n<h3>The Hierarchy</h3>\n<p>DNS is a distributed, hierarchical database:</p>\n<pre><code>                    . (root)\n                    |\n           .com  .org  .net  .io  ...\n                    |\n              example.com\n                    |\n         www   api   mail   ...\n</code></pre>\n<h3>How a Lookup Works</h3>\n<p>When your browser needs to resolve <code>api.example.com</code>:</p>\n<ol>\n<li>Check local cache (OS, browser, <code>/etc/hosts</code>)</li>\n<li>Ask the <strong>Recursive Resolver</strong> (your ISP or a public one like <code>8.8.8.8</code>)</li>\n<li>Resolver asks a <strong>Root Nameserver</strong> — &quot;who handles <code>.com</code>?&quot;</li>\n<li>Root says &quot;ask the <code>.com</code> TLD nameserver&quot;</li>\n<li>TLD nameserver says &quot;ask <code>ns1.example.com</code>&quot;</li>\n<li><code>ns1.example.com</code> (the authoritative nameserver) returns the actual IP</li>\n<li>Resolver caches the result (for the TTL duration) and returns it</li>\n</ol>\n<h3>DNS Record Types</h3>\n<pre><code>A      maps domain → IPv4 address\nAAAA   maps domain → IPv6 address\nCNAME  maps domain → another domain (alias)\nMX     mail server for the domain\nTXT    arbitrary text (used for SPF, DKIM, site verification)\nNS     nameservers for the domain\nSOA    administrative info about the zone\n</code></pre>\n<pre><code class=\"language-bash\"># Practical DNS debugging\ndig api.example.com A           # A record\ndig api.example.com +trace      # full resolution path\ndig @8.8.8.8 api.example.com    # use Google&#39;s resolver\nnslookup api.example.com        # Windows/cross-platform\n\n# Check what TTL is left on a record\ndig api.example.com | grep -i ttl\n</code></pre>\n<p><strong>TTL gotcha</strong>: When you&#39;re migrating a site and change DNS records, the old IP will be cached everywhere for the duration of the TTL. Lower your TTL to 300 seconds (5 min) a day or two before the migration, then change the record, then raise it back. This is one of those things that bites everyone once.</p>\n<hr>\n"
            }
          },
          {
            "id": "t4",
            "title": "Domain Names & Hosting",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<h3>How Domains Work</h3>\n<p>You don&#39;t buy a domain — you <strong>rent</strong> it from a registrar (Namecheap, Cloudflare, Google Domains, etc.). The registrar updates the TLD&#39;s registry with your nameserver information.</p>\n<pre><code>You → Registrar → TLD Registry → DNS System → Visitors\n</code></pre>\n<h3>Hosting Models</h3>\n<p><strong>Shared Hosting</strong>: Your site lives on a server with hundreds of others. Cheap, but one bad neighbor can affect your performance. Fine for personal projects or low-traffic sites.</p>\n<p><strong>VPS (Virtual Private Server)</strong>: A virtual machine with dedicated resources. You get root access and full control. DigitalOcean, Linode, Vultr. Good middle ground for serious projects.</p>\n<p><strong>Dedicated Server</strong>: A physical machine just for you. Expensive, but maximum performance and control. Usually only justified at scale.</p>\n<p><strong>Platform as a Service (PaaS)</strong>: Heroku, Railway, Render. You push code, they handle servers. More expensive per compute unit, but saves operational overhead.</p>\n<p><strong>Serverless / Edge</strong>: Vercel, Netlify, Cloudflare Workers. Functions run on demand, globally distributed. Zero operational overhead for many use cases. Cold start latency is the tradeoff.</p>\n<h3>Connecting a Domain to Hosting</h3>\n<p>Typically you either:</p>\n<ol>\n<li><strong>Point nameservers</strong> to your hosting provider (they control all DNS from there)</li>\n<li><strong>Add an A record</strong> pointing your domain to your server&#39;s IP</li>\n</ol>\n<pre><code>; Example DNS zone file\nexample.com.     300  IN  A     203.0.113.42\nwww.example.com. 300  IN  CNAME example.com.\napi.example.com. 300  IN  A     203.0.113.43\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t5",
            "title": "Client vs Server Architecture",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<h3>The Basic Model</h3>\n<pre><code>Client (Browser)                    Server\n     |                                 |\n     |  HTTP Request                   |\n     |--------------------------------&gt;|\n     |                                 | - reads DB\n     |                                 | - runs business logic\n     |  HTTP Response                  | - renders/returns data\n     |&lt;--------------------------------|\n     |                                 |\n</code></pre>\n<p><strong>Client-side</strong> code runs in the browser: JavaScript manipulating the DOM, handling user interactions, making API calls. The user can see and modify it.</p>\n<p><strong>Server-side</strong> code runs on the server: database queries, authentication, business logic, sending emails. The user never sees it directly.</p>\n<h3>Rendering Strategies</h3>\n<p><strong>Server-Side Rendering (SSR)</strong>: The server builds the full HTML and sends it. Fast initial page load, great for SEO. Traditional web (PHP, Rails, Django) and modern frameworks (Next.js, Nuxt).</p>\n<p><strong>Client-Side Rendering (CSR)</strong>: Server sends a minimal HTML shell plus JavaScript. JS runs in the browser and renders the page. The initial load is slower (blank page until JS runs), but subsequent navigation is fast. Create React App, Vue CLI.</p>\n<p><strong>Static Site Generation (SSG)</strong>: HTML is generated at build time, not request time. Incredibly fast, trivially cacheable. Great for marketing sites, documentation, blogs. Gatsby, Hugo, Next.js with <code>getStaticProps</code>.</p>\n<p><strong>Incremental Static Regeneration (ISR)</strong>: Static pages are regenerated in the background after a set interval. Best of both worlds for sites with infrequently changing content. Next.js-specific.</p>\n<p>The right choice depends on your content update frequency, SEO requirements, and traffic patterns. Most real applications use a mix.</p>\n<hr>\n"
            }
          },
          {
            "id": "t6",
            "title": "The Request–Response Lifecycle",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>Let&#39;s trace a real request through a modern web stack. User clicks &quot;Add to Cart&quot; on an e-commerce site:</p>\n<pre><code>1. Browser\n   - User clicks button\n   - JavaScript event handler fires\n   - fetch(&#39;/api/cart&#39;, { method: &#39;POST&#39;, body: JSON.stringify({ productId: 123 }) })\n\n2. Network\n   - DNS lookup (probably cached)\n   - TCP connection (probably reused via HTTP/2)\n   - TLS already established\n   - HTTP/2 stream opened\n\n3. Load Balancer (nginx, AWS ALB)\n   - Terminates TLS\n   - Routes to an available app server\n   - Adds X-Forwarded-For header with client IP\n\n4. App Server (Node.js, etc.)\n   - Framework router matches POST /api/cart\n   - Authentication middleware: validates JWT token\n   - Rate limiting middleware: checks request count\n   - Controller function runs:\n     a. Validates request body (productId is a number, product exists)\n     b. Queries database: SELECT * FROM products WHERE id = 123\n     c. Updates database: INSERT INTO cart_items ...\n     d. Returns JSON response\n\n5. Database\n   - Query executes\n   - Returns result set\n   - Connection returned to pool\n\n6. Response travels back\n   - App server sends HTTP 201 with JSON body\n   - Load balancer forwards it\n   - Browser receives it\n   - JavaScript parses JSON, updates UI\n</code></pre>\n<p>Every one of these steps is something you&#39;ll debug at some point. Knowing the full picture means you know where to look.</p>\n<hr>\n"
            }
          },
          {
            "id": "t7",
            "title": "Web Browser Internals",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<p>Modern browsers are extraordinarily complex. Here&#39;s what happens when they receive HTML:</p>\n<h3>The Critical Rendering Path</h3>\n<pre><code>HTML bytes → Tokens → DOM\nCSS bytes  → Tokens → CSSOM\n                         ↓\nDOM + CSSOM = Render Tree\n                         ↓\n                      Layout (calculate positions and sizes)\n                         ↓\n                      Paint (fill in pixels)\n                         ↓\n                      Composite (layers → screen)\n</code></pre>\n<p><strong>DOM</strong> (Document Object Model): A tree representation of the HTML structure. JavaScript interacts with the page through this API.</p>\n<p><strong>CSSOM</strong> (CSS Object Model): A tree of all CSS rules. Combined with the DOM to determine what each element looks like.</p>\n<p><strong>Render Tree</strong>: Only the visible elements (no <code>display: none</code>, no <code>&lt;head&gt;</code>), each with their computed styles.</p>\n<p><strong>Layout</strong> (also called Reflow): The browser calculates the exact position and size of every element. This is expensive. Triggering it repeatedly (layout thrashing) kills performance.</p>\n<p><strong>Paint</strong>: Fills in pixels for each element — backgrounds, borders, text, shadows.</p>\n<p><strong>Composite</strong>: The browser may split the page into layers (especially for animated or transformed elements) and composites them together on the GPU.</p>\n<h3>JavaScript Engine</h3>\n<p>Browsers use a <strong>Just-In-Time (JIT)</strong> compiler. Your JavaScript isn&#39;t interpreted line by line — it&#39;s compiled to machine code at runtime. V8 (Chrome/Node.js) optimizes &quot;hot&quot; code paths especially aggressively.</p>\n<p>The browser runs JavaScript on a <strong>single thread</strong> using an <strong>event loop</strong>. Long-running JS blocks the UI thread — the page freezes. This is why you use async operations and why Web Workers exist.</p>\n<h3>The Event Loop</h3>\n<pre><code class=\"language-javascript\">// Mental model of the event loop:\n\nwhile (true) {\n  // 1. Run all synchronous code in the call stack\n  runCallStack();\n\n  // 2. Process all microtasks (Promise callbacks, queueMicrotask)\n  while (microtaskQueue.length &gt; 0) {\n    runMicrotask(microtaskQueue.shift());\n  }\n\n  // 3. Render if needed (60fps = every ~16.6ms)\n  if (shouldRender()) render();\n\n  // 4. Run one macrotask (setTimeout, setInterval, I/O callback)\n  if (macrotaskQueue.length &gt; 0) {\n    runMacrotask(macrotaskQueue.shift());\n  }\n}\n</code></pre>\n<p>This explains some non-obvious behavior:</p>\n<pre><code class=\"language-javascript\">console.log(&#39;1&#39;);\n\nsetTimeout(() =&gt; console.log(&#39;2&#39;), 0); // macrotask queue\n\nPromise.resolve().then(() =&gt; console.log(&#39;3&#39;)); // microtask queue\n\nconsole.log(&#39;4&#39;);\n\n// Output: 1, 4, 3, 2\n// Synchronous runs first, then microtasks, then macrotasks\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t8",
            "title": "Cookies vs localStorage vs sessionStorage",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>All three let you store data in the browser, but they have very different characteristics.</p>\n<h3>Cookies</h3>\n<pre><code class=\"language-javascript\">// Setting a cookie\ndocument.cookie = &quot;userId=abc123; Max-Age=86400; Path=/; Secure; HttpOnly; SameSite=Strict&quot;;\n\n// Reading cookies (clunky API — use a library or helper)\nconst cookies = Object.fromEntries(\n  document.cookie.split(&#39;; &#39;).map(c =&gt; c.split(&#39;=&#39;))\n);\n</code></pre>\n<p>Key characteristics:</p>\n<ul>\n<li><strong>Sent to the server automatically</strong> with every request. This is their primary purpose.</li>\n<li>Size limit: ~4KB</li>\n<li>Can be set by the server via <code>Set-Cookie</code> response header</li>\n<li><code>HttpOnly</code> flag: JavaScript cannot access it (XSS protection for session tokens)</li>\n<li><code>Secure</code> flag: Only sent over HTTPS</li>\n<li><code>SameSite</code> flag: Controls cross-site sending (<code>Strict</code>, <code>Lax</code>, <code>None</code>)</li>\n<li>Expiry: <code>Max-Age</code> or <code>Expires</code> — without these, it&#39;s a session cookie (deleted when browser closes)</li>\n</ul>\n<p><strong>Use cookies for</strong>: session tokens, authentication, anything the server needs to read.</p>\n<h3>localStorage</h3>\n<pre><code class=\"language-javascript\">// Simple key-value storage\nlocalStorage.setItem(&#39;theme&#39;, &#39;dark&#39;);\nlocalStorage.setItem(&#39;cart&#39;, JSON.stringify([{ id: 1, qty: 2 }]));\n\nconst theme = localStorage.getItem(&#39;theme&#39;);              // &#39;dark&#39;\nconst cart = JSON.parse(localStorage.getItem(&#39;cart&#39;));    // [{ id: 1, qty: 2 }]\n\nlocalStorage.removeItem(&#39;theme&#39;);\nlocalStorage.clear(); // nuke everything\n</code></pre>\n<p>Key characteristics:</p>\n<ul>\n<li><strong>Never sent to the server</strong></li>\n<li>Persists until explicitly cleared (survives browser restarts)</li>\n<li>~5-10MB storage limit</li>\n<li>Synchronous API — can block the main thread for large operations</li>\n<li>Scoped to origin (protocol + domain + port)</li>\n</ul>\n<p><strong>Use for</strong>: user preferences, non-sensitive cached data, offline-first apps.</p>\n<h3>sessionStorage</h3>\n<p>Same API as localStorage, but:</p>\n<ul>\n<li>Cleared when the tab is closed</li>\n<li>Not shared between tabs (even same origin)</li>\n<li>Good for: wizard state, temporary form data, tab-specific UI state</li>\n</ul>\n<h3>The Real Decision Matrix</h3>\n<pre><code>Question: Does the server need to read this data?\n  YES → Cookie (with HttpOnly if it&#39;s a token)\n  NO  → Continue...\n\nQuestion: Should it persist after the browser closes?\n  YES → localStorage\n  NO  → sessionStorage\n</code></pre>\n<p><strong>Never store sensitive data</strong> (tokens, passwords, personal info) in localStorage or sessionStorage. XSS attacks can steal everything in there. Session tokens belong in <code>HttpOnly</code> cookies.</p>\n<hr>\n"
            }
          },
          {
            "id": "t9",
            "title": "CORS (Cross-Origin Resource Sharing)",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>This trips up every developer eventually. Here&#39;s what&#39;s actually happening.</p>\n<h3>The Same-Origin Policy</h3>\n<p>Browsers enforce a rule: JavaScript on <code>https://app.example.com</code> cannot make requests to <code>https://api.different.com</code>. Two URLs have the same origin only if protocol, domain, AND port all match.</p>\n<p>This is a security feature. Without it, a malicious site could make requests to your bank using your session cookies.</p>\n<h3>When CORS Kicks In</h3>\n<p>CORS is the mechanism for <strong>relaxing</strong> the same-origin policy in a controlled way. The server declares which origins are allowed to make cross-origin requests.</p>\n<p><strong>Simple requests</strong> (GET/POST with basic headers) work like this:</p>\n<pre><code>Browser → Server:\nGET /api/data HTTP/1.1\nOrigin: https://app.example.com\n\nServer → Browser:\nHTTP/1.1 200 OK\nAccess-Control-Allow-Origin: https://app.example.com\n[data]\n</code></pre>\n<p><strong>Preflight requests</strong> — for methods like PUT/DELETE, or requests with custom headers, the browser first sends an <code>OPTIONS</code> request:</p>\n<pre><code>Browser → Server (preflight):\nOPTIONS /api/users/42 HTTP/1.1\nOrigin: https://app.example.com\nAccess-Control-Request-Method: DELETE\nAccess-Control-Request-Headers: Authorization\n\nServer → Browser:\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: https://app.example.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: Authorization, Content-Type\nAccess-Control-Max-Age: 86400\n\nBrowser → Server (actual request):\nDELETE /api/users/42 HTTP/1.1\nOrigin: https://app.example.com\nAuthorization: Bearer ...\n</code></pre>\n<h3>Configuring CORS in Node.js/Express</h3>\n<pre><code class=\"language-javascript\">const express = require(&#39;express&#39;);\nconst app = express();\n\n// Option 1: Simple setup with the cors package\nconst cors = require(&#39;cors&#39;);\n\napp.use(cors({\n  origin: [&#39;https://app.example.com&#39;, &#39;https://staging.example.com&#39;],\n  methods: [&#39;GET&#39;, &#39;POST&#39;, &#39;PUT&#39;, &#39;DELETE&#39;, &#39;OPTIONS&#39;],\n  allowedHeaders: [&#39;Content-Type&#39;, &#39;Authorization&#39;],\n  credentials: true,    // Allow cookies to be sent\n  maxAge: 86400         // Cache preflight for 24h\n}));\n\n// Option 2: Manual middleware (so you understand what&#39;s happening)\napp.use((req, res, next) =&gt; {\n  const allowedOrigins = [&#39;https://app.example.com&#39;];\n  const origin = req.headers.origin;\n\n  if (allowedOrigins.includes(origin)) {\n    res.setHeader(&#39;Access-Control-Allow-Origin&#39;, origin);\n    res.setHeader(&#39;Vary&#39;, &#39;Origin&#39;); // Tell caches this response varies by origin\n  }\n\n  res.setHeader(&#39;Access-Control-Allow-Methods&#39;, &#39;GET, POST, PUT, DELETE, OPTIONS&#39;);\n  res.setHeader(&#39;Access-Control-Allow-Headers&#39;, &#39;Content-Type, Authorization&#39;);\n  res.setHeader(&#39;Access-Control-Allow-Credentials&#39;, &#39;true&#39;);\n  res.setHeader(&#39;Access-Control-Max-Age&#39;, &#39;86400&#39;);\n\n  // Handle preflight\n  if (req.method === &#39;OPTIONS&#39;) {\n    return res.sendStatus(204);\n  }\n\n  next();\n});\n</code></pre>\n<p><strong>Never use <code>Access-Control-Allow-Origin: *</code> with credentials.</strong> Browsers block it. And be careful with <code>*</code> in production generally — it allows any site to make requests to your API.</p>\n<hr>\n"
            }
          },
          {
            "id": "t10",
            "title": "Web Security Basics",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<h3>HTTPS Everywhere</h3>\n<p>Serve everything over HTTPS. Use <code>Strict-Transport-Security</code> to prevent protocol downgrade attacks:</p>\n<pre><code>Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\n</code></pre>\n<p>This tells browsers to never try HTTP — always use HTTPS. Once you set this (especially with <code>preload</code>), it&#39;s very hard to undo, so make sure your whole site is HTTPS-ready first.</p>\n<h3>Security Headers</h3>\n<p>Add these to every response:</p>\n<pre><code>Content-Security-Policy: default-src &#39;self&#39;; script-src &#39;self&#39; &#39;nonce-{random}&#39;;\nX-Frame-Options: DENY\nX-Content-Type-Options: nosniff\nReferrer-Policy: strict-origin-when-cross-origin\nPermissions-Policy: camera=(), microphone=(), geolocation=()\n</code></pre>\n<p>We&#39;ll cover each of these in depth in Module 18. For now, the most important one is <strong>Content-Security-Policy (CSP)</strong> — it tells the browser which sources of content are legitimate, blocking many XSS attacks.</p>\n<h3>OWASP Top 10 Overview</h3>\n<p>The <a href=\"https://owasp.org/www-project-top-ten/\">OWASP Top 10</a> is a list of the most critical security risks. We&#39;ll go deep on these in Module 18, but at minimum you should be aware of:</p>\n<ol>\n<li><strong>Injection</strong> (SQL, command, LDAP) — never trust user input</li>\n<li><strong>Broken Authentication</strong> — weak session management, no MFA</li>\n<li><strong>XSS</strong> — injecting scripts into your pages</li>\n<li><strong>Insecure Direct Object References</strong> — <code>GET /invoices/1337</code> and you can see anyone&#39;s invoice</li>\n<li><strong>Security Misconfiguration</strong> — default passwords, unnecessary services, verbose error messages</li>\n</ol>\n<hr>\n"
            }
          },
          {
            "id": "t11",
            "title": "REST vs RPC",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>Two dominant philosophies for designing APIs.</p>\n<h3>REST (Representational State Transfer)</h3>\n<p>REST is built around <strong>resources</strong> (nouns). You interact with resources using standard HTTP methods:</p>\n<pre><code>GET    /users          → list users\nPOST   /users          → create a user\nGET    /users/42       → get user 42\nPUT    /users/42       → replace user 42\nPATCH  /users/42       → partially update user 42\nDELETE /users/42       → delete user 42\n\nGET    /users/42/posts → get posts belonging to user 42\n</code></pre>\n<p>REST is <strong>stateless</strong>: every request contains all information needed to process it. No server-side session state. This makes it easy to scale horizontally.</p>\n<h3>RPC (Remote Procedure Call)</h3>\n<p>RPC is built around <strong>actions</strong> (verbs). You call procedures on the server:</p>\n<pre><code>POST /api  { &quot;method&quot;: &quot;getUser&quot;,    &quot;params&quot;: { &quot;id&quot;: 42 } }\nPOST /api  { &quot;method&quot;: &quot;createUser&quot;, &quot;params&quot;: { &quot;name&quot;: &quot;Alice&quot; } }\nPOST /api  { &quot;method&quot;: &quot;deleteUser&quot;, &quot;params&quot;: { &quot;id&quot;: 42 } }\n</code></pre>\n<p><strong>gRPC</strong> is Google&#39;s modern RPC framework — strongly typed, uses Protocol Buffers, HTTP/2, excellent for microservice-to-microservice communication.</p>\n<p><strong>tRPC</strong> is popular in TypeScript ecosystems — end-to-end type safety between your Next.js frontend and Node.js backend without code generation.</p>\n<h3>Which to Use</h3>\n<table>\n<thead>\n<tr>\n<th>Situation</th>\n<th>Recommendation</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Public API that third parties will use</td>\n<td>REST</td>\n</tr>\n<tr>\n<td>Internal microservices, high performance</td>\n<td>gRPC</td>\n</tr>\n<tr>\n<td>Full-stack TypeScript app</td>\n<td>tRPC</td>\n</tr>\n<tr>\n<td>Complex operations that don&#39;t map to CRUD</td>\n<td>GraphQL or RPC-style</td>\n</tr>\n</tbody></table>\n<p>The &quot;resource vs action&quot; distinction matters less than people argue. What matters is consistency. Pick one and be consistent.</p>\n<hr>\n"
            }
          },
          {
            "id": "t12",
            "title": "WebSockets Basics",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>HTTP is request/response — the client always initiates. WebSockets give you a persistent, <strong>bidirectional</strong> connection. The server can push data to the client at any time.</p>\n<h3>How the Handshake Works</h3>\n<p>WebSockets start as an HTTP request and upgrade:</p>\n<pre><code>Client → Server:\nGET /ws HTTP/1.1\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\nSec-WebSocket-Version: 13\n\nServer → Client:\nHTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=\n</code></pre>\n<p>After this, the connection is open. Both sides can send <strong>frames</strong> at any time.</p>\n<h3>Simple WebSocket Example</h3>\n<pre><code class=\"language-javascript\">// Server (Node.js with &#39;ws&#39; library)\nconst { WebSocketServer } = require(&#39;ws&#39;);\nconst wss = new WebSocketServer({ port: 8080 });\n\nwss.on(&#39;connection&#39;, (ws, req) =&gt; {\n  console.log(&#39;Client connected from&#39;, req.socket.remoteAddress);\n\n  ws.on(&#39;message&#39;, (data) =&gt; {\n    const message = JSON.parse(data);\n    console.log(&#39;Received:&#39;, message);\n\n    // Echo back with a timestamp\n    ws.send(JSON.stringify({\n      type: &#39;echo&#39;,\n      data: message,\n      timestamp: Date.now()\n    }));\n  });\n\n  ws.on(&#39;close&#39;, () =&gt; {\n    console.log(&#39;Client disconnected&#39;);\n  });\n\n  ws.on(&#39;error&#39;, (err) =&gt; {\n    console.error(&#39;WebSocket error:&#39;, err);\n  });\n\n  // Send a welcome message\n  ws.send(JSON.stringify({ type: &#39;welcome&#39;, message: &#39;Connected!&#39; }));\n});\n\n// Broadcast to all connected clients\nfunction broadcast(data) {\n  const message = JSON.stringify(data);\n  wss.clients.forEach((client) =&gt; {\n    if (client.readyState === WebSocket.OPEN) {\n      client.send(message);\n    }\n  });\n}\n</code></pre>\n<pre><code class=\"language-javascript\">// Client (Browser)\nconst ws = new WebSocket(&#39;wss://yourserver.com/ws&#39;);\n\nws.addEventListener(&#39;open&#39;, () =&gt; {\n  console.log(&#39;Connected&#39;);\n  ws.send(JSON.stringify({ type: &#39;subscribe&#39;, channel: &#39;prices&#39; }));\n});\n\nws.addEventListener(&#39;message&#39;, (event) =&gt; {\n  const data = JSON.parse(event.data);\n  console.log(&#39;Received:&#39;, data);\n});\n\nws.addEventListener(&#39;close&#39;, (event) =&gt; {\n  console.log(&#39;Disconnected:&#39;, event.code, event.reason);\n  // Reconnect logic goes here\n});\n\nws.addEventListener(&#39;error&#39;, (err) =&gt; {\n  console.error(&#39;WebSocket error:&#39;, err);\n});\n</code></pre>\n<h3>When to Use WebSockets</h3>\n<ul>\n<li>Real-time features: chat, collaborative editing, live dashboards</li>\n<li>Games</li>\n<li>Live notifications</li>\n</ul>\n<p>For simpler one-way server-to-client updates (price tickers, feeds), <strong>Server-Sent Events (SSE)</strong> are often a better fit — they work over regular HTTP, automatically reconnect, and are simpler to implement. We cover these in Module 17.</p>\n<hr>\n"
            }
          },
          {
            "id": "t13",
            "title": "JSON vs XML",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>Both are data serialization formats. JSON has largely won for web APIs, but XML still exists in many enterprise and legacy systems.</p>\n<h3>JSON</h3>\n<pre><code class=\"language-json\">{\n  &quot;user&quot;: {\n    &quot;id&quot;: 42,\n    &quot;name&quot;: &quot;Alice Chen&quot;,\n    &quot;email&quot;: &quot;alice@example.com&quot;,\n    &quot;roles&quot;: [&quot;admin&quot;, &quot;editor&quot;],\n    &quot;address&quot;: {\n      &quot;city&quot;: &quot;San Francisco&quot;,\n      &quot;country&quot;: &quot;US&quot;\n    },\n    &quot;active&quot;: true,\n    &quot;balance&quot;: 99.99\n  }\n}\n</code></pre>\n<p>Compact, readable, maps directly to JavaScript objects. Native <code>JSON.parse()</code> and <code>JSON.stringify()</code>. The default choice for REST APIs.</p>\n<h3>XML</h3>\n<pre><code class=\"language-xml\">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;\n&lt;user id=&quot;42&quot;&gt;\n  &lt;name&gt;Alice Chen&lt;/name&gt;\n  &lt;email&gt;alice@example.com&lt;/email&gt;\n  &lt;roles&gt;\n    &lt;role&gt;admin&lt;/role&gt;\n    &lt;role&gt;editor&lt;/role&gt;\n  &lt;/roles&gt;\n  &lt;address city=&quot;San Francisco&quot; country=&quot;US&quot;/&gt;\n  &lt;active&gt;true&lt;/active&gt;\n  &lt;balance&gt;99.99&lt;/balance&gt;\n&lt;/user&gt;\n</code></pre>\n<p>More verbose, but supports attributes, namespaces, schemas (XSD), transformations (XSLT), and has mature tooling. Still common in: SOAP web services, RSS feeds, SVG, Microsoft Office formats, configuration files.</p>\n<h3>When You&#39;ll Encounter XML</h3>\n<ul>\n<li>Third-party integrations with older enterprise systems</li>\n<li>Payment processor APIs (some still use SOAP)</li>\n<li>RSS/Atom feeds</li>\n<li>Android layout files</li>\n<li>Maven/Spring configuration</li>\n</ul>\n<p>You&#39;ll spend 99% of your time writing JSON. But when XML shows up, don&#39;t panic — <code>DOMParser</code> in the browser and <code>xml2js</code> in Node.js handle it fine.</p>\n<hr>\n"
            }
          },
          {
            "id": "t14",
            "title": "Mini Project: Build an HTTP Inspector",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>This tiny project ties together everything in this module. It&#39;s a Node.js server that logs detailed information about every incoming request.</p>\n<pre><code class=\"language-javascript\">// http-inspector.js\n// Run with: node http-inspector.js\n// Then visit http://localhost:3000 or use curl/Postman to test\n\nconst http = require(&#39;http&#39;);\nconst url = require(&#39;url&#39;);\nconst dns = require(&#39;dns&#39;).promises;\n\nconst server = http.createServer(async (req, res) =&gt; {\n  const parsedUrl = url.parse(req.url, true);\n  const clientIP = req.socket.remoteAddress;\n\n  // Try to reverse DNS lookup the client\n  let hostname = &#39;unknown&#39;;\n  try {\n    const result = await dns.reverse(clientIP);\n    hostname = result[0] || &#39;unknown&#39;;\n  } catch (e) {\n    // Ignore — reverse DNS often fails\n  }\n\n  const requestInfo = {\n    timestamp: new Date().toISOString(),\n    method: req.method,\n    url: req.url,\n    pathname: parsedUrl.pathname,\n    query: parsedUrl.query,\n    httpVersion: req.httpVersion,\n    client: {\n      ip: clientIP,\n      hostname,\n    },\n    headers: req.headers,\n    // Check for proxy headers\n    realIP: req.headers[&#39;x-forwarded-for&#39;] || req.headers[&#39;x-real-ip&#39;] || clientIP,\n  };\n\n  // Read the request body if present\n  let body = &#39;&#39;;\n  req.on(&#39;data&#39;, chunk =&gt; body += chunk);\n  req.on(&#39;end&#39;, () =&gt; {\n    if (body) {\n      try {\n        requestInfo.body = JSON.parse(body);\n      } catch (e) {\n        requestInfo.body = body;\n      }\n    }\n\n    // Log to console\n    console.log(&#39;\\n&#39; + &#39;=&#39;.repeat(60));\n    console.log(JSON.stringify(requestInfo, null, 2));\n\n    // Respond with the request info\n    res.writeHead(200, {\n      &#39;Content-Type&#39;: &#39;application/json&#39;,\n      &#39;X-Powered-By&#39;: &#39;HTTP Inspector&#39;,\n      &#39;Access-Control-Allow-Origin&#39;: &#39;*&#39;,\n    });\n    res.end(JSON.stringify(requestInfo, null, 2));\n  });\n});\n\nserver.listen(3000, () =&gt; {\n  console.log(&#39;HTTP Inspector running on http://localhost:3000&#39;);\n  console.log(&#39;Make requests and watch them get logged!\\n&#39;);\n  console.log(&#39;Try:&#39;);\n  console.log(&#39;  curl http://localhost:3000/api/users?page=2&#39;);\n  console.log(&#39;  curl -X POST -H &quot;Content-Type: application/json&quot; -d \\&#39;{&quot;name&quot;:&quot;Alice&quot;}\\&#39; http://localhost:3000/users&#39;);\n});\n</code></pre>\n<p>Try various requests against it and observe exactly what arrives at the server. This builds intuition that will serve you for years.</p>\n<hr>\n"
            }
          }
        ]
      }
    ]
  },
  "html": {
    "id": "html",
    "title": "HTML (Structure Layer)",
    "description": "Learn HTML fundamentals.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t15",
            "title": "HTML Document Structure",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>Every HTML document has a required structure:</p>\n<pre><code class=\"language-html\">&lt;!DOCTYPE html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n  &lt;!-- Metadata — not visible on the page --&gt;\n  &lt;meta charset=&quot;UTF-8&quot;&gt;\n  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n  &lt;meta name=&quot;description&quot; content=&quot;A page about building great web apps&quot;&gt;\n  &lt;meta name=&quot;author&quot; content=&quot;Alice Chen&quot;&gt;\n\n  &lt;title&gt;Page Title — Site Name&lt;/title&gt;\n\n  &lt;!-- Preload critical resources --&gt;\n  &lt;link rel=&quot;preload&quot; href=&quot;/fonts/inter.woff2&quot; as=&quot;font&quot; type=&quot;font/woff2&quot; crossorigin&gt;\n\n  &lt;!-- Stylesheets --&gt;\n  &lt;link rel=&quot;stylesheet&quot; href=&quot;/css/main.css&quot;&gt;\n\n  &lt;!-- Favicons --&gt;\n  &lt;link rel=&quot;icon&quot; href=&quot;/favicon.svg&quot; type=&quot;image/svg+xml&quot;&gt;\n  &lt;link rel=&quot;apple-touch-icon&quot; href=&quot;/apple-touch-icon.png&quot;&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;!-- Visible content --&gt;\n\n  &lt;!-- Scripts at end of body (or use defer/async in &lt;head&gt;) --&gt;\n  &lt;script src=&quot;/js/main.js&quot; defer&gt;&lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n<h3>The <code>&lt;head&gt;</code> in Detail</h3>\n<p><strong><code>&lt;meta charset=&quot;UTF-8&quot;&gt;</code></strong> — Must be the first thing in <code>&lt;head&gt;</code>, within the first 1024 bytes. Tells the browser the character encoding. UTF-8 supports every character in every language.</p>\n<p><strong><code>&lt;meta name=&quot;viewport&quot;&gt;</code></strong> — Critical for mobile. Without this, mobile browsers render the page at desktop width and scale it down. This tag tells them to use the device&#39;s actual width.</p>\n<p><strong><code>&lt;title&gt;</code></strong> — Shown in browser tabs, bookmark names, and search engine results. The <code>Page Title — Site Name</code> pattern is standard. Keep it under 60 characters.</p>\n<h3>Script Loading Strategies</h3>\n<pre><code class=\"language-html\">&lt;!-- Blocks HTML parsing — bad, don&#39;t do this in &lt;head&gt; without defer/async --&gt;\n&lt;script src=&quot;app.js&quot;&gt;&lt;/script&gt;\n\n&lt;!-- defer: downloads in parallel, executes after HTML is parsed, in order --&gt;\n&lt;script src=&quot;app.js&quot; defer&gt;&lt;/script&gt;\n\n&lt;!-- async: downloads in parallel, executes immediately when ready (out of order) --&gt;\n&lt;script src=&quot;analytics.js&quot; async&gt;&lt;/script&gt;\n\n&lt;!-- module: always deferred, supports import/export --&gt;\n&lt;script type=&quot;module&quot; src=&quot;app.js&quot;&gt;&lt;/script&gt;\n</code></pre>\n<p><strong>Rule of thumb</strong>: Use <code>defer</code> for your own scripts. Use <code>async</code> for independent third-party scripts (analytics, ads) where execution order doesn&#39;t matter.</p>\n<hr>\n"
            }
          },
          {
            "id": "t16",
            "title": "Semantic HTML",
            "type": "reading",
            "readingTime": "4 min read",
            "article": {
              "htmlContent": "<p>Semantic HTML uses elements that describe the <strong>meaning</strong> of content, not just its appearance. This matters for:</p>\n<ul>\n<li><strong>Accessibility</strong>: screen readers use semantics to navigate and describe content</li>\n<li><strong>SEO</strong>: search engines use semantics to understand page structure</li>\n<li><strong>Maintainability</strong>: <code>&lt;nav&gt;</code> is clearer than <code>&lt;div class=&quot;nav-container-wrapper&quot;&gt;</code></li>\n</ul>\n<h3>Before and After</h3>\n<pre><code class=\"language-html\">&lt;!-- Non-semantic: technically works, meaningless to machines --&gt;\n&lt;div class=&quot;header&quot;&gt;\n  &lt;div class=&quot;logo&quot;&gt;MySite&lt;/div&gt;\n  &lt;div class=&quot;nav&quot;&gt;\n    &lt;div class=&quot;nav-item&quot;&gt;&lt;a href=&quot;/&quot;&gt;Home&lt;/a&gt;&lt;/div&gt;\n    &lt;div class=&quot;nav-item&quot;&gt;&lt;a href=&quot;/about&quot;&gt;About&lt;/a&gt;&lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;\n&lt;div class=&quot;main&quot;&gt;\n  &lt;div class=&quot;article&quot;&gt;\n    &lt;div class=&quot;article-title&quot;&gt;How to Build a Website&lt;/div&gt;\n    &lt;div class=&quot;article-meta&quot;&gt;By Alice · March 7, 2025&lt;/div&gt;\n    &lt;div class=&quot;article-content&quot;&gt;\n      &lt;div class=&quot;article-section&quot;&gt;\n        &lt;div class=&quot;section-title&quot;&gt;Getting Started&lt;/div&gt;\n        &lt;div class=&quot;section-text&quot;&gt;First, you&#39;ll need a text editor...&lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;sidebar&quot;&gt;Related articles...&lt;/div&gt;\n&lt;/div&gt;\n&lt;div class=&quot;footer&quot;&gt;© 2025 MySite&lt;/div&gt;\n</code></pre>\n<pre><code class=\"language-html\">&lt;!-- Semantic: describes what everything IS --&gt;\n&lt;header&gt;\n  &lt;a href=&quot;/&quot; class=&quot;logo&quot;&gt;MySite&lt;/a&gt;\n  &lt;nav aria-label=&quot;Main navigation&quot;&gt;\n    &lt;ul&gt;\n      &lt;li&gt;&lt;a href=&quot;/&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;\n      &lt;li&gt;&lt;a href=&quot;/about&quot;&gt;About&lt;/a&gt;&lt;/li&gt;\n    &lt;/ul&gt;\n  &lt;/nav&gt;\n&lt;/header&gt;\n\n&lt;main&gt;\n  &lt;article&gt;\n    &lt;header&gt;\n      &lt;h1&gt;How to Build a Website&lt;/h1&gt;\n      &lt;p&gt;\n        By &lt;address&gt;&lt;a rel=&quot;author&quot; href=&quot;/authors/alice&quot;&gt;Alice Chen&lt;/a&gt;&lt;/address&gt;\n        · &lt;time datetime=&quot;2025-03-07&quot;&gt;March 7, 2025&lt;/time&gt;\n      &lt;/p&gt;\n    &lt;/header&gt;\n\n    &lt;section&gt;\n      &lt;h2&gt;Getting Started&lt;/h2&gt;\n      &lt;p&gt;First, you&#39;ll need a text editor...&lt;/p&gt;\n    &lt;/section&gt;\n  &lt;/article&gt;\n\n  &lt;aside aria-label=&quot;Related articles&quot;&gt;\n    Related articles...\n  &lt;/aside&gt;\n&lt;/main&gt;\n\n&lt;footer&gt;\n  &lt;p&gt;© 2025 MySite&lt;/p&gt;\n&lt;/footer&gt;\n</code></pre>\n<h3>Key Semantic Elements</h3>\n<pre><code>Document structure:\n  &lt;header&gt;    — Introductory content (for page or for a section)\n  &lt;nav&gt;       — Navigation links\n  &lt;main&gt;      — Dominant content (one per page)\n  &lt;article&gt;   — Self-contained content (could be syndicated)\n  &lt;section&gt;   — Thematic grouping of content (with a heading)\n  &lt;aside&gt;     — Tangentially related content, sidebars\n  &lt;footer&gt;    — Footer content\n\nText semantics:\n  &lt;h1&gt;–&lt;h6&gt;   — Headings (document outline, not visual size)\n  &lt;p&gt;          — Paragraph\n  &lt;strong&gt;     — Important text (bold by default)\n  &lt;em&gt;         — Emphasized text (italic by default)\n  &lt;mark&gt;       — Highlighted/relevant text\n  &lt;time&gt;       — Date/time (machine-readable with datetime attribute)\n  &lt;address&gt;    — Contact information for nearest article/body ancestor\n  &lt;abbr&gt;       — Abbreviation with title attribute\n  &lt;cite&gt;       — Title of a creative work\n  &lt;blockquote&gt; — Extended quotation\n  &lt;code&gt;       — Inline code\n  &lt;pre&gt;        — Preformatted text (whitespace preserved)\n  &lt;kbd&gt;        — Keyboard input\n  &lt;var&gt;        — Variable in math or programming\n  &lt;samp&gt;       — Sample output\n\nMedia:\n  &lt;figure&gt;     — Self-contained media with a caption\n  &lt;figcaption&gt; — Caption for a &lt;figure&gt;\n\nInteractive:\n  &lt;details&gt;    — Disclosure widget\n  &lt;summary&gt;    — Visible heading for &lt;details&gt;\n  &lt;dialog&gt;     — Modal dialog\n</code></pre>\n<h3>Heading Hierarchy</h3>\n<p>Headings create the document outline. <strong>Don&#39;t skip levels</strong> — don&#39;t jump from <code>&lt;h1&gt;</code> to <code>&lt;h3&gt;</code>. Screen reader users navigate pages by jumping between headings.</p>\n<pre><code class=\"language-html\">&lt;h1&gt;Web Development Guide&lt;/h1&gt;           &lt;!-- One per page --&gt;\n  &lt;h2&gt;Module 1: HTML&lt;/h2&gt;\n    &lt;h3&gt;Semantic Elements&lt;/h3&gt;\n    &lt;h3&gt;Forms&lt;/h3&gt;\n      &lt;h4&gt;Input Types&lt;/h4&gt;\n  &lt;h2&gt;Module 2: CSS&lt;/h2&gt;\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t17",
            "title": "Forms and Input Types",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "htmlContent": "<p>Forms are how users give you data. Getting them right matters for usability, accessibility, and mobile experience.</p>\n<pre><code class=\"language-html\">&lt;form action=&quot;/api/register&quot; method=&quot;POST&quot; novalidate&gt;\n  &lt;!-- novalidate disables browser validation so we can do it ourselves,\n       but we still use proper input types for mobile keyboards --&gt;\n\n  &lt;fieldset&gt;\n    &lt;legend&gt;Personal Information&lt;/legend&gt;\n\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;label for=&quot;fullname&quot;&gt;Full name &lt;span aria-hidden=&quot;true&quot;&gt;*&lt;/span&gt;&lt;/label&gt;\n      &lt;input\n        type=&quot;text&quot;\n        id=&quot;fullname&quot;\n        name=&quot;fullname&quot;\n        autocomplete=&quot;name&quot;\n        required\n        minlength=&quot;2&quot;\n        maxlength=&quot;100&quot;\n        aria-required=&quot;true&quot;\n        aria-describedby=&quot;fullname-hint&quot;\n      &gt;\n      &lt;span id=&quot;fullname-hint&quot; class=&quot;hint&quot;&gt;First and last name&lt;/span&gt;\n    &lt;/div&gt;\n\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;label for=&quot;email&quot;&gt;Email address&lt;/label&gt;\n      &lt;input\n        type=&quot;email&quot;\n        id=&quot;email&quot;\n        name=&quot;email&quot;\n        autocomplete=&quot;email&quot;\n        required\n        inputmode=&quot;email&quot;\n        aria-required=&quot;true&quot;\n      &gt;\n    &lt;/div&gt;\n\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;label for=&quot;password&quot;&gt;Password&lt;/label&gt;\n      &lt;input\n        type=&quot;password&quot;\n        id=&quot;password&quot;\n        name=&quot;password&quot;\n        autocomplete=&quot;new-password&quot;\n        required\n        minlength=&quot;12&quot;\n        aria-describedby=&quot;password-requirements&quot;\n      &gt;\n      &lt;ul id=&quot;password-requirements&quot; class=&quot;hint&quot;&gt;\n        &lt;li&gt;At least 12 characters&lt;/li&gt;\n        &lt;li&gt;Include a number and symbol&lt;/li&gt;\n      &lt;/ul&gt;\n    &lt;/div&gt;\n\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;label for=&quot;birthdate&quot;&gt;Date of birth&lt;/label&gt;\n      &lt;input\n        type=&quot;date&quot;\n        id=&quot;birthdate&quot;\n        name=&quot;birthdate&quot;\n        autocomplete=&quot;bday&quot;\n        min=&quot;1900-01-01&quot;\n        max=&quot;2010-12-31&quot;\n      &gt;\n    &lt;/div&gt;\n\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;label for=&quot;country&quot;&gt;Country&lt;/label&gt;\n      &lt;select id=&quot;country&quot; name=&quot;country&quot; autocomplete=&quot;country&quot;&gt;\n        &lt;option value=&quot;&quot;&gt;Select a country&lt;/option&gt;\n        &lt;option value=&quot;US&quot;&gt;United States&lt;/option&gt;\n        &lt;option value=&quot;UK&quot;&gt;United Kingdom&lt;/option&gt;\n        &lt;option value=&quot;CA&quot;&gt;Canada&lt;/option&gt;\n      &lt;/select&gt;\n    &lt;/div&gt;\n\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;label for=&quot;bio&quot;&gt;Bio&lt;/label&gt;\n      &lt;textarea\n        id=&quot;bio&quot;\n        name=&quot;bio&quot;\n        rows=&quot;4&quot;\n        maxlength=&quot;500&quot;\n        placeholder=&quot;Tell us a bit about yourself...&quot;\n        aria-describedby=&quot;bio-counter&quot;\n      &gt;&lt;/textarea&gt;\n      &lt;span id=&quot;bio-counter&quot; class=&quot;hint&quot;&gt;0 / 500&lt;/span&gt;\n    &lt;/div&gt;\n  &lt;/fieldset&gt;\n\n  &lt;fieldset&gt;\n    &lt;legend&gt;Preferences&lt;/legend&gt;\n\n    &lt;!-- Radio buttons: one value from a group --&gt;\n    &lt;div class=&quot;field&quot; role=&quot;group&quot; aria-labelledby=&quot;plan-label&quot;&gt;\n      &lt;span id=&quot;plan-label&quot;&gt;Subscription plan&lt;/span&gt;\n\n      &lt;label&gt;\n        &lt;input type=&quot;radio&quot; name=&quot;plan&quot; value=&quot;free&quot; checked&gt;\n        Free\n      &lt;/label&gt;\n      &lt;label&gt;\n        &lt;input type=&quot;radio&quot; name=&quot;plan&quot; value=&quot;pro&quot;&gt;\n        Pro ($9/mo)\n      &lt;/label&gt;\n    &lt;/div&gt;\n\n    &lt;!-- Checkboxes: multiple values --&gt;\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;label&gt;\n        &lt;input type=&quot;checkbox&quot; name=&quot;newsletter&quot; value=&quot;yes&quot;&gt;\n        Subscribe to newsletter\n      &lt;/label&gt;\n    &lt;/div&gt;\n\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;label&gt;\n        &lt;input type=&quot;checkbox&quot; name=&quot;terms&quot; required aria-required=&quot;true&quot;&gt;\n        I agree to the &lt;a href=&quot;/terms&quot;&gt;Terms of Service&lt;/a&gt;\n      &lt;/label&gt;\n    &lt;/div&gt;\n  &lt;/fieldset&gt;\n\n  &lt;button type=&quot;submit&quot;&gt;Create account&lt;/button&gt;\n&lt;/form&gt;\n</code></pre>\n<h3>Input Types That Trigger Mobile Keyboards</h3>\n<pre><code class=\"language-html\">&lt;!-- Standard text keyboard --&gt;\n&lt;input type=&quot;text&quot;&gt;\n\n&lt;!-- Email keyboard (@ symbol prominent) --&gt;\n&lt;input type=&quot;email&quot;&gt;\n\n&lt;!-- Number pad --&gt;\n&lt;input type=&quot;tel&quot;&gt;\n&lt;input type=&quot;number&quot;&gt;\n\n&lt;!-- Decimal keyboard --&gt;\n&lt;input inputmode=&quot;decimal&quot;&gt;\n\n&lt;!-- URL keyboard (/ and .com prominent) --&gt;\n&lt;input type=&quot;url&quot;&gt;\n\n&lt;!-- Search keyboard (search button) --&gt;\n&lt;input type=&quot;search&quot;&gt;\n</code></pre>\n<p>Always use the right <code>type</code> — even if you do custom validation. The mobile keyboard experience alone is worth it.</p>\n<hr>\n"
            }
          },
          {
            "id": "t18",
            "title": "Accessibility (ARIA)",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>Accessibility isn&#39;t optional. It&#39;s a legal requirement in many countries (ADA in the US, EN 301 549 in the EU) and affects roughly 15% of the population.</p>\n<h3>The Accessibility Tree</h3>\n<p>Alongside the DOM, browsers build an <strong>accessibility tree</strong> — a parallel structure that assistive technologies (screen readers, voice control software, braille displays) interact with.</p>\n<p>Semantic HTML populates this tree automatically. <code>&lt;button&gt;</code> is already a button. <code>&lt;h1&gt;</code> is already a heading. ARIA (Accessible Rich Internet Applications) is for when native HTML semantics aren&#39;t enough.</p>\n<h3>ARIA Roles, Properties, and States</h3>\n<pre><code class=\"language-html\">&lt;!-- Roles: what is this element? --&gt;\n&lt;div role=&quot;button&quot; tabindex=&quot;0&quot;&gt;Click me&lt;/div&gt;  &lt;!-- Better: just use &lt;button&gt; --&gt;\n\n&lt;div role=&quot;alert&quot; aria-live=&quot;assertive&quot;&gt;\n  Error: Invalid email address  &lt;!-- Announced immediately by screen readers --&gt;\n&lt;/div&gt;\n\n&lt;div role=&quot;status&quot; aria-live=&quot;polite&quot;&gt;\n  Changes saved  &lt;!-- Announced at next opportunity --&gt;\n&lt;/div&gt;\n\n&lt;!-- Properties: describe the element --&gt;\n&lt;input aria-label=&quot;Search the site&quot;&gt;  &lt;!-- Visible label not present --&gt;\n&lt;input aria-labelledby=&quot;label-id&quot;&gt;    &lt;!-- Point to visible label element --&gt;\n&lt;input aria-describedby=&quot;hint-id&quot;&gt;   &lt;!-- Point to description text --&gt;\n&lt;input aria-required=&quot;true&quot;&gt;\n&lt;input aria-invalid=&quot;true&quot; aria-errormessage=&quot;error-id&quot;&gt;\n\n&lt;!-- States: current condition (can change dynamically) --&gt;\n&lt;button aria-expanded=&quot;false&quot;&gt;Menu&lt;/button&gt;\n&lt;button aria-pressed=&quot;true&quot;&gt;Bold&lt;/button&gt;\n&lt;li aria-selected=&quot;true&quot;&gt;Option 1&lt;/li&gt;\n&lt;div aria-hidden=&quot;true&quot;&gt;Decorative content&lt;/div&gt;  &lt;!-- Hide from screen readers --&gt;\n&lt;div aria-busy=&quot;true&quot;&gt;Loading...&lt;/div&gt;\n</code></pre>\n<h3>Practical Patterns</h3>\n<p><strong>Skip navigation</strong> (critical for keyboard users):</p>\n<pre><code class=\"language-html\">&lt;!-- First element in body --&gt;\n&lt;a href=&quot;#main-content&quot; class=&quot;skip-link&quot;&gt;Skip to main content&lt;/a&gt;\n\n&lt;header&gt;...&lt;/header&gt;\n\n&lt;main id=&quot;main-content&quot; tabindex=&quot;-1&quot;&gt;\n  &lt;!-- Content --&gt;\n&lt;/main&gt;\n\n&lt;style&gt;\n.skip-link {\n  position: absolute;\n  transform: translateY(-100%);\n  left: 1rem;\n  top: 1rem;\n  transition: transform 0.2s;\n}\n.skip-link:focus {\n  transform: translateY(0);\n  background: white;\n  padding: 0.5rem 1rem;\n  z-index: 1000;\n}\n&lt;/style&gt;\n</code></pre>\n<p><strong>Accessible modal</strong>:</p>\n<pre><code class=\"language-html\">&lt;dialog\n  id=&quot;confirm-modal&quot;\n  aria-labelledby=&quot;modal-title&quot;\n  aria-describedby=&quot;modal-desc&quot;\n&gt;\n  &lt;h2 id=&quot;modal-title&quot;&gt;Delete account&lt;/h2&gt;\n  &lt;p id=&quot;modal-desc&quot;&gt;\n    This will permanently delete your account and all associated data.\n    This cannot be undone.\n  &lt;/p&gt;\n  &lt;button onclick=&quot;document.getElementById(&#39;confirm-modal&#39;).close()&quot;&gt;Cancel&lt;/button&gt;\n  &lt;button onclick=&quot;deleteAccount()&quot;&gt;Delete account&lt;/button&gt;\n&lt;/dialog&gt;\n</code></pre>\n<p>The <code>&lt;dialog&gt;</code> element handles focus trapping, escape key, and ARIA attributes automatically. Use it instead of building your own.</p>\n<p><strong>Focus management for dynamic content</strong>:</p>\n<pre><code class=\"language-javascript\">// When showing an error or dynamic content, move focus to it\nfunction showError(message) {\n  const errorEl = document.getElementById(&#39;error-message&#39;);\n  errorEl.textContent = message;\n  errorEl.removeAttribute(&#39;hidden&#39;);\n  errorEl.focus(); // Move keyboard focus here\n}\n</code></pre>\n<h3>The Four Principles (POUR)</h3>\n<p>Good accessibility follows POUR:</p>\n<ul>\n<li><strong>Perceivable</strong>: Users can perceive all content (alt text, captions, sufficient contrast)</li>\n<li><strong>Operable</strong>: Everything is keyboard navigable, no timing traps</li>\n<li><strong>Understandable</strong>: Clear language, predictable behavior, helpful error messages</li>\n<li><strong>Robust</strong>: Works with current and future assistive technologies</li>\n</ul>\n<hr>\n"
            }
          },
          {
            "id": "t19",
            "title": "Meta Tags & SEO Basics",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-html\">&lt;head&gt;\n  &lt;!-- Basic SEO --&gt;\n  &lt;title&gt;How to Build a REST API in Node.js — DevGuide&lt;/title&gt;\n  &lt;meta name=&quot;description&quot; content=&quot;Step-by-step tutorial for building a production-ready REST API with Node.js, Express, and PostgreSQL. Includes authentication, validation, and deployment.&quot;&gt;\n  &lt;link rel=&quot;canonical&quot; href=&quot;https://devguide.io/rest-api-nodejs&quot;&gt;\n\n  &lt;!-- Open Graph (Facebook, LinkedIn, Slack previews) --&gt;\n  &lt;meta property=&quot;og:title&quot; content=&quot;How to Build a REST API in Node.js&quot;&gt;\n  &lt;meta property=&quot;og:description&quot; content=&quot;Step-by-step tutorial for building a production-ready REST API...&quot;&gt;\n  &lt;meta property=&quot;og:image&quot; content=&quot;https://devguide.io/og/rest-api-nodejs.png&quot;&gt;\n  &lt;meta property=&quot;og:url&quot; content=&quot;https://devguide.io/rest-api-nodejs&quot;&gt;\n  &lt;meta property=&quot;og:type&quot; content=&quot;article&quot;&gt;\n  &lt;meta property=&quot;og:site_name&quot; content=&quot;DevGuide&quot;&gt;\n\n  &lt;!-- Twitter Card --&gt;\n  &lt;meta name=&quot;twitter:card&quot; content=&quot;summary_large_image&quot;&gt;\n  &lt;meta name=&quot;twitter:site&quot; content=&quot;@devguide&quot;&gt;\n  &lt;meta name=&quot;twitter:title&quot; content=&quot;How to Build a REST API in Node.js&quot;&gt;\n  &lt;meta name=&quot;twitter:description&quot; content=&quot;Step-by-step tutorial...&quot;&gt;\n  &lt;meta name=&quot;twitter:image&quot; content=&quot;https://devguide.io/og/rest-api-nodejs.png&quot;&gt;\n\n  &lt;!-- Article-specific --&gt;\n  &lt;meta property=&quot;article:published_time&quot; content=&quot;2025-03-07T00:00:00Z&quot;&gt;\n  &lt;meta property=&quot;article:author&quot; content=&quot;https://devguide.io/authors/alice&quot;&gt;\n&lt;/head&gt;\n</code></pre>\n<h3>What Actually Affects Rankings</h3>\n<p>Search engines are opaque, but some things are well-established:</p>\n<ul>\n<li><strong>Page speed</strong> — Core Web Vitals (LCP, CLS, FID/INP) are ranking factors</li>\n<li><strong>Mobile usability</strong> — Google indexes mobile-first</li>\n<li><strong>Semantic HTML</strong> — Helps Google understand your content structure</li>\n<li><strong>Internal linking</strong> — Helps Google discover and understand relationships between pages</li>\n<li><strong>Title and description</strong> — These appear in search results; write them for humans</li>\n<li><strong>Structured data</strong> — Enables rich results (star ratings, FAQs, recipes in search results)</li>\n</ul>\n<p>What doesn&#39;t matter as much as people think: keyword density, meta keywords (ignored), H1 count (one is fine, not mandatory).</p>\n<hr>\n"
            }
          },
          {
            "id": "t20",
            "title": "Images & Media",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-html\">&lt;!-- Basic image with required alt text --&gt;\n&lt;img src=&quot;hero.jpg&quot; alt=&quot;Engineer reviewing code on dual monitors in a modern office&quot;&gt;\n\n&lt;!-- Decorative image: empty alt so screen readers skip it --&gt;\n&lt;img src=&quot;divider.svg&quot; alt=&quot;&quot;&gt;\n\n&lt;!-- Responsive image: different sizes for different screens --&gt;\n&lt;img\n  src=&quot;photo-800.jpg&quot;\n  srcset=&quot;photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w&quot;\n  sizes=&quot;(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px&quot;\n  alt=&quot;Team photo from the 2024 offsite&quot;\n  width=&quot;800&quot;\n  height=&quot;533&quot;\n  loading=&quot;lazy&quot;\n  decoding=&quot;async&quot;\n&gt;\n\n&lt;!-- Modern format with fallback --&gt;\n&lt;picture&gt;\n  &lt;source srcset=&quot;hero.avif&quot; type=&quot;image/avif&quot;&gt;\n  &lt;source srcset=&quot;hero.webp&quot; type=&quot;image/webp&quot;&gt;\n  &lt;img src=&quot;hero.jpg&quot; alt=&quot;...&quot; width=&quot;1200&quot; height=&quot;800&quot;&gt;\n&lt;/picture&gt;\n\n&lt;!-- Art direction: different image for mobile vs desktop --&gt;\n&lt;picture&gt;\n  &lt;source\n    media=&quot;(min-width: 800px)&quot;\n    srcset=&quot;hero-desktop.webp&quot;\n  &gt;\n  &lt;img src=&quot;hero-mobile.webp&quot; alt=&quot;...&quot; width=&quot;400&quot; height=&quot;400&quot;&gt;\n&lt;/picture&gt;\n\n&lt;!-- Video --&gt;\n&lt;video\n  controls\n  width=&quot;1280&quot;\n  height=&quot;720&quot;\n  poster=&quot;thumbnail.jpg&quot;\n  preload=&quot;metadata&quot;\n&gt;\n  &lt;source src=&quot;video.webm&quot; type=&quot;video/webm&quot;&gt;\n  &lt;source src=&quot;video.mp4&quot; type=&quot;video/mp4&quot;&gt;\n  &lt;track kind=&quot;subtitles&quot; src=&quot;captions.vtt&quot; srclang=&quot;en&quot; label=&quot;English&quot; default&gt;\n  &lt;!-- Fallback for browsers that don&#39;t support video --&gt;\n  &lt;p&gt;Your browser doesn&#39;t support HTML5 video. &lt;a href=&quot;video.mp4&quot;&gt;Download it&lt;/a&gt;.&lt;/p&gt;\n&lt;/video&gt;\n</code></pre>\n<p><strong>Always specify <code>width</code> and <code>height</code></strong> on images — even for responsive images. This prevents layout shift (a Core Web Vitals metric) because the browser reserves space before the image loads.</p>\n<p><strong><code>loading=&quot;lazy&quot;</code></strong> defers loading offscreen images until the user scrolls near them. Use this for everything below the fold.</p>\n<hr>\n"
            }
          },
          {
            "id": "t21",
            "title": "HTML Performance Best Practices",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-html\">&lt;!DOCTYPE html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n  &lt;!-- 1. Preconnect to external origins you&#39;ll use soon --&gt;\n  &lt;link rel=&quot;preconnect&quot; href=&quot;https://fonts.googleapis.com&quot;&gt;\n  &lt;link rel=&quot;preconnect&quot; href=&quot;https://fonts.gstatic.com&quot; crossorigin&gt;\n\n  &lt;!-- 2. Preload critical resources --&gt;\n  &lt;link rel=&quot;preload&quot; href=&quot;/fonts/inter-var.woff2&quot; as=&quot;font&quot; type=&quot;font/woff2&quot; crossorigin&gt;\n  &lt;link rel=&quot;preload&quot; href=&quot;/css/critical.css&quot; as=&quot;style&quot;&gt;\n\n  &lt;!-- 3. Critical CSS inline (eliminates render-blocking) --&gt;\n  &lt;style&gt;\n    /* Just what&#39;s needed for above-the-fold content */\n    body { margin: 0; font-family: Inter, sans-serif; }\n    header { background: #1a1a2e; color: white; padding: 1rem; }\n  &lt;/style&gt;\n\n  &lt;!-- 4. Main stylesheet loads non-blocking with this trick --&gt;\n  &lt;link rel=&quot;stylesheet&quot; href=&quot;/css/main.css&quot; media=&quot;print&quot; onload=&quot;this.media=&#39;all&#39;&quot;&gt;\n  &lt;noscript&gt;&lt;link rel=&quot;stylesheet&quot; href=&quot;/css/main.css&quot;&gt;&lt;/noscript&gt;\n\n  &lt;!-- 5. Prefetch next-page resources --&gt;\n  &lt;link rel=&quot;prefetch&quot; href=&quot;/js/dashboard.js&quot;&gt;\n\n  &lt;title&gt;...&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;!-- 6. Above-the-fold images: don&#39;t lazy load --&gt;\n  &lt;img src=&quot;hero.jpg&quot; alt=&quot;...&quot; width=&quot;1200&quot; height=&quot;600&quot;&gt;\n\n  &lt;!-- 7. Below-the-fold images: lazy load --&gt;\n  &lt;img src=&quot;feature.jpg&quot; alt=&quot;...&quot; loading=&quot;lazy&quot; width=&quot;600&quot; height=&quot;400&quot;&gt;\n\n  &lt;!-- 8. Scripts at the end with defer/async --&gt;\n  &lt;script src=&quot;/js/app.js&quot; defer&gt;&lt;/script&gt;\n  &lt;script src=&quot;https://analytics.example.com/analytics.js&quot; async&gt;&lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t22",
            "title": "Mini Project: Semantic Blog Article Page",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "htmlContent": "<p>Here&#39;s a complete, accessible, well-structured HTML page — no CSS yet, just clean markup:</p>\n<pre><code class=\"language-html\">&lt;!DOCTYPE html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n  &lt;meta charset=&quot;UTF-8&quot;&gt;\n  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n  &lt;meta name=&quot;description&quot; content=&quot;A deep dive into how JavaScript&#39;s event loop works, with visual diagrams and real-world examples.&quot;&gt;\n\n  &lt;title&gt;Understanding the JavaScript Event Loop — DevGuide&lt;/title&gt;\n\n  &lt;link rel=&quot;canonical&quot; href=&quot;https://devguide.io/javascript-event-loop&quot;&gt;\n\n  &lt;meta property=&quot;og:title&quot; content=&quot;Understanding the JavaScript Event Loop&quot;&gt;\n  &lt;meta property=&quot;og:description&quot; content=&quot;A deep dive into how JavaScript&#39;s event loop works.&quot;&gt;\n  &lt;meta property=&quot;og:image&quot; content=&quot;https://devguide.io/og/event-loop.png&quot;&gt;\n  &lt;meta property=&quot;og:type&quot; content=&quot;article&quot;&gt;\n\n  &lt;!-- Structured data for rich search results --&gt;\n  &lt;script type=&quot;application/ld+json&quot;&gt;\n  {\n    &quot;@context&quot;: &quot;https://schema.org&quot;,\n    &quot;@type&quot;: &quot;TechArticle&quot;,\n    &quot;headline&quot;: &quot;Understanding the JavaScript Event Loop&quot;,\n    &quot;description&quot;: &quot;A deep dive into how JavaScript&#39;s event loop works&quot;,\n    &quot;author&quot;: {\n      &quot;@type&quot;: &quot;Person&quot;,\n      &quot;name&quot;: &quot;Alice Chen&quot;,\n      &quot;url&quot;: &quot;https://devguide.io/authors/alice&quot;\n    },\n    &quot;datePublished&quot;: &quot;2025-03-07&quot;,\n    &quot;dateModified&quot;: &quot;2025-03-07&quot;,\n    &quot;publisher&quot;: {\n      &quot;@type&quot;: &quot;Organization&quot;,\n      &quot;name&quot;: &quot;DevGuide&quot;,\n      &quot;url&quot;: &quot;https://devguide.io&quot;\n    }\n  }\n  &lt;/script&gt;\n&lt;/head&gt;\n&lt;body&gt;\n\n  &lt;!-- Skip to main content for keyboard users --&gt;\n  &lt;a href=&quot;#main-content&quot; class=&quot;skip-link&quot;&gt;Skip to main content&lt;/a&gt;\n\n  &lt;header&gt;\n    &lt;a href=&quot;/&quot; aria-label=&quot;DevGuide — home&quot;&gt;\n      &lt;span aria-hidden=&quot;true&quot;&gt;⚡&lt;/span&gt; DevGuide\n    &lt;/a&gt;\n\n    &lt;nav aria-label=&quot;Main navigation&quot;&gt;\n      &lt;ul&gt;\n        &lt;li&gt;&lt;a href=&quot;/tutorials&quot;&gt;Tutorials&lt;/a&gt;&lt;/li&gt;\n        &lt;li&gt;&lt;a href=&quot;/reference&quot;&gt;Reference&lt;/a&gt;&lt;/li&gt;\n        &lt;li&gt;&lt;a href=&quot;/newsletter&quot;&gt;Newsletter&lt;/a&gt;&lt;/li&gt;\n      &lt;/ul&gt;\n    &lt;/nav&gt;\n\n    &lt;button type=&quot;button&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;search-panel&quot;&gt;\n      Search\n    &lt;/button&gt;\n  &lt;/header&gt;\n\n  &lt;div id=&quot;search-panel&quot; hidden role=&quot;search&quot;&gt;\n    &lt;form action=&quot;/search&quot;&gt;\n      &lt;label for=&quot;site-search&quot;&gt;Search DevGuide&lt;/label&gt;\n      &lt;input\n        type=&quot;search&quot;\n        id=&quot;site-search&quot;\n        name=&quot;q&quot;\n        placeholder=&quot;e.g. async/await, closures...&quot;\n        autocomplete=&quot;off&quot;\n      &gt;\n      &lt;button type=&quot;submit&quot;&gt;Search&lt;/button&gt;\n    &lt;/form&gt;\n  &lt;/div&gt;\n\n  &lt;div class=&quot;layout&quot;&gt;\n\n    &lt;main id=&quot;main-content&quot; tabindex=&quot;-1&quot;&gt;\n\n      &lt;article&gt;\n        &lt;header&gt;\n          &lt;nav aria-label=&quot;Breadcrumb&quot;&gt;\n            &lt;ol&gt;\n              &lt;li&gt;&lt;a href=&quot;/&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;\n              &lt;li&gt;&lt;a href=&quot;/tutorials&quot;&gt;Tutorials&lt;/a&gt;&lt;/li&gt;\n              &lt;li&gt;&lt;a href=&quot;/tutorials/javascript&quot;&gt;JavaScript&lt;/a&gt;&lt;/li&gt;\n              &lt;li aria-current=&quot;page&quot;&gt;Event Loop&lt;/li&gt;\n            &lt;/ol&gt;\n          &lt;/nav&gt;\n\n          &lt;div class=&quot;tags&quot; aria-label=&quot;Article tags&quot;&gt;\n            &lt;a href=&quot;/tag/javascript&quot; rel=&quot;tag&quot;&gt;JavaScript&lt;/a&gt;\n            &lt;a href=&quot;/tag/async&quot; rel=&quot;tag&quot;&gt;Async&lt;/a&gt;\n            &lt;a href=&quot;/tag/performance&quot; rel=&quot;tag&quot;&gt;Performance&lt;/a&gt;\n          &lt;/div&gt;\n\n          &lt;h1&gt;Understanding the JavaScript Event Loop&lt;/h1&gt;\n\n          &lt;p class=&quot;subtitle&quot;&gt;\n            Why your code runs in an order you didn&#39;t expect — and how to use\n            that to your advantage.\n          &lt;/p&gt;\n\n          &lt;div class=&quot;byline&quot;&gt;\n            &lt;img\n              src=&quot;/authors/alice-chen.jpg&quot;\n              alt=&quot;&quot;\n              width=&quot;48&quot;\n              height=&quot;48&quot;\n              aria-hidden=&quot;true&quot;\n            &gt;\n            &lt;div&gt;\n              By &lt;a href=&quot;/authors/alice&quot; rel=&quot;author&quot;&gt;Alice Chen&lt;/a&gt;\n              &lt;br&gt;\n              &lt;time datetime=&quot;2025-03-07&quot;&gt;March 7, 2025&lt;/time&gt;\n              · 12 min read\n              · Updated &lt;time datetime=&quot;2025-03-10&quot;&gt;March 10, 2025&lt;/time&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/header&gt;\n\n        &lt;!-- Table of contents --&gt;\n        &lt;nav aria-labelledby=&quot;toc-heading&quot;&gt;\n          &lt;h2 id=&quot;toc-heading&quot;&gt;Contents&lt;/h2&gt;\n          &lt;ol&gt;\n            &lt;li&gt;&lt;a href=&quot;#the-single-thread&quot;&gt;The Single Thread&lt;/a&gt;&lt;/li&gt;\n            &lt;li&gt;&lt;a href=&quot;#call-stack&quot;&gt;The Call Stack&lt;/a&gt;&lt;/li&gt;\n            &lt;li&gt;&lt;a href=&quot;#event-loop&quot;&gt;The Event Loop&lt;/a&gt;&lt;/li&gt;\n            &lt;li&gt;&lt;a href=&quot;#microtasks&quot;&gt;Microtasks vs Macrotasks&lt;/a&gt;&lt;/li&gt;\n            &lt;li&gt;&lt;a href=&quot;#real-world&quot;&gt;Real-World Implications&lt;/a&gt;&lt;/li&gt;\n          &lt;/ol&gt;\n        &lt;/nav&gt;\n\n        &lt;!-- Article body --&gt;\n        &lt;section id=&quot;the-single-thread&quot;&gt;\n          &lt;h2&gt;The Single Thread&lt;/h2&gt;\n          &lt;p&gt;\n            JavaScript runs on a single thread. One operation at a time, no\n            exceptions. This seems like a severe limitation — but the event loop\n            makes it work remarkably well for I/O-heavy applications like web UIs.\n          &lt;/p&gt;\n\n          &lt;figure&gt;\n            &lt;img\n              src=&quot;/images/single-thread-diagram.png&quot;\n              alt=&quot;Diagram showing JavaScript&#39;s single thread processing one task at a time, compared to multi-threaded languages handling multiple tasks simultaneously&quot;\n              width=&quot;800&quot;\n              height=&quot;400&quot;\n              loading=&quot;lazy&quot;\n            &gt;\n            &lt;figcaption&gt;\n              JavaScript&#39;s single thread vs multi-threaded execution.\n              While one thread handles tasks sequentially, the event loop\n              ensures I/O operations don&#39;t block it.\n            &lt;/figcaption&gt;\n          &lt;/figure&gt;\n        &lt;/section&gt;\n\n        &lt;section id=&quot;call-stack&quot;&gt;\n          &lt;h2&gt;The Call Stack&lt;/h2&gt;\n          &lt;p&gt;\n            When your code calls a function, it goes onto the call stack.\n            When a function returns, it comes off the stack.\n          &lt;/p&gt;\n\n          &lt;figure&gt;\n            &lt;pre&gt;&lt;code&gt;function greet(name) {\n  return `Hello, ${name}`;\n}\n\nfunction main() {\n  const message = greet(&#39;World&#39;);\n  console.log(message);\n}\n\nmain();&lt;/code&gt;&lt;/pre&gt;\n            &lt;figcaption&gt;\n              &lt;code&gt;main()&lt;/code&gt; is pushed first, then &lt;code&gt;greet()&lt;/code&gt;,\n              then &lt;code&gt;console.log()&lt;/code&gt;. Each pops off when it returns.\n            &lt;/figcaption&gt;\n          &lt;/figure&gt;\n\n          &lt;p&gt;\n            If the call stack gets too deep (infinite recursion, for example),\n            you get a &lt;strong&gt;stack overflow&lt;/strong&gt;. Modern engines typically\n            allow 10,000–15,000 stack frames before throwing a\n            &lt;code&gt;RangeError: Maximum call stack size exceeded&lt;/code&gt;.\n          &lt;/p&gt;\n        &lt;/section&gt;\n\n        &lt;!-- Comments section --&gt;\n        &lt;section aria-labelledby=&quot;comments-heading&quot;&gt;\n          &lt;h2 id=&quot;comments-heading&quot;&gt;Comments &lt;span&gt;(24)&lt;/span&gt;&lt;/h2&gt;\n\n          &lt;form aria-label=&quot;Post a comment&quot; novalidate&gt;\n            &lt;div class=&quot;field&quot;&gt;\n              &lt;label for=&quot;comment-name&quot;&gt;Name&lt;/label&gt;\n              &lt;input type=&quot;text&quot; id=&quot;comment-name&quot; name=&quot;name&quot; required autocomplete=&quot;name&quot;&gt;\n            &lt;/div&gt;\n            &lt;div class=&quot;field&quot;&gt;\n              &lt;label for=&quot;comment-body&quot;&gt;Comment&lt;/label&gt;\n              &lt;textarea\n                id=&quot;comment-body&quot;\n                name=&quot;body&quot;\n                required\n                rows=&quot;5&quot;\n                maxlength=&quot;2000&quot;\n              &gt;&lt;/textarea&gt;\n            &lt;/div&gt;\n            &lt;button type=&quot;submit&quot;&gt;Post comment&lt;/button&gt;\n          &lt;/form&gt;\n\n          &lt;ol aria-label=&quot;Comments&quot; class=&quot;comments&quot;&gt;\n            &lt;li id=&quot;comment-1&quot;&gt;\n              &lt;article aria-labelledby=&quot;comment-1-author&quot;&gt;\n                &lt;header&gt;\n                  &lt;strong id=&quot;comment-1-author&quot;&gt;Bob Smith&lt;/strong&gt;\n                  &lt;time datetime=&quot;2025-03-08T14:22:00Z&quot;&gt;March 8, 2025&lt;/time&gt;\n                &lt;/header&gt;\n                &lt;p&gt;Great explanation! The microtask/macrotask distinction finally clicked for me.&lt;/p&gt;\n                &lt;footer&gt;\n                  &lt;button type=&quot;button&quot; aria-label=&quot;Reply to Bob Smith&quot;&gt;Reply&lt;/button&gt;\n                  &lt;button type=&quot;button&quot; aria-label=&quot;Like Bob Smith&#39;s comment (12 likes)&quot; aria-pressed=&quot;false&quot;&gt;\n                    ♥ 12\n                  &lt;/button&gt;\n                &lt;/footer&gt;\n              &lt;/article&gt;\n            &lt;/li&gt;\n          &lt;/ol&gt;\n        &lt;/section&gt;\n      &lt;/article&gt;\n\n    &lt;/main&gt;\n\n    &lt;aside aria-labelledby=&quot;sidebar-heading&quot;&gt;\n      &lt;h2 id=&quot;sidebar-heading&quot;&gt;Related articles&lt;/h2&gt;\n      &lt;nav aria-label=&quot;Related articles&quot;&gt;\n        &lt;ul&gt;\n          &lt;li&gt;\n            &lt;a href=&quot;/async-await&quot;&gt;\n              &lt;article&gt;\n                &lt;h3&gt;Async/Await Deep Dive&lt;/h3&gt;\n                &lt;p&gt;The syntax that made promises readable.&lt;/p&gt;\n              &lt;/article&gt;\n            &lt;/a&gt;\n          &lt;/li&gt;\n          &lt;li&gt;\n            &lt;a href=&quot;/web-workers&quot;&gt;\n              &lt;article&gt;\n                &lt;h3&gt;Web Workers&lt;/h3&gt;\n                &lt;p&gt;Escape the single thread for CPU-intensive work.&lt;/p&gt;\n              &lt;/article&gt;\n            &lt;/a&gt;\n          &lt;/li&gt;\n        &lt;/ul&gt;\n      &lt;/nav&gt;\n    &lt;/aside&gt;\n\n  &lt;/div&gt;\n\n  &lt;footer&gt;\n    &lt;nav aria-label=&quot;Footer navigation&quot;&gt;\n      &lt;ul&gt;\n        &lt;li&gt;&lt;a href=&quot;/about&quot;&gt;About&lt;/a&gt;&lt;/li&gt;\n        &lt;li&gt;&lt;a href=&quot;/contact&quot;&gt;Contact&lt;/a&gt;&lt;/li&gt;\n        &lt;li&gt;&lt;a href=&quot;/privacy&quot;&gt;Privacy Policy&lt;/a&gt;&lt;/li&gt;\n        &lt;li&gt;&lt;a href=&quot;/rss.xml&quot; type=&quot;application/rss+xml&quot;&gt;RSS Feed&lt;/a&gt;&lt;/li&gt;\n      &lt;/ul&gt;\n    &lt;/nav&gt;\n    &lt;p&gt;\n      &lt;small&gt;© 2025 DevGuide. Written by developers, for developers.&lt;/small&gt;\n    &lt;/p&gt;\n  &lt;/footer&gt;\n\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n<p>This is the kind of HTML that makes accessibility auditors happy, search engines understand your content, and future developers (including you) appreciate.</p>\n<hr>\n"
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t23",
            "title": "Build form validation",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Build form validation",
              "desc": "Put your knowledge to the test by implementing \"Build form validation\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/html-1"
            }
          },
          {
            "id": "t24",
            "title": "Accessible navigation",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Accessible navigation",
              "desc": "Put your knowledge to the test by implementing \"Accessible navigation\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/html-2"
            }
          },
          {
            "id": "t25",
            "title": "Semantic blog page",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Semantic blog page",
              "desc": "Put your knowledge to the test by implementing \"Semantic blog page\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/html-3"
            }
          }
        ]
      }
    ]
  },
  "css": {
    "id": "css",
    "title": "CSS (Styling & Layout)",
    "description": "Learn CSS styling and layout.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t26",
            "title": "CSS Fundamentals",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<h3>How CSS Works</h3>\n<p>A CSS rule has two parts: a <strong>selector</strong> (which elements to target) and a <strong>declaration block</strong> (what to do to them):</p>\n<pre><code class=\"language-css\">/* selector    property   value */\n   h1        { color:     #1a1a2e; }\n\n/* Multiple declarations */\n.card {\n  background-color: white;\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n</code></pre>\n<p>CSS is applied <strong>in cascade</strong> — if multiple rules target the same element and set the same property, the winner is determined by: importance → specificity → order in source.</p>\n<hr>\n"
            }
          },
          {
            "id": "t27",
            "title": "Selectors",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-css\">/* ——— Basic selectors ——— */\n*             { }  /* Universal: every element */\ndiv           { }  /* Type: all &lt;div&gt; elements */\n.card         { }  /* Class */\n#header       { }  /* ID (avoid for styling — high specificity) */\n\n/* ——— Combinators ——— */\nnav a         { }  /* Descendant: &lt;a&gt; anywhere inside &lt;nav&gt; */\nnav &gt; a       { }  /* Child: &lt;a&gt; that is a direct child of &lt;nav&gt; */\nh1 + p        { }  /* Adjacent sibling: &lt;p&gt; immediately after &lt;h1&gt; */\nh1 ~ p        { }  /* General sibling: all &lt;p&gt; after &lt;h1&gt; */\n\n/* ——— Attribute selectors ——— */\n[type=&quot;text&quot;]      { }  /* Exact attribute value */\n[href^=&quot;https&quot;]    { }  /* Starts with */\n[href$=&quot;.pdf&quot;]     { }  /* Ends with */\n[class*=&quot;icon-&quot;]   { }  /* Contains */\n\n/* ——— Pseudo-classes ——— */\na:hover            { }  /* Mouse over */\na:focus            { }  /* Keyboard focus */\na:focus-visible    { }  /* Focus via keyboard (not mouse) */\na:active           { }  /* Being clicked */\na:visited          { }  /* Already visited */\n\nbutton:disabled    { }\ninput:checked      { }\ninput:valid        { }\ninput:invalid      { }\ninput:placeholder-shown { }\n\nli:first-child     { }\nli:last-child      { }\nli:nth-child(2)    { }   /* Specific index */\nli:nth-child(odd)  { }\nli:nth-child(2n+1) { }   /* Every other, starting at 1 */\nli:nth-child(3n)   { }   /* Every 3rd */\nli:not(.disabled)  { }   /* Negation */\n\n/* ——— Pseudo-elements ——— */\np::before          { content: &#39;&#39;; }  /* Before content */\np::after           { content: &#39;&#39;; }  /* After content */\np::first-line      { }\np::first-letter    { }\n::placeholder      { }  /* Input placeholder text */\n::selection        { }  /* Selected text */\n::marker           { }  /* List bullet/number */\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t28",
            "title": "Specificity",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>Specificity determines which rule wins when two rules target the same element. It&#39;s calculated as a score:</p>\n<pre><code>Specificity = (inline styles, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements)\n              (      1       ,  x ,               y                  ,            z           )\n</code></pre>\n<p>Higher numbers in earlier columns win:</p>\n<pre><code class=\"language-css\">/* 0,0,0,1 — element */\np { color: blue; }\n\n/* 0,0,1,0 — class */\n.text { color: red; }\n\n/* 0,0,1,1 — class + element */\np.text { color: green; }\n\n/* 0,1,0,0 — ID */\n#intro { color: orange; }\n\n/* 0,1,1,0 — ID + class */\n#intro .text { color: purple; }\n</code></pre>\n<pre><code class=\"language-html\">&lt;!-- Which color? --&gt;\n&lt;p id=&quot;intro&quot; class=&quot;text&quot;&gt;Hello&lt;/p&gt;\n&lt;!-- Answer: orange — ID wins (0,1,0,0 &gt; 0,0,1,1) --&gt;\n</code></pre>\n<p><strong>!important</strong> overrides everything:</p>\n<pre><code class=\"language-css\">p { color: red !important; } /* Always wins (except another !important) */\n</code></pre>\n<p>Avoid <code>!important</code> except for utilities. It creates a specificity war that&#39;s hard to win out of.</p>\n<h3>Practical Specificity Advice</h3>\n<p>Keep specificity low and consistent. Prefer classes over IDs for styling. Prefer single classes over long selectors. This makes overriding predictable:</p>\n<pre><code class=\"language-css\">/* Low specificity: easy to override */\n.button { }\n.button-primary { }\n\n/* High specificity: hard to override */\nnav &gt; ul &gt; li &gt; a.button.button-primary { }\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t29",
            "title": "The Box Model",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>Every element on a page is a rectangular box with four layers:</p>\n<pre><code>┌─────────────────────────────────┐\n│           margin                │  Space outside the border\n│  ┌───────────────────────────┐  │\n│  │         border            │  │  The visible border\n│  │  ┌─────────────────────┐  │  │\n│  │  │      padding        │  │  │  Space inside the border\n│  │  │  ┌───────────────┐  │  │  │\n│  │  │  │    content    │  │  │  │  Your actual content\n│  │  │  └───────────────┘  │  │  │\n│  │  └─────────────────────┘  │  │\n│  └───────────────────────────┘  │\n└─────────────────────────────────┘\n</code></pre>\n<p><strong>The gotcha</strong>: by default (<code>box-sizing: content-box</code>), <code>width</code> applies to the content area only. Add padding and border, and the element gets bigger than you specified.</p>\n<p>Always use <code>border-box</code>:</p>\n<pre><code class=\"language-css\">/* Reset at the top of every stylesheet */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n</code></pre>\n<p>Now <code>width: 300px</code> means the entire element (border + padding + content) is 300px wide. This is what you expect.</p>\n<pre><code class=\"language-css\">.box {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 10px;\n}\n\n/* With content-box: actual rendered width = 300 + 20 + 20 + 2 + 2 = 344px */\n/* With border-box:  actual rendered width = 300px (padding+border counted inside) */\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t30",
            "title": "Units",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-css\">/* ——— Absolute ——— */\npx   /* Pixels. Not actually screen pixels anymore — 1px = 1/96in in CSS */\npt   /* Points (1pt = 1/72in). Use only for print */\n\n/* ——— Relative to font size ——— */\nem   /* Relative to the element&#39;s own font-size */\n     /* If element has font-size: 20px, then 1em = 20px, 2em = 40px */\n     /* Compounding: nested elements multiply their em values */\n\nrem  /* Relative to the root &lt;html&gt; element&#39;s font-size */\n     /* Usually 16px by default. 1rem = 16px, 2rem = 32px */\n     /* Predictable, no compounding — prefer rem for text */\n\n/* ——— Relative to viewport ——— */\nvw   /* 1% of viewport width */\nvh   /* 1% of viewport height */\nvmin /* 1% of smaller dimension */\nvmax /* 1% of larger dimension */\ndvh  /* Dynamic viewport height (excludes mobile browser chrome) */\n     /* Use dvh for full-screen mobile sections, not vh */\n\n/* ——— Percentage ——— */\n%    /* Relative to parent element (for width/height/padding) */\n     /* For font-size: relative to inherited font-size */\n\n/* ——— Modern ——— */\nch   /* Width of the &quot;0&quot; character — useful for readable line lengths */\nlh   /* Line height of the element */\n</code></pre>\n<p><strong>Practical rules</strong>:</p>\n<ul>\n<li>Use <code>rem</code> for font sizes and most spacing</li>\n<li>Use <code>px</code> for borders, box shadows, and things that shouldn&#39;t scale with font size</li>\n<li>Use <code>%</code> or <code>fr</code> for layout widths</li>\n<li>Use <code>em</code> for padding/margin on components that should scale with their own text</li>\n<li>Use <code>ch</code> for text container widths (45–75ch is the optimal reading line length)</li>\n</ul>\n<hr>\n"
            }
          },
          {
            "id": "t31",
            "title": "Colors and Typography",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-css\">/* ——— Color formats ——— */\ncolor: red;                    /* Named */\ncolor: #1a1a2e;                /* Hex */\ncolor: #1a1a2e80;              /* Hex with alpha */\ncolor: rgb(26, 26, 46);        /* RGB */\ncolor: rgba(26, 26, 46, 0.5);  /* RGBA */\ncolor: hsl(240, 28%, 14%);     /* HSL (Hue 0-360, Saturation %, Lightness %) */\ncolor: hsla(240, 28%, 14%, 0.5);\ncolor: oklch(0.3 0.05 264);   /* OKLCh: perceptually uniform, modern */\n\n/* ——— Typography ——— */\nfont-family: &#39;Inter&#39;, &#39;Segoe UI&#39;, system-ui, -apple-system, sans-serif;\n/* Always list fallbacks. system-ui uses the OS default font. */\n\nfont-size: 1rem;       /* Base size */\nfont-weight: 400;      /* 100-900. 400=normal, 700=bold */\nfont-style: italic;\nline-height: 1.6;      /* Unitless is best — 1.6 = 160% of font-size */\nletter-spacing: 0.01em;\ntext-transform: uppercase;\ntext-decoration: underline;\ntext-align: left;\n\n/* Variable fonts (one file, many weights/styles) */\nfont-weight: 100 900;  /* Range supported */\n\n/* ——— Web fonts ——— */\n@font-face {\n  font-family: &#39;Inter&#39;;\n  src: url(&#39;/fonts/inter-var.woff2&#39;) format(&#39;woff2&#39;);\n  font-weight: 100 900;\n  font-style: normal;\n  font-display: swap;  /* Show fallback font while loading, swap when ready */\n}\n</code></pre>\n<p><strong><code>font-display: swap</code></strong> is important for performance. Without it, text is invisible while the web font loads (Flash of Invisible Text). With <code>swap</code>, users see text in the fallback font immediately.</p>\n<hr>\n"
            }
          },
          {
            "id": "t32",
            "title": "Layout: Flexbox",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<p>Flexbox is for <strong>one-dimensional layout</strong> — either a row or a column.</p>\n<pre><code class=\"language-css\">.container {\n  display: flex;\n\n  /* Direction */\n  flex-direction: row;          /* Default: left to right */\n  flex-direction: column;       /* Top to bottom */\n  flex-direction: row-reverse;\n  flex-direction: column-reverse;\n\n  /* Wrapping */\n  flex-wrap: nowrap;   /* Default: everything in one line */\n  flex-wrap: wrap;     /* Overflow to next line */\n\n  /* Main axis alignment (flex-direction&#39;s direction) */\n  justify-content: flex-start;    /* Default */\n  justify-content: flex-end;\n  justify-content: center;\n  justify-content: space-between; /* Items spread out, no space at edges */\n  justify-content: space-around;  /* Equal space around each item */\n  justify-content: space-evenly;  /* Equal space between and at edges */\n\n  /* Cross axis alignment (perpendicular to flex-direction) */\n  align-items: stretch;     /* Default: fill cross-axis */\n  align-items: flex-start;\n  align-items: flex-end;\n  align-items: center;\n  align-items: baseline;    /* Align by text baseline */\n\n  /* Gap between items */\n  gap: 1rem;            /* Both row and column */\n  gap: 1rem 2rem;       /* row-gap column-gap */\n}\n\n/* Child properties */\n.item {\n  flex-grow: 0;    /* How much to grow to fill available space */\n  flex-shrink: 1;  /* How much to shrink when not enough space */\n  flex-basis: auto;/* Starting size before grow/shrink */\n\n  /* Shorthand */\n  flex: 1;         /* flex: 1 1 0 — take equal share of space */\n  flex: 0 0 200px; /* Fixed 200px, don&#39;t grow or shrink */\n  flex: auto;      /* flex: 1 1 auto */\n\n  /* Override container alignment for this item */\n  align-self: center;\n\n  /* Reorder visually (doesn&#39;t affect DOM/tab order) */\n  order: -1;  /* Move to front */\n}\n</code></pre>\n<h3>Real-World Flexbox Patterns</h3>\n<pre><code class=\"language-css\">/* ——— Holy grail header ——— */\n.header {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0 2rem;\n}\n.header .logo { margin-right: auto; }  /* Push nav and button to the right */\n/* Logo | ... gap ... | Nav | | Button */\n\n/* ——— Equal-height cards ——— */\n.card-row {\n  display: flex;\n  gap: 1.5rem;\n  align-items: stretch;  /* All cards same height */\n}\n.card { flex: 1; }  /* Equal widths */\n\n/* ——— Centering ——— */\n.centered {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/* ——— Sticky footer ——— */\nbody {\n  min-height: 100dvh;\n  display: flex;\n  flex-direction: column;\n}\nmain { flex: 1; }  /* Grow to fill space, pushing footer down */\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t33",
            "title": "Layout: CSS Grid",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>CSS Grid is for <strong>two-dimensional layout</strong> — rows and columns simultaneously.</p>\n<pre><code class=\"language-css\">.grid {\n  display: grid;\n\n  /* Define columns */\n  grid-template-columns: 200px 1fr 1fr;     /* Fixed + flexible */\n  grid-template-columns: repeat(3, 1fr);    /* 3 equal columns */\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive */\n\n  /* Define rows */\n  grid-template-rows: auto;         /* Let content determine height */\n  grid-template-rows: 100px 1fr;    /* Fixed header, flexible content */\n\n  /* Gaps */\n  gap: 1.5rem;\n  gap: 1rem 2rem;  /* row-gap column-gap */\n\n  /* Named template areas */\n  grid-template-areas:\n    &quot;header header header&quot;\n    &quot;sidebar main   main  &quot;\n    &quot;footer  footer footer&quot;;\n}\n\n/* Place items in named areas */\n.header  { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main    { grid-area: main; }\n.footer  { grid-area: footer; }\n\n/* Manual placement */\n.hero {\n  grid-column: 1 / -1;     /* Span all columns (start at 1, end at last) */\n  grid-column: 2 / 4;      /* From line 2 to line 4 */\n  grid-column: span 2;     /* Span 2 columns from current position */\n  grid-row: 1 / 3;         /* Span rows 1–3 */\n}\n</code></pre>\n<h3>The <code>fr</code> Unit</h3>\n<p><code>fr</code> (fraction) is Grid&#39;s superpower. <code>1fr</code> means &quot;one part of the remaining space.&quot;</p>\n<pre><code class=\"language-css\">/* 3 equal columns */\ngrid-template-columns: 1fr 1fr 1fr;\n\n/* Sidebar + content, sidebar is 1/4 of the width */\ngrid-template-columns: 1fr 3fr;\n\n/* Fixed sidebar + flexible main */\ngrid-template-columns: 250px 1fr;\n</code></pre>\n<h3>Responsive Grid Without Media Queries</h3>\n<pre><code class=\"language-css\">/* Cards auto-arrange in as many columns as fit, min 250px each */\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n</code></pre>\n<p>This is one of the most useful CSS tricks ever. At large viewports, you might get 4 columns. At medium, 3. At small, 2. At tiny, 1. No media queries at all.</p>\n<hr>\n"
            }
          },
          {
            "id": "t34",
            "title": "Positioning",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-css\">position: static;    /* Default: in normal flow */\nposition: relative;  /* Offset from its normal position; establishes stacking context */\nposition: absolute;  /* Positioned relative to nearest positioned ancestor */\nposition: fixed;     /* Positioned relative to viewport; stays on scroll */\nposition: sticky;    /* Relative until scroll threshold, then fixed */\n\n/* Used with relative/absolute/fixed/sticky: */\ntop: 0;\nright: 0;\nbottom: 0;\nleft: 0;\ninset: 0;          /* Shorthand for all four */\nz-index: 10;       /* Stacking order (only works on positioned elements) */\n</code></pre>\n<pre><code class=\"language-css\">/* Common pattern: overlay a child on parent */\n.card {\n  position: relative;  /* Positioning context for children */\n}\n.card-badge {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n}\n\n/* Sticky header */\nheader {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background: white;\n}\n\n/* Sticky table headers */\nth {\n  position: sticky;\n  top: 0;\n  background: inherit;  /* Important — transparent by default */\n}\n\n/* Fixed overlay */\n.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(0,0,0,0.5);\n  z-index: 1000;\n}\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t35",
            "title": "Responsive Design & Media Queries",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-css\">/* ——— Breakpoints ——— */\n/* Mobile first: base styles are mobile, add complexity for larger screens */\n\n/* Base: mobile (&lt; 640px assumed) */\n.container { padding: 1rem; }\n.nav { display: none; } /* Mobile: hide desktop nav */\n.hamburger { display: block; }\n\n/* Small tablet and up */\n@media (min-width: 640px) {\n  .container { padding: 1.5rem; }\n  .card-grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* Tablet and up */\n@media (min-width: 768px) {\n  .layout {\n    display: grid;\n    grid-template-columns: 240px 1fr;\n  }\n}\n\n/* Desktop and up */\n@media (min-width: 1024px) {\n  .container { max-width: 1200px; margin: 0 auto; }\n  .nav { display: flex; } /* Show desktop nav */\n  .hamburger { display: none; }\n}\n\n/* Large desktop */\n@media (min-width: 1280px) {\n  .card-grid { grid-template-columns: repeat(4, 1fr); }\n}\n\n/* ——— Other media features ——— */\n\n/* Dark mode */\n@media (prefers-color-scheme: dark) {\n  :root {\n    --color-bg: #0f0f13;\n    --color-text: #e8e8f0;\n  }\n}\n\n/* Reduced motion — always respect this */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n\n/* High contrast mode */\n@media (forced-colors: active) {\n  .button { border: 2px solid ButtonText; }\n}\n\n/* Print styles */\n@media print {\n  nav, aside, .ads { display: none; }\n  a[href]::after { content: &quot; (&quot; attr(href) &quot;)&quot;; }\n}\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t36",
            "title": "CSS Custom Properties (Variables)",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-css\">/* Define on :root to make globally available */\n:root {\n  /* Design tokens */\n  --color-brand: #6366f1;\n  --color-brand-dark: #4f46e5;\n  --color-text: #1a1a2e;\n  --color-text-muted: #6b7280;\n  --color-bg: #ffffff;\n  --color-bg-subtle: #f9fafb;\n  --color-border: #e5e7eb;\n\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --radius-lg: 16px;\n\n  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);\n  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);\n  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);\n\n  --font-sans: &#39;Inter&#39;, system-ui, sans-serif;\n  --font-mono: &#39;Fira Code&#39;, &#39;Cascadia Code&#39;, monospace;\n\n  --spacing-1: 0.25rem;\n  --spacing-2: 0.5rem;\n  --spacing-4: 1rem;\n  --spacing-8: 2rem;\n\n  --transition-fast: 150ms ease;\n  --transition-normal: 250ms ease;\n}\n\n/* Dark mode override */\n@media (prefers-color-scheme: dark) {\n  :root {\n    --color-text: #e8e8f0;\n    --color-bg: #0f0f13;\n    --color-bg-subtle: #1a1a24;\n    --color-border: #2d2d40;\n  }\n}\n\n/* Manual dark mode via class */\n.dark {\n  --color-text: #e8e8f0;\n  --color-bg: #0f0f13;\n}\n\n/* Use variables */\n.button {\n  background: var(--color-brand);\n  color: white;\n  border-radius: var(--radius-md);\n  padding: var(--spacing-2) var(--spacing-4);\n  transition: background var(--transition-fast);\n}\n\n.button:hover {\n  background: var(--color-brand-dark);\n}\n\n/* Variables with fallback */\ncolor: var(--color-custom, var(--color-text));\n/* If --color-custom not defined, use --color-text */\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t37",
            "title": "Animations and Transitions",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-css\">/* ——— Transitions: smooth property changes ——— */\n.button {\n  background: var(--color-brand);\n  transform: translateY(0);\n  box-shadow: var(--shadow-sm);\n  /* Transition specific properties */\n  transition:\n    background 150ms ease,\n    transform 150ms ease,\n    box-shadow 150ms ease;\n}\n\n.button:hover {\n  background: var(--color-brand-dark);\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-md);\n}\n\n/* ——— Keyframe animations ——— */\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(8px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50%       { opacity: 0.5; }\n}\n\n@keyframes shimmer {\n  from { background-position: -200% 0; }\n  to   { background-position: 200% 0; }\n}\n\n/* Apply animations */\n.card {\n  animation: fadeIn 300ms ease forwards;\n  animation-delay: 100ms;       /* Wait before starting */\n  animation-fill-mode: both;    /* Apply from/to styles outside active period */\n}\n\n.spinner {\n  animation: spin 800ms linear infinite;\n}\n\n.skeleton {\n  background: linear-gradient(\n    90deg,\n    #f0f0f0 25%,\n    #e0e0e0 50%,\n    #f0f0f0 75%\n  );\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}\n\n/* ——— Performance tip ——— */\n/* Only animate/transition these properties — they&#39;re handled by the GPU compositor */\n/* and don&#39;t trigger layout or paint: */\ntransform: translateX/Y/Z(), rotate(), scale(), skew()\nopacity\n\n/* These force layout recalculation on every frame — avoid for animation: */\n/* width, height, top, left, margin, padding, font-size */\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t38",
            "title": "BEM Methodology",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>BEM (Block-Element-Modifier) is a naming convention that prevents specificity wars and makes the relationship between classes explicit.</p>\n<pre><code>Block:    Standalone component   .card\nElement:  Part of a block        .card__title\nModifier: Variant of a block     .card--featured\n          or element             .card__title--truncated\n</code></pre>\n<pre><code class=\"language-html\">&lt;article class=&quot;card card--featured&quot;&gt;\n  &lt;img class=&quot;card__image&quot; src=&quot;...&quot; alt=&quot;...&quot;&gt;\n  &lt;div class=&quot;card__body&quot;&gt;\n    &lt;span class=&quot;card__tag&quot;&gt;Tutorial&lt;/span&gt;\n    &lt;h2 class=&quot;card__title card__title--truncated&quot;&gt;\n      How to Build a REST API\n    &lt;/h2&gt;\n    &lt;p class=&quot;card__excerpt&quot;&gt;...&lt;/p&gt;\n  &lt;/div&gt;\n  &lt;footer class=&quot;card__footer&quot;&gt;\n    &lt;div class=&quot;card__author&quot;&gt;\n      &lt;img class=&quot;card__avatar&quot; src=&quot;...&quot; alt=&quot;...&quot;&gt;\n      &lt;span class=&quot;card__author-name&quot;&gt;Alice Chen&lt;/span&gt;\n    &lt;/div&gt;\n    &lt;time class=&quot;card__date&quot; datetime=&quot;2025-03-07&quot;&gt;March 7&lt;/time&gt;\n  &lt;/footer&gt;\n&lt;/article&gt;\n</code></pre>\n<pre><code class=\"language-css\">/* All selectors are single classes — maximum 0,1,0,0 specificity */\n.card { }\n.card--featured { }\n.card__image { }\n.card__body { }\n.card__title { }\n.card__title--truncated {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n</code></pre>\n<p>Every rule is a single class. No nesting, no combinators, no specificity issues. Easy to reason about, easy to override.</p>\n<hr>\n"
            }
          },
          {
            "id": "t39",
            "title": "Modern CSS: Container Queries",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>Media queries respond to the <strong>viewport</strong> size. Container queries respond to the <strong>parent element&#39;s</strong> size. This is huge for reusable components.</p>\n<pre><code class=\"language-css\">/* Make the card container a &quot;containment context&quot; */\n.card-wrapper {\n  container-type: inline-size;\n  container-name: card;   /* Optional name for multi-container scenarios */\n}\n\n/* Style the card based on ITS container, not the viewport */\n.card {\n  display: flex;\n  flex-direction: column;\n}\n\n@container card (min-width: 500px) {\n  .card {\n    flex-direction: row;  /* Horizontal layout when container is wide enough */\n  }\n  .card__image {\n    width: 200px;\n    flex-shrink: 0;\n  }\n}\n</code></pre>\n<p>Now the card can be placed in a narrow sidebar or a wide main area, and it adapts automatically without any media queries or JavaScript.</p>\n<hr>\n"
            }
          },
          {
            "id": "t40",
            "title": "Mini Project: Responsive Dashboard Layout",
            "type": "reading",
            "readingTime": "17 min read",
            "article": {
              "htmlContent": "<p>A CSS-only responsive dashboard with everything we&#39;ve covered:</p>\n<pre><code class=\"language-html\">&lt;!DOCTYPE html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n  &lt;meta charset=&quot;UTF-8&quot;&gt;\n  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n  &lt;title&gt;Analytics Dashboard&lt;/title&gt;\n  &lt;style&gt;\n    /* ——— Custom Properties ——— */\n    :root {\n      --sidebar-width: 250px;\n      --header-height: 64px;\n\n      --color-brand: #6366f1;\n      --color-brand-light: #818cf8;\n      --color-bg: #f8fafc;\n      --color-surface: #ffffff;\n      --color-text: #1e293b;\n      --color-text-muted: #64748b;\n      --color-border: #e2e8f0;\n\n      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);\n      --shadow-md: 0 4px 12px rgba(0,0,0,0.08);\n\n      --radius: 12px;\n      --transition: 200ms ease;\n\n      --font: &#39;Inter&#39;, system-ui, -apple-system, sans-serif;\n    }\n\n    @media (prefers-color-scheme: dark) {\n      :root {\n        --color-bg: #0f172a;\n        --color-surface: #1e293b;\n        --color-text: #f1f5f9;\n        --color-text-muted: #94a3b8;\n        --color-border: #334155;\n      }\n    }\n\n    /* ——— Reset ——— */\n    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n\n    body {\n      font-family: var(--font);\n      background: var(--color-bg);\n      color: var(--color-text);\n      line-height: 1.6;\n      min-height: 100dvh;\n    }\n\n    /* ——— Layout ——— */\n    .dashboard {\n      display: grid;\n      grid-template-columns: var(--sidebar-width) 1fr;\n      grid-template-rows: var(--header-height) 1fr;\n      grid-template-areas:\n        &quot;sidebar header&quot;\n        &quot;sidebar main&quot;;\n      min-height: 100dvh;\n    }\n\n    @media (max-width: 768px) {\n      .dashboard {\n        grid-template-columns: 1fr;\n        grid-template-rows: var(--header-height) 1fr auto;\n        grid-template-areas:\n          &quot;header&quot;\n          &quot;main&quot;\n          &quot;sidebar&quot;;\n      }\n    }\n\n    /* ——— Sidebar ——— */\n    .sidebar {\n      grid-area: sidebar;\n      background: var(--color-surface);\n      border-right: 1px solid var(--color-border);\n      padding: 1.5rem 1rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.5rem;\n      position: sticky;\n      top: 0;\n      height: 100dvh;\n      overflow-y: auto;\n    }\n\n    @media (max-width: 768px) {\n      .sidebar {\n        position: static;\n        height: auto;\n        flex-direction: row;\n        overflow-x: auto;\n        padding: 0.75rem;\n        border-right: none;\n        border-top: 1px solid var(--color-border);\n      }\n    }\n\n    .sidebar__logo {\n      font-size: 1.25rem;\n      font-weight: 700;\n      color: var(--color-brand);\n      padding: 0 0.5rem;\n      margin-bottom: 1rem;\n      text-decoration: none;\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n    }\n\n    @media (max-width: 768px) {\n      .sidebar__logo { display: none; }\n    }\n\n    .nav__item {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.625rem 0.75rem;\n      border-radius: 8px;\n      color: var(--color-text-muted);\n      text-decoration: none;\n      font-size: 0.875rem;\n      font-weight: 500;\n      transition: background var(--transition), color var(--transition);\n      white-space: nowrap;\n    }\n\n    .nav__item:hover {\n      background: var(--color-bg);\n      color: var(--color-text);\n    }\n\n    .nav__item--active {\n      background: #eef2ff;\n      color: var(--color-brand);\n    }\n\n    @media (prefers-color-scheme: dark) {\n      .nav__item--active { background: rgba(99,102,241,0.15); }\n    }\n\n    .nav__icon { width: 18px; height: 18px; flex-shrink: 0; }\n\n    /* ——— Header ——— */\n    .header {\n      grid-area: header;\n      background: var(--color-surface);\n      border-bottom: 1px solid var(--color-border);\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0 1.5rem;\n      position: sticky;\n      top: 0;\n      z-index: 10;\n    }\n\n    .header__title {\n      font-size: 1rem;\n      font-weight: 600;\n    }\n\n    .header__actions {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n    }\n\n    .avatar {\n      width: 36px;\n      height: 36px;\n      border-radius: 50%;\n      background: var(--color-brand);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: white;\n      font-size: 0.875rem;\n      font-weight: 600;\n      cursor: pointer;\n    }\n\n    /* ——— Main content ——— */\n    .main {\n      grid-area: main;\n      padding: 2rem;\n      overflow-y: auto;\n    }\n\n    @media (max-width: 640px) {\n      .main { padding: 1rem; }\n    }\n\n    /* ——— Stat cards ——— */\n    .stats-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n      gap: 1rem;\n      margin-bottom: 2rem;\n    }\n\n    .stat-card {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius);\n      padding: 1.5rem;\n      box-shadow: var(--shadow-sm);\n      transition: transform var(--transition), box-shadow var(--transition);\n    }\n\n    .stat-card:hover {\n      transform: translateY(-2px);\n      box-shadow: var(--shadow-md);\n    }\n\n    .stat-card__label {\n      font-size: 0.8125rem;\n      color: var(--color-text-muted);\n      font-weight: 500;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n      margin-bottom: 0.5rem;\n    }\n\n    .stat-card__value {\n      font-size: 2rem;\n      font-weight: 700;\n      line-height: 1;\n      margin-bottom: 0.5rem;\n    }\n\n    .stat-card__change {\n      font-size: 0.8125rem;\n      font-weight: 500;\n    }\n\n    .stat-card__change--up   { color: #10b981; }\n    .stat-card__change--down { color: #ef4444; }\n\n    /* ——— Section titles ——— */\n    .section-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      margin-bottom: 1rem;\n    }\n\n    .section-title {\n      font-size: 1rem;\n      font-weight: 600;\n    }\n\n    /* ——— Table ——— */\n    .table-wrapper {\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: var(--radius);\n      box-shadow: var(--shadow-sm);\n      overflow: hidden;\n    }\n\n    .table {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 0.875rem;\n    }\n\n    .table th {\n      padding: 0.75rem 1rem;\n      text-align: left;\n      font-weight: 500;\n      color: var(--color-text-muted);\n      border-bottom: 1px solid var(--color-border);\n      background: var(--color-bg);\n      white-space: nowrap;\n    }\n\n    .table td {\n      padding: 0.875rem 1rem;\n      border-bottom: 1px solid var(--color-border);\n    }\n\n    .table tbody tr:last-child td { border-bottom: none; }\n\n    .table tbody tr:hover { background: var(--color-bg); }\n\n    /* ——— Badge ——— */\n    .badge {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.2em 0.6em;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 600;\n    }\n\n    .badge--success { background: #dcfce7; color: #166534; }\n    .badge--warning { background: #fef9c3; color: #854d0e; }\n    .badge--danger  { background: #fee2e2; color: #991b1b; }\n\n    @media (prefers-color-scheme: dark) {\n      .badge--success { background: rgba(16,185,129,0.15); color: #4ade80; }\n      .badge--warning { background: rgba(234,179,8,0.15); color: #facc15; }\n      .badge--danger  { background: rgba(239,68,68,0.15); color: #f87171; }\n    }\n\n    /* ——— Button ——— */\n    .btn {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.5rem 1rem;\n      border-radius: 8px;\n      font-size: 0.875rem;\n      font-weight: 500;\n      cursor: pointer;\n      border: none;\n      transition: background var(--transition), transform var(--transition);\n    }\n\n    .btn:active { transform: scale(0.97); }\n\n    .btn--primary {\n      background: var(--color-brand);\n      color: white;\n    }\n\n    .btn--primary:hover { background: #4f46e5; }\n\n    .btn--ghost {\n      background: transparent;\n      color: var(--color-text-muted);\n      border: 1px solid var(--color-border);\n    }\n\n    .btn--ghost:hover {\n      background: var(--color-bg);\n      color: var(--color-text);\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      *, *::before, *::after {\n        transition-duration: 0.01ms !important;\n        animation-duration: 0.01ms !important;\n      }\n    }\n  &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n\n&lt;div class=&quot;dashboard&quot;&gt;\n\n  &lt;!-- Sidebar --&gt;\n  &lt;nav class=&quot;sidebar&quot; aria-label=&quot;Main navigation&quot;&gt;\n    &lt;a href=&quot;/&quot; class=&quot;sidebar__logo&quot;&gt;\n      &lt;svg class=&quot;nav__icon&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;currentColor&quot; aria-hidden=&quot;true&quot;&gt;\n        &lt;path d=&quot;M13 10V3L4 14h7v7l9-11h-7z&quot;/&gt;\n      &lt;/svg&gt;\n      Analytics\n    &lt;/a&gt;\n\n    &lt;a href=&quot;/dashboard&quot; class=&quot;nav__item nav__item--active&quot; aria-current=&quot;page&quot;&gt;\n      &lt;svg class=&quot;nav__icon&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; aria-hidden=&quot;true&quot;&gt;\n        &lt;rect x=&quot;3&quot; y=&quot;3&quot; width=&quot;7&quot; height=&quot;7&quot;/&gt;&lt;rect x=&quot;14&quot; y=&quot;3&quot; width=&quot;7&quot; height=&quot;7&quot;/&gt;\n        &lt;rect x=&quot;14&quot; y=&quot;14&quot; width=&quot;7&quot; height=&quot;7&quot;/&gt;&lt;rect x=&quot;3&quot; y=&quot;14&quot; width=&quot;7&quot; height=&quot;7&quot;/&gt;\n      &lt;/svg&gt;\n      Dashboard\n    &lt;/a&gt;\n\n    &lt;a href=&quot;/analytics&quot; class=&quot;nav__item&quot;&gt;\n      &lt;svg class=&quot;nav__icon&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; aria-hidden=&quot;true&quot;&gt;\n        &lt;polyline points=&quot;22 12 18 12 15 21 9 3 6 12 2 12&quot;/&gt;\n      &lt;/svg&gt;\n      Analytics\n    &lt;/a&gt;\n\n    &lt;a href=&quot;/users&quot; class=&quot;nav__item&quot;&gt;\n      &lt;svg class=&quot;nav__icon&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; aria-hidden=&quot;true&quot;&gt;\n        &lt;path d=&quot;M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2&quot;/&gt;\n        &lt;circle cx=&quot;9&quot; cy=&quot;7&quot; r=&quot;4&quot;/&gt;\n        &lt;path d=&quot;M23 21v-2a4 4 0 0 0-3-3.87&quot;/&gt;\n        &lt;path d=&quot;M16 3.13a4 4 0 0 1 0 7.75&quot;/&gt;\n      &lt;/svg&gt;\n      Users\n    &lt;/a&gt;\n\n    &lt;a href=&quot;/settings&quot; class=&quot;nav__item&quot;&gt;\n      &lt;svg class=&quot;nav__icon&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; aria-hidden=&quot;true&quot;&gt;\n        &lt;circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;3&quot;/&gt;\n        &lt;path d=&quot;M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z&quot;/&gt;\n      &lt;/svg&gt;\n      Settings\n    &lt;/a&gt;\n  &lt;/nav&gt;\n\n  &lt;!-- Header --&gt;\n  &lt;header class=&quot;header&quot;&gt;\n    &lt;h1 class=&quot;header__title&quot;&gt;Dashboard&lt;/h1&gt;\n    &lt;div class=&quot;header__actions&quot;&gt;\n      &lt;button class=&quot;btn btn--ghost&quot;&gt;Export&lt;/button&gt;\n      &lt;button class=&quot;btn btn--primary&quot;&gt;+ New Report&lt;/button&gt;\n      &lt;div class=&quot;avatar&quot; role=&quot;img&quot; aria-label=&quot;User: Alice Chen&quot;&gt;AC&lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/header&gt;\n\n  &lt;!-- Main Content --&gt;\n  &lt;main class=&quot;main&quot; id=&quot;main-content&quot;&gt;\n\n    &lt;!-- Stat Cards --&gt;\n    &lt;div class=&quot;stats-grid&quot;&gt;\n      &lt;div class=&quot;stat-card&quot;&gt;\n        &lt;div class=&quot;stat-card__label&quot;&gt;Total Revenue&lt;/div&gt;\n        &lt;div class=&quot;stat-card__value&quot;&gt;$48,291&lt;/div&gt;\n        &lt;div class=&quot;stat-card__change stat-card__change--up&quot;&gt;↑ 12.5% vs last month&lt;/div&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;stat-card&quot;&gt;\n        &lt;div class=&quot;stat-card__label&quot;&gt;Active Users&lt;/div&gt;\n        &lt;div class=&quot;stat-card__value&quot;&gt;3,842&lt;/div&gt;\n        &lt;div class=&quot;stat-card__change stat-card__change--up&quot;&gt;↑ 8.1% vs last month&lt;/div&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;stat-card&quot;&gt;\n        &lt;div class=&quot;stat-card__label&quot;&gt;Churn Rate&lt;/div&gt;\n        &lt;div class=&quot;stat-card__value&quot;&gt;2.4%&lt;/div&gt;\n        &lt;div class=&quot;stat-card__change stat-card__change--down&quot;&gt;↑ 0.3% vs last month&lt;/div&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;stat-card&quot;&gt;\n        &lt;div class=&quot;stat-card__label&quot;&gt;Avg. Session&lt;/div&gt;\n        &lt;div class=&quot;stat-card__value&quot;&gt;4m 12s&lt;/div&gt;\n        &lt;div class=&quot;stat-card__change stat-card__change--up&quot;&gt;↑ 22s vs last month&lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n\n    &lt;!-- Recent Transactions Table --&gt;\n    &lt;div class=&quot;section-header&quot;&gt;\n      &lt;h2 class=&quot;section-title&quot;&gt;Recent Transactions&lt;/h2&gt;\n      &lt;button class=&quot;btn btn--ghost&quot;&gt;View all&lt;/button&gt;\n    &lt;/div&gt;\n\n    &lt;div class=&quot;table-wrapper&quot;&gt;\n      &lt;table class=&quot;table&quot;&gt;\n        &lt;thead&gt;\n          &lt;tr&gt;\n            &lt;th scope=&quot;col&quot;&gt;Customer&lt;/th&gt;\n            &lt;th scope=&quot;col&quot;&gt;Plan&lt;/th&gt;\n            &lt;th scope=&quot;col&quot;&gt;Amount&lt;/th&gt;\n            &lt;th scope=&quot;col&quot;&gt;Date&lt;/th&gt;\n            &lt;th scope=&quot;col&quot;&gt;Status&lt;/th&gt;\n          &lt;/tr&gt;\n        &lt;/thead&gt;\n        &lt;tbody&gt;\n          &lt;tr&gt;\n            &lt;td&gt;Alice Chen&lt;/td&gt;\n            &lt;td&gt;Pro Annual&lt;/td&gt;\n            &lt;td&gt;$299.00&lt;/td&gt;\n            &lt;td&gt;&lt;time datetime=&quot;2025-03-07&quot;&gt;Mar 7, 2025&lt;/time&gt;&lt;/td&gt;\n            &lt;td&gt;&lt;span class=&quot;badge badge--success&quot;&gt;Paid&lt;/span&gt;&lt;/td&gt;\n          &lt;/tr&gt;\n          &lt;tr&gt;\n            &lt;td&gt;Bob Smith&lt;/td&gt;\n            &lt;td&gt;Starter Monthly&lt;/td&gt;\n            &lt;td&gt;$29.00&lt;/td&gt;\n            &lt;td&gt;&lt;time datetime=&quot;2025-03-06&quot;&gt;Mar 6, 2025&lt;/time&gt;&lt;/td&gt;\n            &lt;td&gt;&lt;span class=&quot;badge badge--warning&quot;&gt;Pending&lt;/span&gt;&lt;/td&gt;\n          &lt;/tr&gt;\n          &lt;tr&gt;\n            &lt;td&gt;Carol White&lt;/td&gt;\n            &lt;td&gt;Pro Monthly&lt;/td&gt;\n            &lt;td&gt;$49.00&lt;/td&gt;\n            &lt;td&gt;&lt;time datetime=&quot;2025-03-05&quot;&gt;Mar 5, 2025&lt;/time&gt;&lt;/td&gt;\n            &lt;td&gt;&lt;span class=&quot;badge badge--danger&quot;&gt;Failed&lt;/span&gt;&lt;/td&gt;\n          &lt;/tr&gt;\n          &lt;tr&gt;\n            &lt;td&gt;Dave Johnson&lt;/td&gt;\n            &lt;td&gt;Enterprise&lt;/td&gt;\n            &lt;td&gt;$999.00&lt;/td&gt;\n            &lt;td&gt;&lt;time datetime=&quot;2025-03-04&quot;&gt;Mar 4, 2025&lt;/time&gt;&lt;/td&gt;\n            &lt;td&gt;&lt;span class=&quot;badge badge--success&quot;&gt;Paid&lt;/span&gt;&lt;/td&gt;\n          &lt;/tr&gt;\n        &lt;/tbody&gt;\n      &lt;/table&gt;\n    &lt;/div&gt;\n\n  &lt;/main&gt;\n\n&lt;/div&gt;\n\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n<hr>\n"
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t41",
            "title": "Responsive dashboard",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Responsive dashboard",
              "desc": "Put your knowledge to the test by implementing \"Responsive dashboard\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/css-1"
            }
          },
          {
            "id": "t42",
            "title": "Complex grid layouts",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Complex grid layouts",
              "desc": "Put your knowledge to the test by implementing \"Complex grid layouts\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/css-2"
            }
          },
          {
            "id": "t43",
            "title": "CSS animations challenge",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "CSS animations challenge",
              "desc": "Put your knowledge to the test by implementing \"CSS animations challenge\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/css-3"
            }
          }
        ]
      }
    ]
  },
  "js": {
    "id": "js",
    "title": "JavaScript Fundamentals",
    "description": "Learn JS.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t44",
            "title": "Variables: `var`, `let`, `const`",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-javascript\">// var: function-scoped, hoisted, can be re-declared\n// Almost never use var in modern code.\nvar x = 1;\nvar x = 2; // No error — confusing\n\n// let: block-scoped, not re-declarable\nlet count = 0;\ncount = 1; // OK\n// let count = 2; // Error: already declared\n\n// const: block-scoped, can&#39;t be reassigned (but contents can be mutated)\nconst PI = 3.14159;\n// PI = 3; // Error: assignment to constant variable\n\nconst user = { name: &#39;Alice&#39; };\nuser.name = &#39;Bob&#39;; // OK — you&#39;re mutating, not reassigning\n// user = {}; // Error: can&#39;t reassign\n\nconst nums = [1, 2, 3];\nnums.push(4); // OK — mutating the array\n// nums = [1, 2]; // Error\n</code></pre>\n<p><strong>Rule</strong>: Use <code>const</code> by default. Use <code>let</code> when you need to reassign. Never use <code>var</code>.</p>\n<h3>Hoisting</h3>\n<pre><code class=\"language-javascript\">// var declarations are hoisted to the top of the function (but not the value)\nconsole.log(x); // undefined (not an error!)\nvar x = 5;\n\n// This is what actually happens:\nvar x;           // declaration hoisted\nconsole.log(x);  // undefined\nx = 5;\n\n// let and const are hoisted too, but into the &quot;temporal dead zone&quot;\n// Accessing them before declaration throws a ReferenceError\nconsole.log(y);  // ReferenceError: Cannot access &#39;y&#39; before initialization\nlet y = 5;\n\n// Function declarations are fully hoisted\ngreet(); // &#39;Hello&#39; — works!\nfunction greet() { console.log(&#39;Hello&#39;); }\n\n// Function expressions are NOT fully hoisted\ngreet(); // TypeError: greet is not a function\nvar greet = function() { console.log(&#39;Hello&#39;); };\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t45",
            "title": "Data Types",
            "type": "reading",
            "readingTime": "4 min read",
            "article": {
              "htmlContent": "<p>JavaScript has 8 data types:</p>\n<pre><code class=\"language-javascript\">// Primitives (stored by value)\ntypeof undefined    // &#39;undefined&#39; — declared but no value assigned\ntypeof null         // &#39;object&#39;    — this is a famous bug; null IS its own type\ntypeof true         // &#39;boolean&#39;\ntypeof 42           // &#39;number&#39;\ntypeof 3.14         // &#39;number&#39;    — no separate float type\ntypeof NaN          // &#39;number&#39;    — &quot;Not a Number&quot; is ironically a number\ntypeof Infinity     // &#39;number&#39;\ntypeof &#39;hello&#39;      // &#39;string&#39;\ntypeof Symbol(&#39;id&#39;) // &#39;symbol&#39;    — unique, immutable identifier\ntypeof 9007199254740991n // &#39;bigint&#39; — integers beyond Number.MAX_SAFE_INTEGER\n\n// Object (stored by reference)\ntypeof {}           // &#39;object&#39;\ntypeof []           // &#39;object&#39;   — arrays are objects\ntypeof null         // &#39;object&#39;   — the infamous bug\ntypeof function(){} // &#39;function&#39; — technically an object\n</code></pre>\n<h3>Type Coercion</h3>\n<p>JavaScript automatically converts types in certain operations. This is the source of most &quot;JavaScript is weird&quot; memes.</p>\n<pre><code class=\"language-javascript\">// == does type coercion (avoid!)\n0 == false          // true\n0 == &#39;&#39;             // true\n&#39;&#39; == false         // true\nnull == undefined   // true\nnull == false       // false (!)\n\n// === does NO coercion (always use this)\n0 === false         // false\n0 === &#39;&#39;            // false\n\n// + is both addition and string concatenation\n1 + 2               // 3\n&#39;1&#39; + 2             // &#39;12&#39; (number coerced to string)\n1 + &#39;2&#39;             // &#39;12&#39;\n1 + 2 + &#39;3&#39;         // &#39;33&#39; (left-to-right: 3 then &#39;33&#39;)\n&#39;1&#39; + 2 + 3         // &#39;123&#39;\n\n// Other operators coerce to numbers\n&#39;5&#39; - 2             // 3\n&#39;5&#39; * &#39;2&#39;           // 10\ntrue + 1            // 2\nfalse + 1           // 1\nnull + 1            // 1\nundefined + 1       // NaN\n\n// Falsy values (coerce to false in boolean context)\nif (false)     {} // false\nif (0)         {} // false\nif (-0)        {} // false\nif (0n)        {} // false (BigInt zero)\nif (&#39;&#39;)        {} // false\nif (null)      {} // false\nif (undefined) {} // false\nif (NaN)       {} // false\n\n// Everything else is truthy, including:\nif ([])   {} // true (empty array!)\nif ({})   {} // true (empty object!)\nif (&#39;0&#39;)  {} // true (non-empty string!)\n</code></pre>\n<p><strong>The rule</strong>: always use <code>===</code> and <code>!==</code>. Avoid relying on implicit coercion.</p>\n<hr>\n"
            }
          },
          {
            "id": "t46",
            "title": "Scope and Closures",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<p><strong>Scope</strong> is the context in which a variable is accessible.</p>\n<pre><code class=\"language-javascript\">// Global scope: accessible everywhere\nconst globalVar = &#39;I am global&#39;;\n\nfunction outer() {\n  // Function scope: accessible within outer and its children\n  const outerVar = &#39;I am outer&#39;;\n\n  function inner() {\n    // Block scope: accessible only in inner\n    const innerVar = &#39;I am inner&#39;;\n\n    // Can access all parent scopes\n    console.log(globalVar);  // ✓\n    console.log(outerVar);   // ✓\n    console.log(innerVar);   // ✓\n  }\n\n  // console.log(innerVar);  // ✗ ReferenceError\n  inner();\n}\n\n// Block scope with let/const\n{\n  let blockScoped = &#39;only here&#39;;\n  const alsoBlock = &#39;also only here&#39;;\n  var notBlock = &#39;everywhere in function&#39;; // var ignores blocks!\n}\n\n// console.log(blockScoped);  // ✗ ReferenceError\nconsole.log(notBlock);         // ✓ Works (var leaks out of blocks)\n</code></pre>\n<h3>Closures</h3>\n<p>A closure is a function that <strong>remembers</strong> the variables from its outer scope, even after that outer function has returned.</p>\n<pre><code class=\"language-javascript\">function makeCounter(initialValue = 0) {\n  let count = initialValue; // This variable is &quot;closed over&quot;\n\n  return {\n    increment() { count++; },\n    decrement() { count--; },\n    reset()     { count = initialValue; },\n    getValue()  { return count; }\n  };\n}\n\nconst counter = makeCounter(10);\ncounter.increment(); // count = 11\ncounter.increment(); // count = 12\ncounter.decrement(); // count = 11\nconsole.log(counter.getValue()); // 11\n\nconst counter2 = makeCounter(); // Separate count variable\ncounter2.increment();\nconsole.log(counter2.getValue()); // 1\nconsole.log(counter.getValue());  // 11 (unaffected)\n</code></pre>\n<p>The <code>count</code> variable inside <code>makeCounter</code> keeps living as long as <code>counter</code> exists, because <code>counter</code>&#39;s methods hold a reference to it. This is the closure.</p>\n<h3>Practical Closure Uses</h3>\n<pre><code class=\"language-javascript\">// 1. Data privacy / encapsulation\nfunction createUser(name, email) {\n  // Private — only accessible through the returned methods\n  let _loginCount = 0;\n  let _lastLogin = null;\n\n  return {\n    getName: () =&gt; name,\n    getEmail: () =&gt; email,\n    recordLogin() {\n      _loginCount++;\n      _lastLogin = new Date();\n    },\n    getStats: () =&gt; ({ loginCount: _loginCount, lastLogin: _lastLogin })\n  };\n}\n\n// 2. Memoization\nfunction memoize(fn) {\n  const cache = new Map(); // Closed over\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nconst expensiveCalc = memoize((n) =&gt; {\n  // Simulate expensive computation\n  return n * n;\n});\n\n// 3. Partial application\nfunction multiply(a, b) { return a * b; }\nconst double = multiply.bind(null, 2);\nconst triple = multiply.bind(null, 3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t47",
            "title": "Objects and Arrays",
            "type": "reading",
            "readingTime": "4 min read",
            "article": {
              "htmlContent": "<h3>Objects</h3>\n<pre><code class=\"language-javascript\">// Object literal\nconst user = {\n  id: 42,\n  name: &#39;Alice Chen&#39;,\n  email: &#39;alice@example.com&#39;,\n  role: &#39;admin&#39;,\n  createdAt: new Date(&#39;2024-01-15&#39;),\n\n  // Method shorthand\n  greet() {\n    return `Hello, I&#39;m ${this.name}`;\n  },\n\n  // Computed property names\n  [`data_${Date.now()}`]: &#39;dynamic key&#39;\n};\n\n// Property access\nuser.name;           // &#39;Alice Chen&#39;\nuser[&#39;email&#39;];       // &#39;alice@example.com&#39; (use for dynamic keys)\n\n// Destructuring\nconst { name, email, role = &#39;user&#39; } = user; // role defaults to &#39;user&#39; if undefined\nconst { name: userName } = user;             // rename: userName = &#39;Alice Chen&#39;\nconst { address: { city } = {} } = user;     // nested with default\n\n// Spread\nconst updatedUser = { ...user, name: &#39;Bob&#39;, email: &#39;bob@example.com&#39; };\nconst merged = { ...defaults, ...overrides };\n\n// Rest in destructuring\nconst { id, ...rest } = user;\n// id = 42, rest = { name, email, role, ... }\n\n// Optional chaining\nuser.address?.city           // undefined instead of TypeError\nuser.getProfile?.()          // undefined if getProfile doesn&#39;t exist\nuser.addresses?.[0]?.city    // safe array access\n\n// Nullish coalescing\nconst name = user.name ?? &#39;Anonymous&#39;;  // Only falls back on null/undefined\nconst count = user.count || 0;          // Falls back on any falsy (0, &#39;&#39;, false too!)\n\n// Object methods\nObject.keys(user)    // [&#39;id&#39;, &#39;name&#39;, &#39;email&#39;, ...]\nObject.values(user)  // [42, &#39;Alice Chen&#39;, ...]\nObject.entries(user) // [[&#39;id&#39;, 42], [&#39;name&#39;, &#39;Alice Chen&#39;], ...]\nObject.assign({}, defaults, overrides)  // Merge (mutates first arg!)\nObject.freeze(user)  // Make immutable (shallow)\n</code></pre>\n<h3>Arrays</h3>\n<pre><code class=\"language-javascript\">const fruits = [&#39;apple&#39;, &#39;banana&#39;, &#39;cherry&#39;, &#39;date&#39;];\n\n// Access\nfruits[0];          // &#39;apple&#39;\nfruits.at(-1);      // &#39;date&#39; (negative index from end)\nfruits.length;      // 4\n\n// Mutating methods (modify the original array)\nfruits.push(&#39;elderberry&#39;);      // Add to end → returns new length\nfruits.pop();                   // Remove from end → returns removed item\nfruits.unshift(&#39;acai&#39;);         // Add to start → returns new length\nfruits.shift();                 // Remove from start → returns removed item\nfruits.splice(1, 2);            // Remove 2 items at index 1 → returns removed\nfruits.splice(1, 0, &#39;blueberry&#39;); // Insert without removing\nfruits.reverse();               // Reverses in place\nfruits.sort();                  // Sorts in place (lexicographic by default!)\nfruits.sort((a, b) =&gt; a.localeCompare(b)); // Proper string sort\n[3,1,2].sort((a, b) =&gt; a - b);  // Numeric ascending sort\n[3,1,2].sort((a, b) =&gt; b - a);  // Numeric descending sort\n\n// Non-mutating methods (return new array/value)\nfruits.slice(1, 3);              // Shallow copy of [1,3)\nfruits.concat([&#39;fig&#39;, &#39;grape&#39;]); // Merge arrays\nfruits.join(&#39;, &#39;);               // &#39;apple, banana, cherry, date&#39;\n\n// The big four transformation methods\nconst numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// map: transform every element\nconst doubled = numbers.map(n =&gt; n * 2);\n// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]\n\n// filter: keep elements that pass a test\nconst evens = numbers.filter(n =&gt; n % 2 === 0);\n// [2, 4, 6, 8, 10]\n\n// reduce: accumulate to a single value\nconst sum = numbers.reduce((acc, n) =&gt; acc + n, 0);\n// 55\n\n// find/findIndex: get first match\nconst firstEven = numbers.find(n =&gt; n % 2 === 0);     // 2\nconst firstEvenIdx = numbers.findIndex(n =&gt; n % 2 === 0); // 1\n\n// some/every: boolean tests\nnumbers.some(n =&gt; n &gt; 5);  // true (at least one)\nnumbers.every(n =&gt; n &gt; 0); // true (all pass)\n\n// flat/flatMap\n[[1, 2], [3, 4]].flat();           // [1, 2, 3, 4]\n[1, 2, 3].flatMap(n =&gt; [n, n * 2]); // [1, 2, 2, 4, 3, 6]\n\n// Spread and destructuring\nconst [first, second, ...rest] = fruits;\nconst copy = [...fruits];\nconst merged = [...fruits, ...morefruits];\n\n// Checking membership\nfruits.includes(&#39;apple&#39;);             // true\nfruits.indexOf(&#39;banana&#39;);             // 1 (or -1 if not found)\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t48",
            "title": "Asynchronous JavaScript",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "htmlContent": "<p>JavaScript is single-threaded, so it can&#39;t literally do two things at once. Async allows it to <strong>start</strong> an operation and continue with other work while waiting for the result.</p>\n<h3>Callbacks (Old School)</h3>\n<pre><code class=\"language-javascript\">// Node.js-style callback: (error, result)\nfs.readFile(&#39;config.json&#39;, &#39;utf8&#39;, (err, data) =&gt; {\n  if (err) {\n    console.error(&#39;Failed to read file:&#39;, err);\n    return;\n  }\n\n  const config = JSON.parse(data);\n\n  db.connect(config.database, (err, connection) =&gt; {\n    if (err) {\n      console.error(&#39;DB connection failed:&#39;, err);\n      return;\n    }\n\n    connection.query(&#39;SELECT * FROM users&#39;, (err, users) =&gt; {\n      if (err) { /* handle */ return; }\n\n      // This is callback hell: deeply nested, error handling repeated,\n      // hard to read, hard to reason about\n      users.forEach(user =&gt; {\n        sendEmail(user.email, &#39;Welcome!&#39;, (err) =&gt; {\n          if (err) { /* handle */ }\n        });\n      });\n    });\n  });\n});\n</code></pre>\n<h3>Promises</h3>\n<p>A Promise represents a value that will be available in the future. It&#39;s in one of three states: pending, fulfilled, or rejected.</p>\n<pre><code class=\"language-javascript\">// Creating a Promise\nfunction fetchUser(id) {\n  return new Promise((resolve, reject) =&gt; {\n    // Simulate async work\n    setTimeout(() =&gt; {\n      if (id &lt;= 0) {\n        reject(new Error(&#39;Invalid user ID&#39;));\n        return;\n      }\n      resolve({ id, name: &#39;Alice&#39;, email: &#39;alice@example.com&#39; });\n    }, 100);\n  });\n}\n\n// Using .then/.catch/.finally\nfetchUser(42)\n  .then(user =&gt; {\n    console.log(&#39;Got user:&#39;, user);\n    return fetchUserPosts(user.id); // Return a promise to chain\n  })\n  .then(posts =&gt; {\n    console.log(&#39;Got posts:&#39;, posts);\n  })\n  .catch(err =&gt; {\n    // Catches any error in the chain above\n    console.error(&#39;Something failed:&#39;, err.message);\n  })\n  .finally(() =&gt; {\n    // Always runs, success or failure\n    hideLoadingSpinner();\n  });\n\n// Parallel execution\nPromise.all([fetchUser(1), fetchUser(2), fetchUser(3)])\n  .then(([user1, user2, user3]) =&gt; {\n    // All three resolved\n    console.log(user1, user2, user3);\n  })\n  .catch(err =&gt; {\n    // If ANY promise rejects, the whole thing rejects\n    console.error(err);\n  });\n\n// First to resolve wins\nPromise.race([fetchFromUS(), fetchFromEU()])\n  .then(result =&gt; console.log(&#39;Fastest response:&#39;, result));\n\n// All settle (resolve or reject), don&#39;t fail fast\nPromise.allSettled([fetchUser(1), fetchUser(-1), fetchUser(2)])\n  .then(results =&gt; {\n    results.forEach((result, i) =&gt; {\n      if (result.status === &#39;fulfilled&#39;) {\n        console.log(`User ${i + 1}:`, result.value);\n      } else {\n        console.log(`User ${i + 1} failed:`, result.reason.message);\n      }\n    });\n  });\n\n// First to RESOLVE (not reject) wins\nPromise.any([fetchFromPrimary(), fetchFromBackup()])\n  .then(result =&gt; console.log(&#39;Got result from first available:&#39;, result))\n  .catch(() =&gt; console.error(&#39;All sources failed&#39;));\n</code></pre>\n<h3>Async/Await</h3>\n<p>Async/await is syntactic sugar over promises. It makes async code read like synchronous code.</p>\n<pre><code class=\"language-javascript\">// async function always returns a Promise\nasync function loadUserDashboard(userId) {\n  try {\n    // await pauses execution until the promise settles\n    const user = await fetchUser(userId);\n    const [posts, followers, analytics] = await Promise.all([\n      fetchUserPosts(user.id),\n      fetchFollowers(user.id),\n      fetchAnalytics(user.id)\n    ]);\n\n    return {\n      user,\n      posts,\n      followers,\n      analytics\n    };\n  } catch (err) {\n    if (err instanceof NetworkError) {\n      // Retry logic\n      return loadUserDashboard(userId); // Be careful — infinite retry risk\n    }\n    throw err; // Re-throw errors you can&#39;t handle here\n  } finally {\n    trackMetric(&#39;dashboard_load&#39;);\n  }\n}\n\n// Top-level await (in ES modules)\nconst dashboard = await loadUserDashboard(42);\nconsole.log(dashboard.user.name);\n</code></pre>\n<h3>Common Async Pitfalls</h3>\n<pre><code class=\"language-javascript\">// WRONG: await inside forEach doesn&#39;t work as expected\nasync function processUsers(users) {\n  users.forEach(async (user) =&gt; {\n    await sendEmail(user.email); // This runs, but forEach doesn&#39;t wait for it\n  });\n  // Function returns before emails are sent!\n}\n\n// RIGHT: Use for...of\nasync function processUsers(users) {\n  for (const user of users) {\n    await sendEmail(user.email); // Sequential — one at a time\n  }\n}\n\n// BETTER for parallel: use Promise.all with map\nasync function processUsers(users) {\n  await Promise.all(users.map(user =&gt; sendEmail(user.email))); // All at once\n}\n\n// Sequential vs parallel\n// SLOW: sequential — waits for each one\nconst user = await fetchUser(id);\nconst posts = await fetchPosts(id);\nconst comments = await fetchComments(id);\n\n// FAST: parallel — all three start at the same time\nconst [user, posts, comments] = await Promise.all([\n  fetchUser(id),\n  fetchPosts(id),\n  fetchComments(id)\n]);\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t49",
            "title": "DOM Manipulation",
            "type": "reading",
            "readingTime": "4 min read",
            "article": {
              "htmlContent": "<p>The DOM is the live representation of your HTML that JavaScript can read and modify.</p>\n<pre><code class=\"language-javascript\">// ——— Selecting elements ———\nconst el = document.getElementById(&#39;myId&#39;);\nconst el = document.querySelector(&#39;.card&#39;);           // First match\nconst els = document.querySelectorAll(&#39;.card&#39;);        // All matches (NodeList)\nconst parent = el.closest(&#39;.container&#39;);              // Nearest ancestor matching selector\nconst children = el.children;                         // HTMLCollection of direct children\nconst siblings = el.parentElement.children;\n\n// ——— Reading and writing content ———\nel.textContent;                // Text only (safe from XSS)\nel.innerHTML;                  // HTML string (dangerous — XSS risk with user input!)\nel.outerHTML;                  // Element + its HTML\n\nel.textContent = &#39;New text&#39;;   // Safe\nel.innerHTML = &#39;&lt;strong&gt;Bold&lt;/strong&gt;&#39;; // OK when you control the content\n// NEVER: el.innerHTML = userInput; — always sanitize first\n\n// ——— Attributes ———\nel.getAttribute(&#39;data-id&#39;);         // &#39;abc123&#39;\nel.setAttribute(&#39;aria-expanded&#39;, &#39;true&#39;);\nel.removeAttribute(&#39;disabled&#39;);\nel.hasAttribute(&#39;required&#39;);        // true/false\nel.dataset.userId;                  // data-user-id attribute\nel.dataset.userId = &#39;42&#39;;          // Set data-user-id attribute\n\n// ——— Classes ———\nel.classList.add(&#39;active&#39;, &#39;highlighted&#39;);\nel.classList.remove(&#39;loading&#39;);\nel.classList.toggle(&#39;expanded&#39;);\nel.classList.toggle(&#39;active&#39;, isActive);  // Force on/off\nel.classList.contains(&#39;active&#39;);          // true/false\nel.classList.replace(&#39;old&#39;, &#39;new&#39;);\n\n// ——— Styles ———\nel.style.backgroundColor = &#39;red&#39;;     // Camel case for CSS properties\nel.style.setProperty(&#39;--custom-color&#39;, &#39;blue&#39;); // CSS variables\nel.style.removeProperty(&#39;background-color&#39;);\nwindow.getComputedStyle(el).getPropertyValue(&#39;color&#39;); // Read computed styles\n\n// ——— Creating and inserting elements ———\nconst card = document.createElement(&#39;div&#39;);\ncard.className = &#39;card&#39;;\ncard.textContent = &#39;Hello&#39;;\n\n// Modern insertion methods\nparent.append(card);             // Add at end (accepts strings too)\nparent.prepend(card);            // Add at start\nparent.before(card);             // Insert before parent\nparent.after(card);              // Insert after parent\nel.replaceWith(card);            // Replace el with card\nel.remove();                     // Remove element\n\n// insertAdjacentHTML — fast, doesn&#39;t re-parse existing DOM\nel.insertAdjacentHTML(&#39;beforebegin&#39;, &#39;&lt;p&gt;Before the element&lt;/p&gt;&#39;);\nel.insertAdjacentHTML(&#39;afterbegin&#39;, &#39;&lt;p&gt;Inside, before first child&lt;/p&gt;&#39;);\nel.insertAdjacentHTML(&#39;beforeend&#39;, &#39;&lt;p&gt;Inside, after last child&lt;/p&gt;&#39;);\nel.insertAdjacentHTML(&#39;afterend&#39;, &#39;&lt;p&gt;After the element&lt;/p&gt;&#39;);\n\n// DocumentFragment — batch DOM insertions for performance\nconst fragment = document.createDocumentFragment();\nusers.forEach(user =&gt; {\n  const li = document.createElement(&#39;li&#39;);\n  li.textContent = user.name;\n  fragment.appendChild(li);\n});\nlist.appendChild(fragment); // One DOM operation instead of N\n</code></pre>\n<h3>Event Handling</h3>\n<pre><code class=\"language-javascript\">// ——— Adding event listeners ———\nconst button = document.getElementById(&#39;submit-btn&#39;);\n\nfunction handleClick(event) {\n  event.preventDefault();   // Stop form submission, link navigation, etc.\n  event.stopPropagation();  // Stop event from bubbling up\n\n  console.log(event.type);       // &#39;click&#39;\n  console.log(event.target);     // Element that was actually clicked\n  console.log(event.currentTarget); // Element the listener is attached to\n  console.log(event.clientX, event.clientY); // Mouse position\n}\n\nbutton.addEventListener(&#39;click&#39;, handleClick);\nbutton.removeEventListener(&#39;click&#39;, handleClick); // Must pass same function reference\n\n// Options\nbutton.addEventListener(&#39;click&#39;, handler, {\n  once: true,       // Auto-remove after first trigger\n  passive: true,    // Won&#39;t call preventDefault (performance hint for scroll)\n  capture: true,    // Fire during capture phase (down the tree) vs bubble (up)\n});\n\n// ——— Event delegation ———\n// Instead of attaching listeners to every item, attach to the parent\n// and check what was clicked. Better performance, works for dynamically added items.\n\ndocument.getElementById(&#39;todo-list&#39;).addEventListener(&#39;click&#39;, (event) =&gt; {\n  const deleteBtn = event.target.closest(&#39;[data-action=&quot;delete&quot;]&#39;);\n  if (!deleteBtn) return;\n\n  const todoId = deleteBtn.dataset.todoId;\n  deleteTodo(todoId);\n});\n\n// ——— Common events ———\n// Mouse: click, dblclick, mousedown, mouseup, mouseover, mouseout, mousemove, contextmenu\n// Keyboard: keydown, keyup, keypress (deprecated)\n// Form: submit, change, input, focus, blur, focusin, focusout\n// Window: load, DOMContentLoaded, resize, scroll, hashchange\n// Touch: touchstart, touchend, touchmove\n// Custom: dispatchEvent(new CustomEvent(&#39;my-event&#39;, { detail: data }))\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t50",
            "title": "The Fetch API",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-javascript\">// ——— GET request ———\nasync function getUser(id) {\n  const response = await fetch(`/api/users/${id}`, {\n    headers: {\n      &#39;Accept&#39;: &#39;application/json&#39;,\n    }\n  });\n\n  if (!response.ok) {\n    // fetch() only rejects on network errors, not HTTP errors!\n    throw new Error(`HTTP ${response.status}: ${response.statusText}`);\n  }\n\n  return response.json();\n}\n\n// ——— POST request ———\nasync function createUser(userData) {\n  const response = await fetch(&#39;/api/users&#39;, {\n    method: &#39;POST&#39;,\n    headers: {\n      &#39;Content-Type&#39;: &#39;application/json&#39;,\n      &#39;Authorization&#39;: `Bearer ${getAuthToken()}`,\n    },\n    body: JSON.stringify(userData),\n  });\n\n  if (!response.ok) {\n    const error = await response.json().catch(() =&gt; null);\n    throw new Error(error?.message ?? `HTTP ${response.status}`);\n  }\n\n  return response.json();\n}\n\n// ——— File upload ———\nasync function uploadAvatar(file) {\n  const formData = new FormData();\n  formData.append(&#39;avatar&#39;, file);\n  formData.append(&#39;userId&#39;, getCurrentUserId());\n\n  const response = await fetch(&#39;/api/upload/avatar&#39;, {\n    method: &#39;POST&#39;,\n    // Don&#39;t set Content-Type — browser will set it with the boundary\n    body: formData,\n  });\n\n  return response.json();\n}\n\n// ——— Request with timeout ———\nasync function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {\n  const controller = new AbortController();\n  const timeout = setTimeout(() =&gt; controller.abort(), timeoutMs);\n\n  try {\n    const response = await fetch(url, {\n      ...options,\n      signal: controller.signal,\n    });\n    return response;\n  } catch (err) {\n    if (err.name === &#39;AbortError&#39;) {\n      throw new Error(`Request timed out after ${timeoutMs}ms`);\n    }\n    throw err;\n  } finally {\n    clearTimeout(timeout);\n  }\n}\n\n// ——— Retry wrapper ———\nasync function fetchWithRetry(url, options, maxRetries = 3) {\n  let lastError;\n\n  for (let attempt = 1; attempt &lt;= maxRetries; attempt++) {\n    try {\n      const response = await fetch(url, options);\n      if (!response.ok &amp;&amp; response.status &gt;= 500 &amp;&amp; attempt &lt; maxRetries) {\n        // Server error — retry\n        const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 10000);\n        await new Promise(resolve =&gt; setTimeout(resolve, backoff));\n        continue;\n      }\n      return response;\n    } catch (err) {\n      lastError = err;\n      if (attempt &lt; maxRetries) {\n        await new Promise(resolve =&gt; setTimeout(resolve, 1000 * attempt));\n      }\n    }\n  }\n\n  throw lastError;\n}\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t51",
            "title": "Advanced JavaScript: Prototypes and Classes",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<p>JavaScript&#39;s inheritance model is <strong>prototypal</strong> — objects inherit from other objects, not classes. ES6 <code>class</code> syntax is syntactic sugar over this system.</p>\n<pre><code class=\"language-javascript\">// ——— Prototypal inheritance ———\nconst animal = {\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n};\n\nconst dog = Object.create(animal); // dog&#39;s prototype is animal\ndog.name = &#39;Rex&#39;;\ndog.bark = function() { return &#39;Woof!&#39;; };\n\ndog.speak(); // &#39;Rex makes a sound&#39; — found via prototype chain\ndog.bark();  // &#39;Woof!&#39; — found directly on dog\n\n// ——— ES6 Classes ———\nclass Animal {\n  // Private fields (real privacy — not accessible outside class)\n  #name;\n  #sound;\n\n  constructor(name, sound) {\n    this.#name = name;\n    this.#sound = sound;\n  }\n\n  speak() {\n    return `${this.#name} says ${this.#sound}`;\n  }\n\n  get name() { return this.#name; }\n\n  // Static method — on the class, not the instance\n  static create(name, sound) {\n    return new Animal(name, sound);\n  }\n}\n\nclass Dog extends Animal {\n  #tricks = [];\n\n  constructor(name) {\n    super(name, &#39;Woof&#39;); // Must call super() before using this\n  }\n\n  learnTrick(trick) {\n    this.#tricks.push(trick);\n  }\n\n  perform() {\n    return this.#tricks.map(trick =&gt;\n      `${this.name} performs ${trick}`\n    );\n  }\n}\n\nconst rex = new Dog(&#39;Rex&#39;);\nrex.speak();              // &#39;Rex says Woof&#39;\nrex.learnTrick(&#39;sit&#39;);\nrex.learnTrick(&#39;shake&#39;);\nrex.perform();            // [&#39;Rex performs sit&#39;, &#39;Rex performs shake&#39;]\nrex instanceof Dog;       // true\nrex instanceof Animal;    // true\n</code></pre>\n<h3>Mixins Pattern</h3>\n<p>JavaScript only supports single inheritance. Mixins let you compose behaviors:</p>\n<pre><code class=\"language-javascript\">const Serializable = (superclass) =&gt; class extends superclass {\n  serialize() {\n    return JSON.stringify(this);\n  }\n\n  static deserialize(data) {\n    return Object.assign(new this(), JSON.parse(data));\n  }\n};\n\nconst Validatable = (superclass) =&gt; class extends superclass {\n  validate() {\n    const errors = [];\n    for (const [field, rule] of Object.entries(this.constructor.rules ?? {})) {\n      if (rule.required &amp;&amp; !this[field]) {\n        errors.push(`${field} is required`);\n      }\n    }\n    return errors;\n  }\n};\n\nclass User extends Serializable(Validatable(class {})) {\n  static rules = {\n    name: { required: true },\n    email: { required: true }\n  };\n\n  constructor(name, email) {\n    super();\n    this.name = name;\n    this.email = email;\n  }\n}\n\nconst user = new User(&#39;Alice&#39;, &#39;alice@example.com&#39;);\nuser.validate();    // []\nuser.serialize();   // &#39;{&quot;name&quot;:&quot;Alice&quot;,&quot;email&quot;:&quot;alice@example.com&quot;}&#39;\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t52",
            "title": "Error Handling",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-javascript\">// ——— Custom error classes ———\nclass AppError extends Error {\n  constructor(message, code, statusCode = 500) {\n    super(message);\n    this.name = this.constructor.name;\n    this.code = code;\n    this.statusCode = statusCode;\n    // Maintains proper stack trace in V8\n    if (Error.captureStackTrace) {\n      Error.captureStackTrace(this, this.constructor);\n    }\n  }\n}\n\nclass ValidationError extends AppError {\n  constructor(message, fields = {}) {\n    super(message, &#39;VALIDATION_ERROR&#39;, 422);\n    this.fields = fields;\n  }\n}\n\nclass NotFoundError extends AppError {\n  constructor(resource, id) {\n    super(`${resource} with id ${id} not found`, &#39;NOT_FOUND&#39;, 404);\n    this.resource = resource;\n  }\n}\n\nclass NetworkError extends AppError {\n  constructor(message, retryable = true) {\n    super(message, &#39;NETWORK_ERROR&#39;, 503);\n    this.retryable = retryable;\n  }\n}\n\n// ——— Using custom errors ———\nasync function getUser(id) {\n  if (!Number.isInteger(id) || id &lt;= 0) {\n    throw new ValidationError(&#39;Invalid user ID&#39;, { id: &#39;Must be a positive integer&#39; });\n  }\n\n  const user = await db.query(&#39;SELECT * FROM users WHERE id = ?&#39;, [id]);\n\n  if (!user) {\n    throw new NotFoundError(&#39;User&#39;, id);\n  }\n\n  return user;\n}\n\n// ——— Catching specific errors ———\nasync function handleRequest(req, res) {\n  try {\n    const user = await getUser(parseInt(req.params.id));\n    res.json(user);\n  } catch (err) {\n    if (err instanceof ValidationError) {\n      return res.status(422).json({\n        error: err.message,\n        fields: err.fields\n      });\n    }\n\n    if (err instanceof NotFoundError) {\n      return res.status(404).json({ error: err.message });\n    }\n\n    // Unknown error — log it and return generic message\n    console.error(&#39;Unexpected error:&#39;, err);\n    res.status(500).json({ error: &#39;Internal server error&#39; });\n  }\n}\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t53",
            "title": "Functional Programming Patterns",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-javascript\">// ——— Pure functions ———\n// Same input → always same output, no side effects\nconst add = (a, b) =&gt; a + b;           // Pure\nconst getDate = () =&gt; new Date();       // Impure (different output each time)\nlet state = 0;\nconst increment = () =&gt; ++state;        // Impure (modifies external state)\n\n// ——— Immutability ———\n// Instead of mutating, create new versions\nconst user = { name: &#39;Alice&#39;, age: 30 };\nconst updatedUser = { ...user, age: 31 }; // New object, original unchanged\n\nconst nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n =&gt; n * 2);     // New array\n\n// ——— Higher-order functions ———\n// Functions that take or return functions\nconst pipe = (...fns) =&gt; (value) =&gt;\n  fns.reduce((acc, fn) =&gt; fn(acc), value);\n\nconst compose = (...fns) =&gt; (value) =&gt;\n  fns.reduceRight((acc, fn) =&gt; fn(acc), value);\n\n// Process user names: trim, lowercase, replace spaces\nconst sanitizeName = pipe(\n  str =&gt; str.trim(),\n  str =&gt; str.toLowerCase(),\n  str =&gt; str.replace(/\\s+/g, &#39;_&#39;)\n);\n\nsanitizeName(&#39;  Alice Chen  &#39;); // &#39;alice_chen&#39;\n\n// ——— Currying ———\nconst curry = (fn) =&gt; {\n  const arity = fn.length;\n  return function curried(...args) {\n    if (args.length &gt;= arity) {\n      return fn(...args);\n    }\n    return (...moreArgs) =&gt; curried(...args, ...moreArgs);\n  };\n};\n\nconst add3 = curry((a, b, c) =&gt; a + b + c);\nadd3(1)(2)(3);     // 6\nadd3(1, 2)(3);     // 6\nadd3(1)(2, 3);     // 6\nadd3(1, 2, 3);     // 6\n\nconst addTo10 = add3(10);   // Partial application\naddTo10(2)(3);              // 15\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t54",
            "title": "Mini Project: Implement Debounce and an Event Emitter",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "htmlContent": "<h3>Debounce</h3>\n<p>Debounce delays a function call until after a period of inactivity. The classic use: don&#39;t fire a search API call on every keystroke, fire it when the user stops typing.</p>\n<pre><code class=\"language-javascript\">/**\n * Creates a debounced version of a function.\n * The debounced function will only call fn after\n * `delay` ms have passed without being called again.\n *\n * @param {Function} fn - The function to debounce\n * @param {number} delay - Milliseconds to wait\n * @param {Object} options\n * @param {boolean} options.leading - Call immediately on first invocation\n * @param {boolean} options.trailing - Call after delay (default: true)\n */\nfunction debounce(fn, delay, { leading = false, trailing = true } = {}) {\n  let timerId = null;\n  let lastArgs = null;\n  let lastContext = null;\n\n  function invoke() {\n    fn.apply(lastContext, lastArgs);\n    lastArgs = null;\n    lastContext = null;\n  }\n\n  function debounced(...args) {\n    lastArgs = args;\n    lastContext = this;\n\n    const callNow = leading &amp;&amp; !timerId;\n\n    clearTimeout(timerId);\n\n    timerId = setTimeout(() =&gt; {\n      timerId = null;\n      if (trailing &amp;&amp; !callNow) invoke();\n    }, delay);\n\n    if (callNow) invoke();\n  }\n\n  debounced.cancel = function() {\n    clearTimeout(timerId);\n    timerId = null;\n  };\n\n  debounced.flush = function() {\n    if (timerId) {\n      clearTimeout(timerId);\n      timerId = null;\n      if (lastArgs) invoke();\n    }\n  };\n\n  return debounced;\n}\n\n// Usage:\nconst searchInput = document.getElementById(&#39;search&#39;);\nconst performSearch = debounce(async (query) =&gt; {\n  if (!query.trim()) return;\n  const results = await fetchSearchResults(query);\n  displayResults(results);\n}, 300);\n\nsearchInput.addEventListener(&#39;input&#39;, (e) =&gt; performSearch(e.target.value));\n</code></pre>\n<h3>Throttle (companion to debounce)</h3>\n<p>Throttle ensures a function runs at most once per interval. Use for scroll handlers, resize handlers — things that fire rapidly and just need periodic sampling.</p>\n<pre><code class=\"language-javascript\">function throttle(fn, interval) {\n  let lastCall = 0;\n  let timerId = null;\n\n  return function throttled(...args) {\n    const now = Date.now();\n    const remaining = interval - (now - lastCall);\n\n    if (remaining &lt;= 0) {\n      // Enough time has passed — call immediately\n      clearTimeout(timerId);\n      lastCall = now;\n      fn.apply(this, args);\n    } else {\n      // Schedule call for when interval completes\n      clearTimeout(timerId);\n      timerId = setTimeout(() =&gt; {\n        lastCall = Date.now();\n        fn.apply(this, args);\n      }, remaining);\n    }\n  };\n}\n\n// Usage:\nconst onScroll = throttle(() =&gt; {\n  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;\n  updateProgressBar(scrollPercent);\n}, 16); // ~60fps\n\nwindow.addEventListener(&#39;scroll&#39;, onScroll, { passive: true });\n</code></pre>\n<h3>Event Emitter</h3>\n<p>The event emitter pattern decouples components — one part of your code emits events, other parts react to them, without direct coupling.</p>\n<pre><code class=\"language-javascript\">class EventEmitter {\n  #listeners = new Map();\n  #onceListeners = new Map();\n\n  /**\n   * Register a listener for an event\n   */\n  on(event, listener) {\n    if (typeof listener !== &#39;function&#39;) {\n      throw new TypeError(&#39;Listener must be a function&#39;);\n    }\n\n    if (!this.#listeners.has(event)) {\n      this.#listeners.set(event, new Set());\n    }\n    this.#listeners.get(event).add(listener);\n\n    // Return unsubscribe function (convenient for cleanup)\n    return () =&gt; this.off(event, listener);\n  }\n\n  /**\n   * Register a listener that fires only once\n   */\n  once(event, listener) {\n    const wrapper = (...args) =&gt; {\n      listener(...args);\n      this.off(event, wrapper);\n    };\n\n    if (!this.#onceListeners.has(event)) {\n      this.#onceListeners.set(event, new Map());\n    }\n    this.#onceListeners.get(event).set(listener, wrapper);\n\n    return this.on(event, wrapper);\n  }\n\n  /**\n   * Remove a listener\n   */\n  off(event, listener) {\n    // Check if this is a once-wrapped listener\n    const onceMap = this.#onceListeners.get(event);\n    if (onceMap?.has(listener)) {\n      const wrapper = onceMap.get(listener);\n      onceMap.delete(listener);\n      this.#listeners.get(event)?.delete(wrapper);\n      return this;\n    }\n\n    this.#listeners.get(event)?.delete(listener);\n    return this;\n  }\n\n  /**\n   * Emit an event, calling all registered listeners\n   */\n  emit(event, ...args) {\n    const listeners = this.#listeners.get(event);\n    if (!listeners?.size) return false;\n\n    // Copy before iterating in case a listener removes itself\n    for (const listener of [...listeners]) {\n      try {\n        listener(...args);\n      } catch (err) {\n        console.error(`Error in listener for &quot;${event}&quot;:`, err);\n      }\n    }\n\n    return true;\n  }\n\n  /**\n   * Remove all listeners for an event, or all listeners if no event specified\n   */\n  removeAllListeners(event) {\n    if (event) {\n      this.#listeners.delete(event);\n      this.#onceListeners.delete(event);\n    } else {\n      this.#listeners.clear();\n      this.#onceListeners.clear();\n    }\n    return this;\n  }\n\n  /**\n   * List registered events\n   */\n  eventNames() {\n    return [...this.#listeners.keys()].filter(\n      key =&gt; this.#listeners.get(key).size &gt; 0\n    );\n  }\n\n  listenerCount(event) {\n    return this.#listeners.get(event)?.size ?? 0;\n  }\n}\n\n// ——— Usage: a shopping cart ———\nclass ShoppingCart extends EventEmitter {\n  #items = [];\n\n  add(product, quantity = 1) {\n    const existing = this.#items.find(i =&gt; i.product.id === product.id);\n    if (existing) {\n      existing.quantity += quantity;\n    } else {\n      this.#items.push({ product, quantity });\n    }\n    this.emit(&#39;item:added&#39;, { product, quantity });\n    this.emit(&#39;change&#39;, this.getState());\n  }\n\n  remove(productId) {\n    const index = this.#items.findIndex(i =&gt; i.product.id === productId);\n    if (index === -1) return;\n    const [removed] = this.#items.splice(index, 1);\n    this.emit(&#39;item:removed&#39;, removed);\n    this.emit(&#39;change&#39;, this.getState());\n  }\n\n  getState() {\n    const total = this.#items.reduce(\n      (sum, { product, quantity }) =&gt; sum + product.price * quantity,\n      0\n    );\n    return {\n      items: [...this.#items],\n      total,\n      count: this.#items.reduce((n, { quantity }) =&gt; n + quantity, 0)\n    };\n  }\n}\n\nconst cart = new ShoppingCart();\n\n// Different parts of the UI listen independently\nconst unsubscribeCount = cart.on(&#39;change&#39;, ({ count }) =&gt; {\n  document.getElementById(&#39;cart-badge&#39;).textContent = count;\n});\n\ncart.on(&#39;change&#39;, ({ total }) =&gt; {\n  document.getElementById(&#39;cart-total&#39;).textContent = `$${total.toFixed(2)}`;\n});\n\ncart.once(&#39;item:added&#39;, ({ product }) =&gt; {\n  showToast(`${product.name} added to cart`);\n});\n\n// Unsubscribe when component unmounts\nfunction onComponentUnmount() {\n  unsubscribeCount();\n}\n</code></pre>\n<hr>\n"
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t55",
            "title": "Implement debounce",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Implement debounce",
              "desc": "Put your knowledge to the test by implementing \"Implement debounce\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/js-1"
            }
          },
          {
            "id": "t56",
            "title": "Build event emitter",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Build event emitter",
              "desc": "Put your knowledge to the test by implementing \"Build event emitter\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/js-2"
            }
          },
          {
            "id": "t57",
            "title": "Promise implementation",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Promise implementation",
              "desc": "Put your knowledge to the test by implementing \"Promise implementation\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/js-3"
            }
          },
          {
            "id": "t58",
            "title": "Deep clone object",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Deep clone object",
              "desc": "Put your knowledge to the test by implementing \"Deep clone object\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/js-4"
            }
          }
        ]
      }
    ]
  },
  "ts": {
    "id": "ts",
    "title": "TypeScript",
    "description": "Learn TS",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t59",
            "title": "Why TypeScript",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-javascript\">// In JavaScript, this is valid code\nfunction getUser(id) {\n  return db.query(`SELECT * FROM users WHERE id = ${id}`);\n}\n\n// You can call it with anything:\ngetUser(42);              // ✓ intended\ngetUser(&#39;alice&#39;);         // Probably a bug\ngetUser(null);            // SQL injection? Bug?\ngetUser({ id: 42 });      // SQL: &quot;WHERE id = [object Object]&quot; — definitely a bug\n\n// TypeScript version — the compiler tells you what&#39;s wrong immediately\nfunction getUser(id: number): Promise&lt;User | null&gt; {\n  return db.query(`SELECT * FROM users WHERE id = ?`, [id]);\n}\n\ngetUser(&#39;alice&#39;);          // Error: Argument of type &#39;string&#39; not assignable to &#39;number&#39;\ngetUser(null);             // Error: Argument of type &#39;null&#39; not assignable to &#39;number&#39;\ngetUser({ id: 42 });       // Error: Argument of type &#39;{id: number}&#39; not assignable to &#39;number&#39;\n</code></pre>\n<p>TypeScript is a &quot;linter on steroids&quot; that understands the shape of your data.</p>\n<hr>\n"
            }
          },
          {
            "id": "t60",
            "title": "The Type System Basics",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-typescript\">// ——— Primitive types ———\nconst name: string = &#39;Alice&#39;;\nconst age: number = 30;\nconst active: boolean = true;\nconst nothing: null = null;\nconst nada: undefined = undefined;\nconst id: symbol = Symbol(&#39;userId&#39;);\nconst bigNum: bigint = 9007199254740993n;\n\n// ——— Type inference ———\n// TypeScript infers types — you don&#39;t always need annotations\nconst name = &#39;Alice&#39;;     // TypeScript infers: string\nconst age = 30;           // TypeScript infers: number\nconst active = true;      // TypeScript infers: boolean\n\n// Annotate when inference isn&#39;t specific enough, or for documentation\nconst pi: number = 3.14159; // Redundant but explicit\nlet count: number;           // Necessary — can&#39;t infer without a value\n\n// ——— Arrays ———\nconst names: string[] = [&#39;Alice&#39;, &#39;Bob&#39;];\nconst ids: number[] = [1, 2, 3];\nconst flags: boolean[] = [true, false, true];\nconst mixed: (string | number)[] = [&#39;Alice&#39;, 42, &#39;Bob&#39;, 1];\n\n// Generic array syntax (equivalent)\nconst names: Array&lt;string&gt; = [&#39;Alice&#39;, &#39;Bob&#39;];\n\n// Readonly array — can&#39;t be mutated\nconst frozen: readonly number[] = [1, 2, 3];\n// frozen.push(4); // Error\n\n// ——— Tuples: fixed-length arrays with specific types ———\nconst point: [number, number] = [10, 20];\nconst entry: [string, number] = [&#39;Alice&#39;, 42];\nconst response: [number, string, boolean] = [200, &#39;OK&#39;, true];\n\n// Named tuple elements\nconst rgb: [red: number, green: number, blue: number] = [255, 128, 0];\n\n// ——— Unions: one of several types ———\ntype ID = number | string;\ntype Status = &#39;active&#39; | &#39;inactive&#39; | &#39;pending&#39; | &#39;banned&#39;;\ntype Result&lt;T&gt; = T | null | undefined;\n\nfunction formatId(id: ID): string {\n  return typeof id === &#39;number&#39; ? id.toString(16) : id;\n}\n\n// ——— Intersections: combine types ———\ntype Timestamped = { createdAt: Date; updatedAt: Date };\ntype SoftDeletable = { deletedAt: Date | null };\ntype AuditedRecord = Timestamped &amp; SoftDeletable;\n\n// ——— Literal types: exact values ———\ntype Direction = &#39;north&#39; | &#39;south&#39; | &#39;east&#39; | &#39;west&#39;;\ntype Dice = 1 | 2 | 3 | 4 | 5 | 6;\ntype Answer = true; // Only true, not false\n\nlet heading: Direction = &#39;north&#39;;\n// heading = &#39;up&#39;; // Error: not a valid Direction\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t61",
            "title": "Interfaces vs Types",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>Both define the shape of objects. The differences are subtle but matter in certain situations.</p>\n<pre><code class=\"language-typescript\">// ——— Interface ———\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  role: &#39;admin&#39; | &#39;editor&#39; | &#39;viewer&#39;;\n  createdAt: Date;\n  avatar?: string;    // Optional\n  readonly apiKey: string; // Can&#39;t be changed after creation\n}\n\n// Interfaces can be extended\ninterface AdminUser extends User {\n  permissions: string[];\n  canDeleteUsers: boolean;\n}\n\n// Interfaces can be merged (declaration merging)\ninterface User {\n  // This ADDS to the above definition, not replaces it\n  lastLoginAt?: Date;\n}\n\n// ——— Type alias ———\ntype User = {\n  id: number;\n  name: string;\n  // ... same fields\n};\n\n// Type aliases can represent anything (not just objects)\ntype ID = string | number;\ntype Callback&lt;T&gt; = (error: Error | null, result: T | null) =&gt; void;\ntype Transform&lt;T, U&gt; = (value: T) =&gt; U;\ntype Nullable&lt;T&gt; = T | null;\n\n// Type aliases can extend with intersection\ntype AdminUser = User &amp; {\n  permissions: string[];\n};\n\n// Type aliases can use conditional types (interfaces can&#39;t)\ntype NonNullable&lt;T&gt; = T extends null | undefined ? never : T;\n</code></pre>\n<p><strong>Rule of thumb</strong>: Use <code>interface</code> for object shapes (especially public API shapes). Use <code>type</code> for everything else: unions, intersections, mapped types, utility types, primitives, functions.</p>\n<hr>\n"
            }
          },
          {
            "id": "t62",
            "title": "Functions",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<pre><code class=\"language-typescript\">// ——— Function signatures ———\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// Arrow function\nconst add = (a: number, b: number): number =&gt; a + b;\n\n// Optional parameters\nfunction greet(name: string, title?: string): string {\n  return title ? `Hello, ${title} ${name}` : `Hello, ${name}`;\n}\n\n// Default parameters\nfunction createUser(\n  name: string,\n  role: &#39;admin&#39; | &#39;user&#39; = &#39;user&#39;,\n  active: boolean = true\n): User {\n  // ...\n}\n\n// Rest parameters\nfunction sum(...numbers: number[]): number {\n  return numbers.reduce((a, b) =&gt; a + b, 0);\n}\n\n// Function type\ntype MathFn = (a: number, b: number) =&gt; number;\nconst multiply: MathFn = (a, b) =&gt; a * b;\n\n// Overloads: different signatures for different call patterns\nfunction formatDate(date: Date): string;\nfunction formatDate(timestamp: number): string;\nfunction formatDate(dateString: string): string;\nfunction formatDate(value: Date | number | string): string {\n  // Implementation handles all cases\n  const date = value instanceof Date ? value : new Date(value);\n  return date.toLocaleDateString(&#39;en-US&#39;, {\n    year: &#39;numeric&#39;, month: &#39;long&#39;, day: &#39;numeric&#39;\n  });\n}\n\nformatDate(new Date());         // ✓\nformatDate(1709769600000);      // ✓\nformatDate(&#39;2025-03-07&#39;);       // ✓\nformatDate(true);               // Error: none of the overloads match\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t63",
            "title": "Generics",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<p>Generics let you write reusable code that works with multiple types while preserving type information.</p>\n<pre><code class=\"language-typescript\">// ——— Basic generic ———\nfunction identity&lt;T&gt;(value: T): T {\n  return value;\n}\n\nidentity&lt;string&gt;(&#39;hello&#39;);    // Returns string\nidentity&lt;number&gt;(42);         // Returns number\nidentity(&#39;hello&#39;);            // TypeScript infers T = string\nidentity(42);                 // TypeScript infers T = number\n\n// ——— Generic containers ———\ninterface Box&lt;T&gt; {\n  value: T;\n  isEmpty: boolean;\n}\n\ninterface Paginated&lt;T&gt; {\n  data: T[];\n  total: number;\n  page: number;\n  perPage: number;\n  totalPages: number;\n}\n\n// Usage:\nconst userPage: Paginated&lt;User&gt; = {\n  data: [user1, user2, user3],\n  total: 100,\n  page: 1,\n  perPage: 10,\n  totalPages: 10\n};\n\n// ——— Generic functions with constraints ———\n// T must have an &#39;id&#39; property of type number or string\nfunction findById&lt;T extends { id: number | string }&gt;(\n  items: T[],\n  id: number | string\n): T | undefined {\n  return items.find(item =&gt; item.id === id);\n}\n\nfindById(users, 42);          // Returns User | undefined\nfindById(products, &#39;abc&#39;);    // Returns Product | undefined\n// findById([1, 2, 3], 1);   // Error: number doesn&#39;t have an &#39;id&#39; property\n\n// ——— Multiple type parameters ———\nfunction zip&lt;A, B&gt;(as: A[], bs: B[]): [A, B][] {\n  return as.slice(0, bs.length).map((a, i) =&gt; [a, bs[i]]);\n}\n\nconst pairs = zip([1, 2, 3], [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;]);\n// Type: [number, string][]\n\n// ——— Generic React component ———\ninterface TableProps&lt;T&gt; {\n  data: T[];\n  columns: {\n    key: keyof T;\n    header: string;\n    render?: (value: T[keyof T], row: T) =&gt; React.ReactNode;\n  }[];\n}\n\nfunction Table&lt;T extends Record&lt;string, unknown&gt;&gt;({\n  data,\n  columns\n}: TableProps&lt;T&gt;) {\n  return (\n    &lt;table&gt;\n      &lt;thead&gt;\n        &lt;tr&gt;\n          {columns.map(col =&gt; (\n            &lt;th key={String(col.key)}&gt;{col.header}&lt;/th&gt;\n          ))}\n        &lt;/tr&gt;\n      &lt;/thead&gt;\n      &lt;tbody&gt;\n        {data.map((row, i) =&gt; (\n          &lt;tr key={i}&gt;\n            {columns.map(col =&gt; (\n              &lt;td key={String(col.key)}&gt;\n                {col.render\n                  ? col.render(row[col.key], row)\n                  : String(row[col.key])}\n              &lt;/td&gt;\n            ))}\n          &lt;/tr&gt;\n        ))}\n      &lt;/tbody&gt;\n    &lt;/table&gt;\n  );\n}\n\n// Fully typed usage — TypeScript knows the shape of User\n&lt;Table&lt;User&gt;\n  data={users}\n  columns={[\n    { key: &#39;name&#39;, header: &#39;Name&#39; },\n    { key: &#39;email&#39;, header: &#39;Email&#39; },\n    { key: &#39;role&#39;, header: &#39;Role&#39;, render: (role) =&gt; &lt;Badge&gt;{role}&lt;/Badge&gt; }\n  ]}\n/&gt;\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t64",
            "title": "Utility Types",
            "type": "reading",
            "readingTime": "2 min read",
            "article": {
              "htmlContent": "<p>TypeScript has built-in generic types for common transformations:</p>\n<pre><code class=\"language-typescript\">interface User {\n  id: number;\n  name: string;\n  email: string;\n  password: string;\n  role: &#39;admin&#39; | &#39;user&#39;;\n  createdAt: Date;\n}\n\n// Partial&lt;T&gt; — all properties optional\ntype UserUpdate = Partial&lt;User&gt;;\n// { id?: number; name?: string; email?: string; ... }\n\n// Required&lt;T&gt; — all properties required\ntype StrictConfig = Required&lt;Partial&lt;Config&gt;&gt;;\n\n// Readonly&lt;T&gt; — all properties read-only\ntype ImmutableUser = Readonly&lt;User&gt;;\n\n// Pick&lt;T, K&gt; — only certain properties\ntype UserPublicProfile = Pick&lt;User, &#39;id&#39; | &#39;name&#39; | &#39;role&#39;&gt;;\n// { id: number; name: string; role: &#39;admin&#39; | &#39;user&#39; }\n\n// Omit&lt;T, K&gt; — all except certain properties\ntype UserWithoutPassword = Omit&lt;User, &#39;password&#39;&gt;;\n// { id: number; name: string; email: string; role: ...; createdAt: Date }\n\n// Record&lt;K, V&gt; — object type with keys K and values V\ntype RolePermissions = Record&lt;&#39;admin&#39; | &#39;editor&#39; | &#39;viewer&#39;, string[]&gt;;\ntype UsersById = Record&lt;number, User&gt;;\n\n// Exclude&lt;T, U&gt; — remove from union\ntype NonAdmin = Exclude&lt;&#39;admin&#39; | &#39;editor&#39; | &#39;viewer&#39;, &#39;admin&#39;&gt;;\n// &#39;editor&#39; | &#39;viewer&#39;\n\n// Extract&lt;T, U&gt; — keep matching from union\ntype AdminOrEditor = Extract&lt;&#39;admin&#39; | &#39;editor&#39; | &#39;viewer&#39;, &#39;admin&#39; | &#39;editor&#39;&gt;;\n// &#39;admin&#39; | &#39;editor&#39;\n\n// NonNullable&lt;T&gt; — remove null and undefined\ntype DefinitelyUser = NonNullable&lt;User | null | undefined&gt;;\n// User\n\n// ReturnType&lt;T&gt; — get return type of function\nfunction getUser(): User { /* ... */ }\ntype UserResult = ReturnType&lt;typeof getUser&gt;; // User\n\n// Parameters&lt;T&gt; — get parameter types as tuple\ntype GetUserParams = Parameters&lt;typeof getUser&gt;; // []\n\n// Awaited&lt;T&gt; — unwrap Promise\ntype ResolvedUser = Awaited&lt;Promise&lt;User&gt;&gt;; // User\ntype DeepResolved = Awaited&lt;Promise&lt;Promise&lt;User&gt;&gt;&gt;; // User\n\n// ——— Combining utility types ———\n// API response: pick certain fields, make them readonly\ntype UserAPIResponse = Readonly&lt;Pick&lt;User, &#39;id&#39; | &#39;name&#39; | &#39;email&#39; | &#39;role&#39;&gt;&gt;;\n\n// Form state: all required fields, no id or dates\ntype UserCreateForm = Required&lt;Omit&lt;User, &#39;id&#39; | &#39;createdAt&#39;&gt;&gt;;\n\n// PATCH endpoint: all optional except id\ntype UserPatch = Pick&lt;User, &#39;id&#39;&gt; &amp; Partial&lt;Omit&lt;User, &#39;id&#39;&gt;&gt;;\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t65",
            "title": "Type Narrowing",
            "type": "reading",
            "readingTime": "3 min read",
            "article": {
              "htmlContent": "<p>Type narrowing is how TypeScript refines a broader type to a more specific one inside a conditional.</p>\n<pre><code class=\"language-typescript\">// ——— typeof narrowing ———\nfunction formatInput(value: string | number | boolean): string {\n  if (typeof value === &#39;string&#39;) {\n    return value.toUpperCase(); // TypeScript knows: value is string here\n  }\n  if (typeof value === &#39;number&#39;) {\n    return value.toFixed(2);    // TypeScript knows: value is number here\n  }\n  return value ? &#39;Yes&#39; : &#39;No&#39;;  // TypeScript knows: value is boolean here\n}\n\n// ——— instanceof narrowing ———\nfunction handleError(err: unknown) {\n  if (err instanceof ValidationError) {\n    return { type: &#39;validation&#39;, fields: err.fields };\n  }\n  if (err instanceof NetworkError) {\n    return { type: &#39;network&#39;, retryable: err.retryable };\n  }\n  if (err instanceof Error) {\n    return { type: &#39;error&#39;, message: err.message };\n  }\n  return { type: &#39;unknown&#39;, raw: err };\n}\n\n// ——— &#39;in&#39; narrowing ———\ninterface Bird { fly(): void; species: string; }\ninterface Fish { swim(): void; species: string; }\n\nfunction move(animal: Bird | Fish) {\n  if (&#39;fly&#39; in animal) {\n    animal.fly(); // TypeScript knows: animal is Bird\n  } else {\n    animal.swim(); // TypeScript knows: animal is Fish\n  }\n}\n\n// ——— Discriminated unions ———\n// A &quot;discriminant&quot; field (same name, different literal type in each branch)\n// gives TypeScript a reliable way to narrow the type.\ntype APIResponse =\n  | { status: &#39;success&#39;; data: User[] }\n  | { status: &#39;error&#39;; code: number; message: string }\n  | { status: &#39;loading&#39; };\n\nfunction handleResponse(response: APIResponse) {\n  switch (response.status) {\n    case &#39;success&#39;:\n      renderUsers(response.data);   // TS knows response has .data\n      break;\n    case &#39;error&#39;:\n      showError(response.message);  // TS knows response has .message and .code\n      break;\n    case &#39;loading&#39;:\n      showSpinner();\n      break;\n    default:\n      // TypeScript will error here if you add a new status without handling it\n      const _exhaustive: never = response;\n  }\n}\n\n// ——— Type guards (custom narrowing) ———\nfunction isUser(value: unknown): value is User {\n  return (\n    typeof value === &#39;object&#39; &amp;&amp;\n    value !== null &amp;&amp;\n    &#39;id&#39; in value &amp;&amp;\n    &#39;email&#39; in value &amp;&amp;\n    typeof (value as User).email === &#39;string&#39;\n  );\n}\n\nfunction processResponse(data: unknown) {\n  if (isUser(data)) {\n    // TypeScript knows data is User here\n    console.log(data.email.toLowerCase());\n  }\n}\n\n// ——— Assertion functions ———\nfunction assertUser(value: unknown): asserts value is User {\n  if (!isUser(value)) {\n    throw new TypeError(&#39;Expected a User object&#39;);\n  }\n}\n\nconst rawData = await fetchJSON(&#39;/api/me&#39;);\nassertUser(rawData); // throws if not a User\nrawData.email;       // TypeScript knows it&#39;s a User from here\n</code></pre>\n<hr>\n"
            }
          },
          {
            "id": "t66",
            "title": "Mini Project: Build a Typed API Client",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "htmlContent": "<p>A fully type-safe HTTP client — the kind of thing you&#39;d actually use in a real project.</p>\n<pre><code class=\"language-typescript\">// api-client.ts\n\n// ——— Types ———\ninterface ApiConfig {\n  baseURL: string;\n  headers?: Record&lt;string, string&gt;;\n  timeout?: number;\n}\n\ninterface RequestOptions {\n  headers?: Record&lt;string, string&gt;;\n  params?: Record&lt;string, string | number | boolean&gt;;\n  signal?: AbortSignal;\n}\n\ntype ApiResponse&lt;T&gt; =\n  | { ok: true;  status: number; data: T }\n  | { ok: false; status: number; error: ApiError };\n\ninterface ApiError {\n  message: string;\n  code?: string;\n  details?: Record&lt;string, string[]&gt;;\n}\n\n// ——— The client ———\nclass TypedApiClient {\n  readonly #config: Required&lt;ApiConfig&gt;;\n\n  constructor(config: ApiConfig) {\n    this.#config = {\n      headers: {},\n      timeout: 10000,\n      ...config\n    };\n  }\n\n  async get&lt;T&gt;(path: string, options?: RequestOptions): Promise&lt;ApiResponse&lt;T&gt;&gt; {\n    return this.#request&lt;T&gt;(&#39;GET&#39;, path, undefined, options);\n  }\n\n  async post&lt;T&gt;(path: string, body: unknown, options?: RequestOptions): Promise&lt;ApiResponse&lt;T&gt;&gt; {\n    return this.#request&lt;T&gt;(&#39;POST&#39;, path, body, options);\n  }\n\n  async put&lt;T&gt;(path: string, body: unknown, options?: RequestOptions): Promise&lt;ApiResponse&lt;T&gt;&gt; {\n    return this.#request&lt;T&gt;(&#39;PUT&#39;, path, body, options);\n  }\n\n  async patch&lt;T&gt;(path: string, body: unknown, options?: RequestOptions): Promise&lt;ApiResponse&lt;T&gt;&gt; {\n    return this.#request&lt;T&gt;(&#39;PATCH&#39;, path, body, options);\n  }\n\n  async delete&lt;T = void&gt;(path: string, options?: RequestOptions): Promise&lt;ApiResponse&lt;T&gt;&gt; {\n    return this.#request&lt;T&gt;(&#39;DELETE&#39;, path, undefined, options);\n  }\n\n  async #request&lt;T&gt;(\n    method: string,\n    path: string,\n    body?: unknown,\n    options?: RequestOptions\n  ): Promise&lt;ApiResponse&lt;T&gt;&gt; {\n    const url = new URL(path, this.#config.baseURL);\n\n    // Add query params\n    if (options?.params) {\n      Object.entries(options.params).forEach(([key, value]) =&gt; {\n        url.searchParams.set(key, String(value));\n      });\n    }\n\n    const controller = new AbortController();\n    const timeout = setTimeout(\n      () =&gt; controller.abort(),\n      this.#config.timeout\n    );\n\n    try {\n      const response = await fetch(url.toString(), {\n        method,\n        headers: {\n          &#39;Content-Type&#39;: &#39;application/json&#39;,\n          &#39;Accept&#39;: &#39;application/json&#39;,\n          ...this.#config.headers,\n          ...options?.headers,\n        },\n        body: body !== undefined ? JSON.stringify(body) : undefined,\n        signal: options?.signal ?? controller.signal,\n      });\n\n      const contentType = response.headers.get(&#39;content-type&#39;);\n      const isJSON = contentType?.includes(&#39;application/json&#39;);\n\n      if (response.ok) {\n        const data = isJSON ? await response.json() as T : undefined as T;\n        return { ok: true, status: response.status, data };\n      } else {\n        const error: ApiError = isJSON\n          ? await response.json()\n          : { message: response.statusText };\n        return { ok: false, status: response.status, error };\n      }\n\n    } catch (err) {\n      if ((err as Error).name === &#39;AbortError&#39;) {\n        return {\n          ok: false,\n          status: 0,\n          error: { message: &#39;Request timed out&#39;, code: &#39;TIMEOUT&#39; }\n        };\n      }\n      return {\n        ok: false,\n        status: 0,\n        error: { message: (err as Error).message, code: &#39;NETWORK_ERROR&#39; }\n      };\n    } finally {\n      clearTimeout(timeout);\n    }\n  }\n\n  // Create a new client with added headers (e.g., after auth)\n  withHeaders(headers: Record&lt;string, string&gt;): TypedApiClient {\n    return new TypedApiClient({\n      ...this.#config,\n      headers: { ...this.#config.headers, ...headers }\n    });\n  }\n}\n\n// ——— Domain types ———\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  role: &#39;admin&#39; | &#39;editor&#39; | &#39;viewer&#39;;\n  createdAt: string; // ISO date string from API\n}\n\ninterface Post {\n  id: number;\n  title: string;\n  body: string;\n  authorId: number;\n  publishedAt: string | null;\n}\n\ninterface CreateUserPayload {\n  name: string;\n  email: string;\n  role?: User[&#39;role&#39;];\n}\n\n// ——— API service layer ———\nconst httpClient = new TypedApiClient({\n  baseURL: &#39;https://api.example.com&#39;,\n  timeout: 15000,\n});\n\n// Authenticated client factory\nfunction createAuthClient(token: string) {\n  return httpClient.withHeaders({\n    &#39;Authorization&#39;: `Bearer ${token}`\n  });\n}\n\n// ——— Resource-specific APIs ———\nfunction usersAPI(token: string) {\n  const client = createAuthClient(token);\n\n  return {\n    async list(params?: { page?: number; perPage?: number; role?: User[&#39;role&#39;] }) {\n      const response = await client.get&lt;User[]&gt;(&#39;/users&#39;, { params });\n      if (!response.ok) throw new Error(response.error.message);\n      return response.data;\n    },\n\n    async get(id: number) {\n      const response = await client.get&lt;User&gt;(`/users/${id}`);\n      if (!response.ok) {\n        if (response.status === 404) return null;\n        throw new Error(response.error.message);\n      }\n      return response.data;\n    },\n\n    async create(payload: CreateUserPayload) {\n      const response = await client.post&lt;User&gt;(&#39;/users&#39;, payload);\n      if (!response.ok) {\n        if (response.status === 422) {\n          throw new ValidationError(&#39;Validation failed&#39;, response.error.details ?? {});\n        }\n        throw new Error(response.error.message);\n      }\n      return response.data;\n    },\n\n    async update(id: number, payload: Partial&lt;CreateUserPayload&gt;) {\n      const response = await client.patch&lt;User&gt;(`/users/${id}`, payload);\n      if (!response.ok) throw new Error(response.error.message);\n      return response.data;\n    },\n\n    async delete(id: number) {\n      const response = await client.delete(`/users/${id}`);\n      if (!response.ok) throw new Error(response.error.message);\n    },\n  };\n}\n\n// ——— Usage ———\nasync function main() {\n  const users = usersAPI(localStorage.getItem(&#39;token&#39;) ?? &#39;&#39;);\n\n  // TypeScript knows the return type of each method\n  const allUsers = await users.list({ role: &#39;admin&#39; });\n  // allUsers: User[]\n\n  const user = await users.get(42);\n  // user: User | null\n\n  const newUser = await users.create({\n    name: &#39;Alice Chen&#39;,\n    email: &#39;alice@example.com&#39;,\n    role: &#39;editor&#39;\n  });\n  // newUser: User\n\n  await users.update(newUser.id, { role: &#39;admin&#39; });\n\n  console.log(`Created: ${newUser.name} (${newUser.role})`);\n}\n</code></pre>\n<p>This client is used exactly as typed — autocomplete tells you what&#39;s available, TypeScript tells you when you&#39;re passing the wrong thing, and the discriminated union return type forces you to handle both success and error cases.</p>\n<hr>\n"
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t67",
            "title": "Convert JS project to TypeScript",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Convert JS project to TypeScript",
              "desc": "Put your knowledge to the test by implementing \"Convert JS project to TypeScript\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/ts-1"
            }
          },
          {
            "id": "t68",
            "title": "Build typed API client",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Build typed API client",
              "desc": "Put your knowledge to the test by implementing \"Build typed API client\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/ts-2"
            }
          }
        ]
      }
    ]
  },
  "git": {
    "id": "git",
    "title": "Git & Version Control",
    "description": "Learn Git.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t69",
            "title": "Git Basics",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Git Basics is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Git Basics.",
              "sections": [
                {
                  "heading": "Diving into Git Basics",
                  "paragraphs": [
                    "Git Basics forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Git Basics include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Git Basics."
                  ],
                  "code": "// Example of Git Basics\nconsole.log('Practicing Git Basics');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Git Basics",
                  "paragraphs": [
                    "When working with Git Basics at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Git Basics. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t70",
            "title": "Commits",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Commits is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Commits.",
              "sections": [
                {
                  "heading": "Diving into Commits",
                  "paragraphs": [
                    "Commits forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Commits include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Commits."
                  ],
                  "code": "// Example of Commits\nconsole.log('Practicing Commits');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Commits",
                  "paragraphs": [
                    "When working with Commits at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Commits. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t71",
            "title": "Branching",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Branching is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Branching.",
              "sections": [
                {
                  "heading": "Diving into Branching",
                  "paragraphs": [
                    "Branching forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Branching include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Branching."
                  ],
                  "code": "// Example of Branching\nconsole.log('Practicing Branching');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Branching",
                  "paragraphs": [
                    "When working with Branching at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Branching. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t72",
            "title": "Merging",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Merging is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Merging.",
              "sections": [
                {
                  "heading": "Diving into Merging",
                  "paragraphs": [
                    "Merging forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Merging include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Merging."
                  ],
                  "code": "// Example of Merging\nconsole.log('Practicing Merging');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Merging",
                  "paragraphs": [
                    "When working with Merging at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Merging. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t73",
            "title": "Rebasing",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Rebasing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Rebasing.",
              "sections": [
                {
                  "heading": "Diving into Rebasing",
                  "paragraphs": [
                    "Rebasing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Rebasing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Rebasing."
                  ],
                  "code": "// Example of Rebasing\nconsole.log('Practicing Rebasing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Rebasing",
                  "paragraphs": [
                    "When working with Rebasing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Rebasing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t74",
            "title": "Conflict Resolution",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding Conflict Resolution is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Conflict Resolution.",
              "sections": [
                {
                  "heading": "Diving into Conflict Resolution",
                  "paragraphs": [
                    "Conflict Resolution forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Conflict Resolution include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Conflict Resolution."
                  ],
                  "code": "// Example of Conflict Resolution\nconsole.log('Practicing Conflict Resolution');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Conflict Resolution",
                  "paragraphs": [
                    "When working with Conflict Resolution at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Conflict Resolution. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t75",
            "title": "Git Workflows",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Git Workflows is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Git Workflows.",
              "sections": [
                {
                  "heading": "Diving into Git Workflows",
                  "paragraphs": [
                    "Git Workflows forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Git Workflows include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Git Workflows."
                  ],
                  "code": "// Example of Git Workflows\nconsole.log('Practicing Git Workflows');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Git Workflows",
                  "paragraphs": [
                    "When working with Git Workflows at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Git Workflows. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t76",
            "title": "GitHub Pull Requests",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding GitHub Pull Requests is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of GitHub Pull Requests.",
              "sections": [
                {
                  "heading": "Diving into GitHub Pull Requests",
                  "paragraphs": [
                    "GitHub Pull Requests forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of GitHub Pull Requests include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to GitHub Pull Requests."
                  ],
                  "code": "// Example of GitHub Pull Requests\nconsole.log('Practicing GitHub Pull Requests');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in GitHub Pull Requests",
                  "paragraphs": [
                    "When working with GitHub Pull Requests at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of GitHub Pull Requests. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t77",
            "title": "Git Hooks",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Git Hooks is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Git Hooks.",
              "sections": [
                {
                  "heading": "Diving into Git Hooks",
                  "paragraphs": [
                    "Git Hooks forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Git Hooks include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Git Hooks."
                  ],
                  "code": "// Example of Git Hooks\nconsole.log('Practicing Git Hooks');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Git Hooks",
                  "paragraphs": [
                    "When working with Git Hooks at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Git Hooks. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t78",
            "title": "Semantic Versioning",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Semantic Versioning is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Semantic Versioning.",
              "sections": [
                {
                  "heading": "Diving into Semantic Versioning",
                  "paragraphs": [
                    "Semantic Versioning forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Semantic Versioning include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Semantic Versioning."
                  ],
                  "code": "// Example of Semantic Versioning\nconsole.log('Practicing Semantic Versioning');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Semantic Versioning",
                  "paragraphs": [
                    "When working with Semantic Versioning at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Semantic Versioning. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t79",
            "title": "Resolve merge conflict challenge",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Resolve merge conflict challenge",
              "desc": "Put your knowledge to the test by implementing \"Resolve merge conflict challenge\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/git-1"
            }
          },
          {
            "id": "t80",
            "title": "Rebase vs merge scenario",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Rebase vs merge scenario",
              "desc": "Put your knowledge to the test by implementing \"Rebase vs merge scenario\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/git-2"
            }
          }
        ]
      }
    ]
  },
  "react": {
    "id": "react",
    "title": "Frontend Framework (React)",
    "description": "Learn React.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t81",
            "title": "React Basics",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding React Basics is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of React Basics.",
              "sections": [
                {
                  "heading": "Diving into React Basics",
                  "paragraphs": [
                    "React Basics forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of React Basics include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to React Basics."
                  ],
                  "code": "// Example of React Basics\nconsole.log('Practicing React Basics');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in React Basics",
                  "paragraphs": [
                    "When working with React Basics at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of React Basics. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t82",
            "title": "Components",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding Components is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Components.",
              "sections": [
                {
                  "heading": "Diving into Components",
                  "paragraphs": [
                    "Components forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Components include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Components."
                  ],
                  "code": "// Example of Components\nconsole.log('Practicing Components');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Components",
                  "paragraphs": [
                    "When working with Components at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Components. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t83",
            "title": "JSX",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding JSX is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of JSX.",
              "sections": [
                {
                  "heading": "Diving into JSX",
                  "paragraphs": [
                    "JSX forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of JSX include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to JSX."
                  ],
                  "code": "// Example of JSX\nconsole.log('Practicing JSX');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in JSX",
                  "paragraphs": [
                    "When working with JSX at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of JSX. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t84",
            "title": "Props",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding Props is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Props.",
              "sections": [
                {
                  "heading": "Diving into Props",
                  "paragraphs": [
                    "Props forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Props include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Props."
                  ],
                  "code": "// Example of Props\nconsole.log('Practicing Props');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Props",
                  "paragraphs": [
                    "When working with Props at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Props. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t85",
            "title": "State",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding State is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of State.",
              "sections": [
                {
                  "heading": "Diving into State",
                  "paragraphs": [
                    "State forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of State include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to State."
                  ],
                  "code": "// Example of State\nconsole.log('Practicing State');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in State",
                  "paragraphs": [
                    "When working with State at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of State. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t86",
            "title": "Events",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding Events is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Events.",
              "sections": [
                {
                  "heading": "Diving into Events",
                  "paragraphs": [
                    "Events forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Events include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Events."
                  ],
                  "code": "// Example of Events\nconsole.log('Practicing Events');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Events",
                  "paragraphs": [
                    "When working with Events at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Events. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t87",
            "title": "Hooks",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Hooks is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Hooks.",
              "sections": [
                {
                  "heading": "Diving into Hooks",
                  "paragraphs": [
                    "Hooks forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Hooks include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Hooks."
                  ],
                  "code": "// Example of Hooks\nconsole.log('Practicing Hooks');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Hooks",
                  "paragraphs": [
                    "When working with Hooks at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Hooks. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t88",
            "title": "useState",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding useState is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of useState.",
              "sections": [
                {
                  "heading": "Diving into useState",
                  "paragraphs": [
                    "useState forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of useState include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to useState."
                  ],
                  "code": "// Example of useState\nconsole.log('Practicing useState');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in useState",
                  "paragraphs": [
                    "When working with useState at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of useState. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t89",
            "title": "useEffect",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding useEffect is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of useEffect.",
              "sections": [
                {
                  "heading": "Diving into useEffect",
                  "paragraphs": [
                    "useEffect forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of useEffect include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to useEffect."
                  ],
                  "code": "// Example of useEffect\nconsole.log('Practicing useEffect');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in useEffect",
                  "paragraphs": [
                    "When working with useEffect at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of useEffect. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t90",
            "title": "useRef",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding useRef is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of useRef.",
              "sections": [
                {
                  "heading": "Diving into useRef",
                  "paragraphs": [
                    "useRef forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of useRef include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to useRef."
                  ],
                  "code": "// Example of useRef\nconsole.log('Practicing useRef');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in useRef",
                  "paragraphs": [
                    "When working with useRef at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of useRef. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t91",
            "title": "useMemo",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding useMemo is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of useMemo.",
              "sections": [
                {
                  "heading": "Diving into useMemo",
                  "paragraphs": [
                    "useMemo forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of useMemo include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to useMemo."
                  ],
                  "code": "// Example of useMemo\nconsole.log('Practicing useMemo');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in useMemo",
                  "paragraphs": [
                    "When working with useMemo at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of useMemo. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t92",
            "title": "useCallback",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding useCallback is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of useCallback.",
              "sections": [
                {
                  "heading": "Diving into useCallback",
                  "paragraphs": [
                    "useCallback forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of useCallback include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to useCallback."
                  ],
                  "code": "// Example of useCallback\nconsole.log('Practicing useCallback');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in useCallback",
                  "paragraphs": [
                    "When working with useCallback at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of useCallback. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t93",
            "title": "Advanced React",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Advanced React is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Advanced React.",
              "sections": [
                {
                  "heading": "Diving into Advanced React",
                  "paragraphs": [
                    "Advanced React forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Advanced React include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Advanced React."
                  ],
                  "code": "// Example of Advanced React\nconsole.log('Practicing Advanced React');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Advanced React",
                  "paragraphs": [
                    "When working with Advanced React at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Advanced React. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t94",
            "title": "Context API",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Context API is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Context API.",
              "sections": [
                {
                  "heading": "Diving into Context API",
                  "paragraphs": [
                    "Context API forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Context API include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Context API."
                  ],
                  "code": "// Example of Context API\nconsole.log('Practicing Context API');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Context API",
                  "paragraphs": [
                    "When working with Context API at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Context API. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t95",
            "title": "Custom Hooks",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding Custom Hooks is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Custom Hooks.",
              "sections": [
                {
                  "heading": "Diving into Custom Hooks",
                  "paragraphs": [
                    "Custom Hooks forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Custom Hooks include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Custom Hooks."
                  ],
                  "code": "// Example of Custom Hooks\nconsole.log('Practicing Custom Hooks');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Custom Hooks",
                  "paragraphs": [
                    "When working with Custom Hooks at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Custom Hooks. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t96",
            "title": "Performance optimization",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Performance optimization is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Performance optimization.",
              "sections": [
                {
                  "heading": "Diving into Performance optimization",
                  "paragraphs": [
                    "Performance optimization forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Performance optimization include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Performance optimization."
                  ],
                  "code": "// Example of Performance optimization\nconsole.log('Practicing Performance optimization');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Performance optimization",
                  "paragraphs": [
                    "When working with Performance optimization at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Performance optimization. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t97",
            "title": "Suspense",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Suspense is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Suspense.",
              "sections": [
                {
                  "heading": "Diving into Suspense",
                  "paragraphs": [
                    "Suspense forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Suspense include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Suspense."
                  ],
                  "code": "// Example of Suspense\nconsole.log('Practicing Suspense');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Suspense",
                  "paragraphs": [
                    "When working with Suspense at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Suspense. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t98",
            "title": "Error Boundaries",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Error Boundaries is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Error Boundaries.",
              "sections": [
                {
                  "heading": "Diving into Error Boundaries",
                  "paragraphs": [
                    "Error Boundaries forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Error Boundaries include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Error Boundaries."
                  ],
                  "code": "// Example of Error Boundaries\nconsole.log('Practicing Error Boundaries');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Error Boundaries",
                  "paragraphs": [
                    "When working with Error Boundaries at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Error Boundaries. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t99",
            "title": "Architecture",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding Architecture is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Architecture.",
              "sections": [
                {
                  "heading": "Diving into Architecture",
                  "paragraphs": [
                    "Architecture forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Architecture include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Architecture."
                  ],
                  "code": "// Example of Architecture\nconsole.log('Practicing Architecture');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Architecture",
                  "paragraphs": [
                    "When working with Architecture at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Architecture. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t100",
            "title": "Component design patterns",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Component design patterns is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Component design patterns.",
              "sections": [
                {
                  "heading": "Diving into Component design patterns",
                  "paragraphs": [
                    "Component design patterns forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Component design patterns include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Component design patterns."
                  ],
                  "code": "// Example of Component design patterns\nconsole.log('Practicing Component design patterns');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Component design patterns",
                  "paragraphs": [
                    "When working with Component design patterns at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Component design patterns. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t101",
            "title": "State management",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding State management is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of State management.",
              "sections": [
                {
                  "heading": "Diving into State management",
                  "paragraphs": [
                    "State management forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of State management include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to State management."
                  ],
                  "code": "// Example of State management\nconsole.log('Practicing State management');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in State management",
                  "paragraphs": [
                    "When working with State management at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of State management. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t102",
            "title": "Feature folder structure",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding Feature folder structure is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Feature folder structure.",
              "sections": [
                {
                  "heading": "Diving into Feature folder structure",
                  "paragraphs": [
                    "Feature folder structure forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Feature folder structure include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Feature folder structure."
                  ],
                  "code": "// Example of Feature folder structure\nconsole.log('Practicing Feature folder structure');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Feature folder structure",
                  "paragraphs": [
                    "When working with Feature folder structure at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Feature folder structure. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t103",
            "title": "Ecosystem",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Ecosystem is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Ecosystem.",
              "sections": [
                {
                  "heading": "Diving into Ecosystem",
                  "paragraphs": [
                    "Ecosystem forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Ecosystem include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Ecosystem."
                  ],
                  "code": "// Example of Ecosystem\nconsole.log('Practicing Ecosystem');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Ecosystem",
                  "paragraphs": [
                    "When working with Ecosystem at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Ecosystem. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t104",
            "title": "Routing",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding Routing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Routing.",
              "sections": [
                {
                  "heading": "Diving into Routing",
                  "paragraphs": [
                    "Routing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Routing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Routing."
                  ],
                  "code": "// Example of Routing\nconsole.log('Practicing Routing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Routing",
                  "paragraphs": [
                    "When working with Routing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Routing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t105",
            "title": "Forms",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Forms is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Forms.",
              "sections": [
                {
                  "heading": "Diving into Forms",
                  "paragraphs": [
                    "Forms forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Forms include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Forms."
                  ],
                  "code": "// Example of Forms\nconsole.log('Practicing Forms');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Forms",
                  "paragraphs": [
                    "When working with Forms at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Forms. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t106",
            "title": "Data fetching",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding Data fetching is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Data fetching.",
              "sections": [
                {
                  "heading": "Diving into Data fetching",
                  "paragraphs": [
                    "Data fetching forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Data fetching include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Data fetching."
                  ],
                  "code": "// Example of Data fetching\nconsole.log('Practicing Data fetching');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Data fetching",
                  "paragraphs": [
                    "When working with Data fetching at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Data fetching. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t107",
            "title": "Build Todo App",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Build Todo App",
              "desc": "Put your knowledge to the test by implementing \"Build Todo App\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/react-1"
            }
          },
          {
            "id": "t108",
            "title": "Infinite scroll",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Infinite scroll",
              "desc": "Put your knowledge to the test by implementing \"Infinite scroll\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/react-2"
            }
          },
          {
            "id": "t109",
            "title": "Virtualized list",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Virtualized list",
              "desc": "Put your knowledge to the test by implementing \"Virtualized list\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/react-3"
            }
          },
          {
            "id": "t110",
            "title": "Drag & drop",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Drag & drop",
              "desc": "Put your knowledge to the test by implementing \"Drag & drop\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/react-4"
            }
          }
        ]
      }
    ]
  },
  "node": {
    "id": "node",
    "title": "Backend Development",
    "description": "Learn Node.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t111",
            "title": "Node Basics",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding Node Basics is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Node Basics.",
              "sections": [
                {
                  "heading": "Diving into Node Basics",
                  "paragraphs": [
                    "Node Basics forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Node Basics include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Node Basics."
                  ],
                  "code": "// Example of Node Basics\nconsole.log('Practicing Node Basics');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Node Basics",
                  "paragraphs": [
                    "When working with Node Basics at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Node Basics. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t112",
            "title": "Node architecture",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Node architecture is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Node architecture.",
              "sections": [
                {
                  "heading": "Diving into Node architecture",
                  "paragraphs": [
                    "Node architecture forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Node architecture include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Node architecture."
                  ],
                  "code": "// Example of Node architecture\nconsole.log('Practicing Node architecture');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Node architecture",
                  "paragraphs": [
                    "When working with Node architecture at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Node architecture. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t113",
            "title": "Event-driven programming",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Event-driven programming is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Event-driven programming.",
              "sections": [
                {
                  "heading": "Diving into Event-driven programming",
                  "paragraphs": [
                    "Event-driven programming forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Event-driven programming include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Event-driven programming."
                  ],
                  "code": "// Example of Event-driven programming\nconsole.log('Practicing Event-driven programming');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Event-driven programming",
                  "paragraphs": [
                    "When working with Event-driven programming at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Event-driven programming. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t114",
            "title": "NPM ecosystem",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding NPM ecosystem is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of NPM ecosystem.",
              "sections": [
                {
                  "heading": "Diving into NPM ecosystem",
                  "paragraphs": [
                    "NPM ecosystem forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of NPM ecosystem include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to NPM ecosystem."
                  ],
                  "code": "// Example of NPM ecosystem\nconsole.log('Practicing NPM ecosystem');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in NPM ecosystem",
                  "paragraphs": [
                    "When working with NPM ecosystem at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of NPM ecosystem. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t115",
            "title": "API Development",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding API Development is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of API Development.",
              "sections": [
                {
                  "heading": "Diving into API Development",
                  "paragraphs": [
                    "API Development forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of API Development include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to API Development."
                  ],
                  "code": "// Example of API Development\nconsole.log('Practicing API Development');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in API Development",
                  "paragraphs": [
                    "When working with API Development at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of API Development. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t116",
            "title": "REST API design",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding REST API design is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of REST API design.",
              "sections": [
                {
                  "heading": "Diving into REST API design",
                  "paragraphs": [
                    "REST API design forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of REST API design include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to REST API design."
                  ],
                  "code": "// Example of REST API design\nconsole.log('Practicing REST API design');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in REST API design",
                  "paragraphs": [
                    "When working with REST API design at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of REST API design. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t117",
            "title": "Middleware",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Middleware is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Middleware.",
              "sections": [
                {
                  "heading": "Diving into Middleware",
                  "paragraphs": [
                    "Middleware forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Middleware include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Middleware."
                  ],
                  "code": "// Example of Middleware\nconsole.log('Practicing Middleware');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Middleware",
                  "paragraphs": [
                    "When working with Middleware at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Middleware. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t118",
            "title": "Controllers",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Controllers is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Controllers.",
              "sections": [
                {
                  "heading": "Diving into Controllers",
                  "paragraphs": [
                    "Controllers forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Controllers include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Controllers."
                  ],
                  "code": "// Example of Controllers\nconsole.log('Practicing Controllers');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Controllers",
                  "paragraphs": [
                    "When working with Controllers at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Controllers. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t119",
            "title": "Error handling",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Error handling is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Error handling.",
              "sections": [
                {
                  "heading": "Diving into Error handling",
                  "paragraphs": [
                    "Error handling forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Error handling include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Error handling."
                  ],
                  "code": "// Example of Error handling\nconsole.log('Practicing Error handling');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Error handling",
                  "paragraphs": [
                    "When working with Error handling at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Error handling. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t120",
            "title": "Authentication",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding Authentication is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Authentication.",
              "sections": [
                {
                  "heading": "Diving into Authentication",
                  "paragraphs": [
                    "Authentication forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Authentication include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Authentication."
                  ],
                  "code": "// Example of Authentication\nconsole.log('Practicing Authentication');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Authentication",
                  "paragraphs": [
                    "When working with Authentication at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Authentication. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t121",
            "title": "Sessions",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding Sessions is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Sessions.",
              "sections": [
                {
                  "heading": "Diving into Sessions",
                  "paragraphs": [
                    "Sessions forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Sessions include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Sessions."
                  ],
                  "code": "// Example of Sessions\nconsole.log('Practicing Sessions');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Sessions",
                  "paragraphs": [
                    "When working with Sessions at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Sessions. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t122",
            "title": "JWT",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding JWT is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of JWT.",
              "sections": [
                {
                  "heading": "Diving into JWT",
                  "paragraphs": [
                    "JWT forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of JWT include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to JWT."
                  ],
                  "code": "// Example of JWT\nconsole.log('Practicing JWT');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in JWT",
                  "paragraphs": [
                    "When working with JWT at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of JWT. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t123",
            "title": "OAuth",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding OAuth is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of OAuth.",
              "sections": [
                {
                  "heading": "Diving into OAuth",
                  "paragraphs": [
                    "OAuth forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of OAuth include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to OAuth."
                  ],
                  "code": "// Example of OAuth\nconsole.log('Practicing OAuth');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in OAuth",
                  "paragraphs": [
                    "When working with OAuth at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of OAuth. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t124",
            "title": "Role-based access",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Role-based access is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Role-based access.",
              "sections": [
                {
                  "heading": "Diving into Role-based access",
                  "paragraphs": [
                    "Role-based access forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Role-based access include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Role-based access."
                  ],
                  "code": "// Example of Role-based access\nconsole.log('Practicing Role-based access');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Role-based access",
                  "paragraphs": [
                    "When working with Role-based access at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Role-based access. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t125",
            "title": "Security",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding Security is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Security.",
              "sections": [
                {
                  "heading": "Diving into Security",
                  "paragraphs": [
                    "Security forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Security include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Security."
                  ],
                  "code": "// Example of Security\nconsole.log('Practicing Security');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Security",
                  "paragraphs": [
                    "When working with Security at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Security. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t126",
            "title": "Rate limiting",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding Rate limiting is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Rate limiting.",
              "sections": [
                {
                  "heading": "Diving into Rate limiting",
                  "paragraphs": [
                    "Rate limiting forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Rate limiting include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Rate limiting."
                  ],
                  "code": "// Example of Rate limiting\nconsole.log('Practicing Rate limiting');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Rate limiting",
                  "paragraphs": [
                    "When working with Rate limiting at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Rate limiting. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t127",
            "title": "Input validation",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Input validation is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Input validation.",
              "sections": [
                {
                  "heading": "Diving into Input validation",
                  "paragraphs": [
                    "Input validation forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Input validation include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Input validation."
                  ],
                  "code": "// Example of Input validation\nconsole.log('Practicing Input validation');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Input validation",
                  "paragraphs": [
                    "When working with Input validation at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Input validation. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t128",
            "title": "XSS",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding XSS is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of XSS.",
              "sections": [
                {
                  "heading": "Diving into XSS",
                  "paragraphs": [
                    "XSS forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of XSS include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to XSS."
                  ],
                  "code": "// Example of XSS\nconsole.log('Practicing XSS');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in XSS",
                  "paragraphs": [
                    "When working with XSS at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of XSS. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t129",
            "title": "CSRF",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding CSRF is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of CSRF.",
              "sections": [
                {
                  "heading": "Diving into CSRF",
                  "paragraphs": [
                    "CSRF forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of CSRF include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to CSRF."
                  ],
                  "code": "// Example of CSRF\nconsole.log('Practicing CSRF');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in CSRF",
                  "paragraphs": [
                    "When working with CSRF at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of CSRF. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t130",
            "title": "SQL injection",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding SQL injection is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of SQL injection.",
              "sections": [
                {
                  "heading": "Diving into SQL injection",
                  "paragraphs": [
                    "SQL injection forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of SQL injection include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to SQL injection."
                  ],
                  "code": "// Example of SQL injection\nconsole.log('Practicing SQL injection');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in SQL injection",
                  "paragraphs": [
                    "When working with SQL injection at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of SQL injection. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t131",
            "title": "Build login system",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Build login system",
              "desc": "Put your knowledge to the test by implementing \"Build login system\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/node-1"
            }
          },
          {
            "id": "t132",
            "title": "API pagination",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "API pagination",
              "desc": "Put your knowledge to the test by implementing \"API pagination\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/node-2"
            }
          },
          {
            "id": "t133",
            "title": "Rate limiter implementation",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Rate limiter implementation",
              "desc": "Put your knowledge to the test by implementing \"Rate limiter implementation\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/node-3"
            }
          }
        ]
      }
    ]
  },
  "db": {
    "id": "db",
    "title": "Databases",
    "description": "Learn Databases.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t134",
            "title": "SQL",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding SQL is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of SQL.",
              "sections": [
                {
                  "heading": "Diving into SQL",
                  "paragraphs": [
                    "SQL forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of SQL include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to SQL."
                  ],
                  "code": "// Example of SQL\nconsole.log('Practicing SQL');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in SQL",
                  "paragraphs": [
                    "When working with SQL at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of SQL. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t135",
            "title": "Relational concepts",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Relational concepts is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Relational concepts.",
              "sections": [
                {
                  "heading": "Diving into Relational concepts",
                  "paragraphs": [
                    "Relational concepts forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Relational concepts include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Relational concepts."
                  ],
                  "code": "// Example of Relational concepts\nconsole.log('Practicing Relational concepts');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Relational concepts",
                  "paragraphs": [
                    "When working with Relational concepts at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Relational concepts. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t136",
            "title": "SELECT queries",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding SELECT queries is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of SELECT queries.",
              "sections": [
                {
                  "heading": "Diving into SELECT queries",
                  "paragraphs": [
                    "SELECT queries forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of SELECT queries include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to SELECT queries."
                  ],
                  "code": "// Example of SELECT queries\nconsole.log('Practicing SELECT queries');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in SELECT queries",
                  "paragraphs": [
                    "When working with SELECT queries at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of SELECT queries. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t137",
            "title": "Joins",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding Joins is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Joins.",
              "sections": [
                {
                  "heading": "Diving into Joins",
                  "paragraphs": [
                    "Joins forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Joins include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Joins."
                  ],
                  "code": "// Example of Joins\nconsole.log('Practicing Joins');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Joins",
                  "paragraphs": [
                    "When working with Joins at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Joins. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t138",
            "title": "Aggregations",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Aggregations is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Aggregations.",
              "sections": [
                {
                  "heading": "Diving into Aggregations",
                  "paragraphs": [
                    "Aggregations forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Aggregations include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Aggregations."
                  ],
                  "code": "// Example of Aggregations\nconsole.log('Practicing Aggregations');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Aggregations",
                  "paragraphs": [
                    "When working with Aggregations at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Aggregations. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t139",
            "title": "Indexing",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Indexing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Indexing.",
              "sections": [
                {
                  "heading": "Diving into Indexing",
                  "paragraphs": [
                    "Indexing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Indexing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Indexing."
                  ],
                  "code": "// Example of Indexing\nconsole.log('Practicing Indexing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Indexing",
                  "paragraphs": [
                    "When working with Indexing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Indexing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t140",
            "title": "Transactions",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding Transactions is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Transactions.",
              "sections": [
                {
                  "heading": "Diving into Transactions",
                  "paragraphs": [
                    "Transactions forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Transactions include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Transactions."
                  ],
                  "code": "// Example of Transactions\nconsole.log('Practicing Transactions');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Transactions",
                  "paragraphs": [
                    "When working with Transactions at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Transactions. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t141",
            "title": "Query optimization",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Query optimization is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Query optimization.",
              "sections": [
                {
                  "heading": "Diving into Query optimization",
                  "paragraphs": [
                    "Query optimization forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Query optimization include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Query optimization."
                  ],
                  "code": "// Example of Query optimization\nconsole.log('Practicing Query optimization');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Query optimization",
                  "paragraphs": [
                    "When working with Query optimization at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Query optimization. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t142",
            "title": "NoSQL",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding NoSQL is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of NoSQL.",
              "sections": [
                {
                  "heading": "Diving into NoSQL",
                  "paragraphs": [
                    "NoSQL forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of NoSQL include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to NoSQL."
                  ],
                  "code": "// Example of NoSQL\nconsole.log('Practicing NoSQL');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in NoSQL",
                  "paragraphs": [
                    "When working with NoSQL at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of NoSQL. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t143",
            "title": "Document databases",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding Document databases is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Document databases.",
              "sections": [
                {
                  "heading": "Diving into Document databases",
                  "paragraphs": [
                    "Document databases forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Document databases include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Document databases."
                  ],
                  "code": "// Example of Document databases\nconsole.log('Practicing Document databases');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Document databases",
                  "paragraphs": [
                    "When working with Document databases at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Document databases. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t144",
            "title": "Schema design",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Schema design is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Schema design.",
              "sections": [
                {
                  "heading": "Diving into Schema design",
                  "paragraphs": [
                    "Schema design forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Schema design include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Schema design."
                  ],
                  "code": "// Example of Schema design\nconsole.log('Practicing Schema design');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Schema design",
                  "paragraphs": [
                    "When working with Schema design at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Schema design. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t145",
            "title": "Indexing",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding Indexing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Indexing.",
              "sections": [
                {
                  "heading": "Diving into Indexing",
                  "paragraphs": [
                    "Indexing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Indexing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Indexing."
                  ],
                  "code": "// Example of Indexing\nconsole.log('Practicing Indexing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Indexing",
                  "paragraphs": [
                    "When working with Indexing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Indexing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t146",
            "title": "Aggregation pipelines",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Aggregation pipelines is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Aggregation pipelines.",
              "sections": [
                {
                  "heading": "Diving into Aggregation pipelines",
                  "paragraphs": [
                    "Aggregation pipelines forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Aggregation pipelines include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Aggregation pipelines."
                  ],
                  "code": "// Example of Aggregation pipelines\nconsole.log('Practicing Aggregation pipelines');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Aggregation pipelines",
                  "paragraphs": [
                    "When working with Aggregation pipelines at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Aggregation pipelines. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t147",
            "title": "Database Design",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding Database Design is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Database Design.",
              "sections": [
                {
                  "heading": "Diving into Database Design",
                  "paragraphs": [
                    "Database Design forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Database Design include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Database Design."
                  ],
                  "code": "// Example of Database Design\nconsole.log('Practicing Database Design');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Database Design",
                  "paragraphs": [
                    "When working with Database Design at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Database Design. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t148",
            "title": "Normalization",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Normalization is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Normalization.",
              "sections": [
                {
                  "heading": "Diving into Normalization",
                  "paragraphs": [
                    "Normalization forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Normalization include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Normalization."
                  ],
                  "code": "// Example of Normalization\nconsole.log('Practicing Normalization');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Normalization",
                  "paragraphs": [
                    "When working with Normalization at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Normalization. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t149",
            "title": "Data modeling",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Data modeling is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Data modeling.",
              "sections": [
                {
                  "heading": "Diving into Data modeling",
                  "paragraphs": [
                    "Data modeling forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Data modeling include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Data modeling."
                  ],
                  "code": "// Example of Data modeling\nconsole.log('Practicing Data modeling');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Data modeling",
                  "paragraphs": [
                    "When working with Data modeling at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Data modeling. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t150",
            "title": "Scaling databases",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Scaling databases is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Scaling databases.",
              "sections": [
                {
                  "heading": "Diving into Scaling databases",
                  "paragraphs": [
                    "Scaling databases forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Scaling databases include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Scaling databases."
                  ],
                  "code": "// Example of Scaling databases\nconsole.log('Practicing Scaling databases');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Scaling databases",
                  "paragraphs": [
                    "When working with Scaling databases at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Scaling databases. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t151",
            "title": "Replication",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Replication is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Replication.",
              "sections": [
                {
                  "heading": "Diving into Replication",
                  "paragraphs": [
                    "Replication forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Replication include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Replication."
                  ],
                  "code": "// Example of Replication\nconsole.log('Practicing Replication');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Replication",
                  "paragraphs": [
                    "When working with Replication at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Replication. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t152",
            "title": "Design schema for social network",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Design schema for social network",
              "desc": "Put your knowledge to the test by implementing \"Design schema for social network\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/db-1"
            }
          },
          {
            "id": "t153",
            "title": "Optimize slow query",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Optimize slow query",
              "desc": "Put your knowledge to the test by implementing \"Optimize slow query\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/db-2"
            }
          }
        ]
      }
    ]
  },
  "api": {
    "id": "api",
    "title": "API Design",
    "description": "Learn APIs.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t154",
            "title": "RESTful design",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding RESTful design is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of RESTful design.",
              "sections": [
                {
                  "heading": "Diving into RESTful design",
                  "paragraphs": [
                    "RESTful design forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of RESTful design include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to RESTful design."
                  ],
                  "code": "// Example of RESTful design\nconsole.log('Practicing RESTful design');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in RESTful design",
                  "paragraphs": [
                    "When working with RESTful design at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of RESTful design. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t155",
            "title": "GraphQL",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding GraphQL is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of GraphQL.",
              "sections": [
                {
                  "heading": "Diving into GraphQL",
                  "paragraphs": [
                    "GraphQL forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of GraphQL include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to GraphQL."
                  ],
                  "code": "// Example of GraphQL\nconsole.log('Practicing GraphQL');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in GraphQL",
                  "paragraphs": [
                    "When working with GraphQL at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of GraphQL. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t156",
            "title": "API versioning",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding API versioning is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of API versioning.",
              "sections": [
                {
                  "heading": "Diving into API versioning",
                  "paragraphs": [
                    "API versioning forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of API versioning include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to API versioning."
                  ],
                  "code": "// Example of API versioning\nconsole.log('Practicing API versioning');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in API versioning",
                  "paragraphs": [
                    "When working with API versioning at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of API versioning. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t157",
            "title": "Pagination",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Pagination is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Pagination.",
              "sections": [
                {
                  "heading": "Diving into Pagination",
                  "paragraphs": [
                    "Pagination forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Pagination include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Pagination."
                  ],
                  "code": "// Example of Pagination\nconsole.log('Practicing Pagination');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Pagination",
                  "paragraphs": [
                    "When working with Pagination at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Pagination. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t158",
            "title": "Rate limiting",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding Rate limiting is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Rate limiting.",
              "sections": [
                {
                  "heading": "Diving into Rate limiting",
                  "paragraphs": [
                    "Rate limiting forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Rate limiting include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Rate limiting."
                  ],
                  "code": "// Example of Rate limiting\nconsole.log('Practicing Rate limiting');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Rate limiting",
                  "paragraphs": [
                    "When working with Rate limiting at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Rate limiting. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t159",
            "title": "Idempotency",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Idempotency is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Idempotency.",
              "sections": [
                {
                  "heading": "Diving into Idempotency",
                  "paragraphs": [
                    "Idempotency forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Idempotency include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Idempotency."
                  ],
                  "code": "// Example of Idempotency\nconsole.log('Practicing Idempotency');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Idempotency",
                  "paragraphs": [
                    "When working with Idempotency at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Idempotency. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t160",
            "title": "Webhooks",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Webhooks is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Webhooks.",
              "sections": [
                {
                  "heading": "Diving into Webhooks",
                  "paragraphs": [
                    "Webhooks forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Webhooks include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Webhooks."
                  ],
                  "code": "// Example of Webhooks\nconsole.log('Practicing Webhooks');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Webhooks",
                  "paragraphs": [
                    "When working with Webhooks at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Webhooks. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t161",
            "title": "API documentation",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding API documentation is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of API documentation.",
              "sections": [
                {
                  "heading": "Diving into API documentation",
                  "paragraphs": [
                    "API documentation forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of API documentation include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to API documentation."
                  ],
                  "code": "// Example of API documentation\nconsole.log('Practicing API documentation');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in API documentation",
                  "paragraphs": [
                    "When working with API documentation at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of API documentation. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t162",
            "title": "Design URL shortener API",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Design URL shortener API",
              "desc": "Put your knowledge to the test by implementing \"Design URL shortener API\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/api-1"
            }
          },
          {
            "id": "t163",
            "title": "Design comment system API",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Design comment system API",
              "desc": "Put your knowledge to the test by implementing \"Design comment system API\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/api-2"
            }
          }
        ]
      }
    ]
  },
  "auth": {
    "id": "auth",
    "title": "Authentication & Authorization",
    "description": "Learn Auth.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t164",
            "title": "Sessions",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding Sessions is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Sessions.",
              "sections": [
                {
                  "heading": "Diving into Sessions",
                  "paragraphs": [
                    "Sessions forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Sessions include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Sessions."
                  ],
                  "code": "// Example of Sessions\nconsole.log('Practicing Sessions');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Sessions",
                  "paragraphs": [
                    "When working with Sessions at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Sessions. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t165",
            "title": "JWT",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding JWT is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of JWT.",
              "sections": [
                {
                  "heading": "Diving into JWT",
                  "paragraphs": [
                    "JWT forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of JWT include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to JWT."
                  ],
                  "code": "// Example of JWT\nconsole.log('Practicing JWT');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in JWT",
                  "paragraphs": [
                    "When working with JWT at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of JWT. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t166",
            "title": "OAuth2",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding OAuth2 is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of OAuth2.",
              "sections": [
                {
                  "heading": "Diving into OAuth2",
                  "paragraphs": [
                    "OAuth2 forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of OAuth2 include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to OAuth2."
                  ],
                  "code": "// Example of OAuth2\nconsole.log('Practicing OAuth2');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in OAuth2",
                  "paragraphs": [
                    "When working with OAuth2 at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of OAuth2. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t167",
            "title": "SSO",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding SSO is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of SSO.",
              "sections": [
                {
                  "heading": "Diving into SSO",
                  "paragraphs": [
                    "SSO forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of SSO include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to SSO."
                  ],
                  "code": "// Example of SSO\nconsole.log('Practicing SSO');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in SSO",
                  "paragraphs": [
                    "When working with SSO at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of SSO. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t168",
            "title": "RBAC",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding RBAC is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of RBAC.",
              "sections": [
                {
                  "heading": "Diving into RBAC",
                  "paragraphs": [
                    "RBAC forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of RBAC include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to RBAC."
                  ],
                  "code": "// Example of RBAC\nconsole.log('Practicing RBAC');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in RBAC",
                  "paragraphs": [
                    "When working with RBAC at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of RBAC. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t169",
            "title": "Token refresh strategies",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding Token refresh strategies is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Token refresh strategies.",
              "sections": [
                {
                  "heading": "Diving into Token refresh strategies",
                  "paragraphs": [
                    "Token refresh strategies forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Token refresh strategies include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Token refresh strategies."
                  ],
                  "code": "// Example of Token refresh strategies\nconsole.log('Practicing Token refresh strategies');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Token refresh strategies",
                  "paragraphs": [
                    "When working with Token refresh strategies at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Token refresh strategies. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t170",
            "title": "Password hashing",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Password hashing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Password hashing.",
              "sections": [
                {
                  "heading": "Diving into Password hashing",
                  "paragraphs": [
                    "Password hashing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Password hashing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Password hashing."
                  ],
                  "code": "// Example of Password hashing\nconsole.log('Practicing Password hashing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Password hashing",
                  "paragraphs": [
                    "When working with Password hashing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Password hashing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t171",
            "title": "MFA",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding MFA is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of MFA.",
              "sections": [
                {
                  "heading": "Diving into MFA",
                  "paragraphs": [
                    "MFA forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of MFA include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to MFA."
                  ],
                  "code": "// Example of MFA\nconsole.log('Practicing MFA');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in MFA",
                  "paragraphs": [
                    "When working with MFA at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of MFA. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t172",
            "title": "Implement JWT auth",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Implement JWT auth",
              "desc": "Put your knowledge to the test by implementing \"Implement JWT auth\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/auth-1"
            }
          },
          {
            "id": "t173",
            "title": "Role based dashboard",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Role based dashboard",
              "desc": "Put your knowledge to the test by implementing \"Role based dashboard\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/auth-2"
            }
          }
        ]
      }
    ]
  },
  "system-design": {
    "id": "system-design",
    "title": "System Design for Web Apps",
    "description": "Learn System Design.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t174",
            "title": "Load balancing",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Load balancing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Load balancing.",
              "sections": [
                {
                  "heading": "Diving into Load balancing",
                  "paragraphs": [
                    "Load balancing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Load balancing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Load balancing."
                  ],
                  "code": "// Example of Load balancing\nconsole.log('Practicing Load balancing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Load balancing",
                  "paragraphs": [
                    "When working with Load balancing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Load balancing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t175",
            "title": "Caching",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Caching is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Caching.",
              "sections": [
                {
                  "heading": "Diving into Caching",
                  "paragraphs": [
                    "Caching forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Caching include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Caching."
                  ],
                  "code": "// Example of Caching\nconsole.log('Practicing Caching');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Caching",
                  "paragraphs": [
                    "When working with Caching at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Caching. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t176",
            "title": "CDN",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding CDN is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of CDN.",
              "sections": [
                {
                  "heading": "Diving into CDN",
                  "paragraphs": [
                    "CDN forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of CDN include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to CDN."
                  ],
                  "code": "// Example of CDN\nconsole.log('Practicing CDN');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in CDN",
                  "paragraphs": [
                    "When working with CDN at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of CDN. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t177",
            "title": "Horizontal scaling",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Horizontal scaling is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Horizontal scaling.",
              "sections": [
                {
                  "heading": "Diving into Horizontal scaling",
                  "paragraphs": [
                    "Horizontal scaling forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Horizontal scaling include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Horizontal scaling."
                  ],
                  "code": "// Example of Horizontal scaling\nconsole.log('Practicing Horizontal scaling');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Horizontal scaling",
                  "paragraphs": [
                    "When working with Horizontal scaling at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Horizontal scaling. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t178",
            "title": "Microservices vs monolith",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Microservices vs monolith is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Microservices vs monolith.",
              "sections": [
                {
                  "heading": "Diving into Microservices vs monolith",
                  "paragraphs": [
                    "Microservices vs monolith forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Microservices vs monolith include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Microservices vs monolith."
                  ],
                  "code": "// Example of Microservices vs monolith\nconsole.log('Practicing Microservices vs monolith');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Microservices vs monolith",
                  "paragraphs": [
                    "When working with Microservices vs monolith at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Microservices vs monolith. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t179",
            "title": "Message queues",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Message queues is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Message queues.",
              "sections": [
                {
                  "heading": "Diving into Message queues",
                  "paragraphs": [
                    "Message queues forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Message queues include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Message queues."
                  ],
                  "code": "// Example of Message queues\nconsole.log('Practicing Message queues');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Message queues",
                  "paragraphs": [
                    "When working with Message queues at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Message queues. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t180",
            "title": "Event-driven architecture",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding Event-driven architecture is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Event-driven architecture.",
              "sections": [
                {
                  "heading": "Diving into Event-driven architecture",
                  "paragraphs": [
                    "Event-driven architecture forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Event-driven architecture include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Event-driven architecture."
                  ],
                  "code": "// Example of Event-driven architecture\nconsole.log('Practicing Event-driven architecture');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Event-driven architecture",
                  "paragraphs": [
                    "When working with Event-driven architecture at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Event-driven architecture. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t181",
            "title": "Design Twitter",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Design Twitter",
              "desc": "Put your knowledge to the test by implementing \"Design Twitter\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/system-design-1"
            }
          },
          {
            "id": "t182",
            "title": "Design YouTube comments",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Design YouTube comments",
              "desc": "Put your knowledge to the test by implementing \"Design YouTube comments\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/system-design-2"
            }
          },
          {
            "id": "t183",
            "title": "Design chat app",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Design chat app",
              "desc": "Put your knowledge to the test by implementing \"Design chat app\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/system-design-3"
            }
          }
        ]
      }
    ]
  },
  "perf": {
    "id": "perf",
    "title": "Performance Optimization",
    "description": "Learn Performance.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t184",
            "title": "Frontend",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Frontend is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Frontend.",
              "sections": [
                {
                  "heading": "Diving into Frontend",
                  "paragraphs": [
                    "Frontend forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Frontend include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Frontend."
                  ],
                  "code": "// Example of Frontend\nconsole.log('Practicing Frontend');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Frontend",
                  "paragraphs": [
                    "When working with Frontend at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Frontend. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t185",
            "title": "Code splitting",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Code splitting is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Code splitting.",
              "sections": [
                {
                  "heading": "Diving into Code splitting",
                  "paragraphs": [
                    "Code splitting forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Code splitting include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Code splitting."
                  ],
                  "code": "// Example of Code splitting\nconsole.log('Practicing Code splitting');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Code splitting",
                  "paragraphs": [
                    "When working with Code splitting at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Code splitting. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t186",
            "title": "Lazy loading",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding Lazy loading is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Lazy loading.",
              "sections": [
                {
                  "heading": "Diving into Lazy loading",
                  "paragraphs": [
                    "Lazy loading forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Lazy loading include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Lazy loading."
                  ],
                  "code": "// Example of Lazy loading\nconsole.log('Practicing Lazy loading');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Lazy loading",
                  "paragraphs": [
                    "When working with Lazy loading at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Lazy loading. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t187",
            "title": "Tree shaking",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Tree shaking is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Tree shaking.",
              "sections": [
                {
                  "heading": "Diving into Tree shaking",
                  "paragraphs": [
                    "Tree shaking forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Tree shaking include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Tree shaking."
                  ],
                  "code": "// Example of Tree shaking\nconsole.log('Practicing Tree shaking');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Tree shaking",
                  "paragraphs": [
                    "When working with Tree shaking at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Tree shaking. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t188",
            "title": "Bundle optimization",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding Bundle optimization is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Bundle optimization.",
              "sections": [
                {
                  "heading": "Diving into Bundle optimization",
                  "paragraphs": [
                    "Bundle optimization forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Bundle optimization include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Bundle optimization."
                  ],
                  "code": "// Example of Bundle optimization\nconsole.log('Practicing Bundle optimization');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Bundle optimization",
                  "paragraphs": [
                    "When working with Bundle optimization at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Bundle optimization. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t189",
            "title": "Backend",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Backend is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Backend.",
              "sections": [
                {
                  "heading": "Diving into Backend",
                  "paragraphs": [
                    "Backend forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Backend include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Backend."
                  ],
                  "code": "// Example of Backend\nconsole.log('Practicing Backend');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Backend",
                  "paragraphs": [
                    "When working with Backend at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Backend. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t190",
            "title": "Caching",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Caching is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Caching.",
              "sections": [
                {
                  "heading": "Diving into Caching",
                  "paragraphs": [
                    "Caching forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Caching include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Caching."
                  ],
                  "code": "// Example of Caching\nconsole.log('Practicing Caching');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Caching",
                  "paragraphs": [
                    "When working with Caching at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Caching. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t191",
            "title": "DB query optimization",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding DB query optimization is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of DB query optimization.",
              "sections": [
                {
                  "heading": "Diving into DB query optimization",
                  "paragraphs": [
                    "DB query optimization forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of DB query optimization include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to DB query optimization."
                  ],
                  "code": "// Example of DB query optimization\nconsole.log('Practicing DB query optimization');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in DB query optimization",
                  "paragraphs": [
                    "When working with DB query optimization at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of DB query optimization. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t192",
            "title": "Async processing",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Async processing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Async processing.",
              "sections": [
                {
                  "heading": "Diving into Async processing",
                  "paragraphs": [
                    "Async processing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Async processing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Async processing."
                  ],
                  "code": "// Example of Async processing\nconsole.log('Practicing Async processing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Async processing",
                  "paragraphs": [
                    "When working with Async processing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Async processing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t193",
            "title": "Infrastructure",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Infrastructure is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Infrastructure.",
              "sections": [
                {
                  "heading": "Diving into Infrastructure",
                  "paragraphs": [
                    "Infrastructure forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Infrastructure include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Infrastructure."
                  ],
                  "code": "// Example of Infrastructure\nconsole.log('Practicing Infrastructure');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Infrastructure",
                  "paragraphs": [
                    "When working with Infrastructure at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Infrastructure. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t194",
            "title": "CDN",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding CDN is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of CDN.",
              "sections": [
                {
                  "heading": "Diving into CDN",
                  "paragraphs": [
                    "CDN forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of CDN include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to CDN."
                  ],
                  "code": "// Example of CDN\nconsole.log('Practicing CDN');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in CDN",
                  "paragraphs": [
                    "When working with CDN at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of CDN. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t195",
            "title": "Edge computing",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Edge computing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Edge computing.",
              "sections": [
                {
                  "heading": "Diving into Edge computing",
                  "paragraphs": [
                    "Edge computing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Edge computing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Edge computing."
                  ],
                  "code": "// Example of Edge computing\nconsole.log('Practicing Edge computing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Edge computing",
                  "paragraphs": [
                    "When working with Edge computing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Edge computing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t196",
            "title": "Optimize slow website challenge",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Optimize slow website challenge",
              "desc": "Put your knowledge to the test by implementing \"Optimize slow website challenge\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/perf-1"
            }
          }
        ]
      }
    ]
  },
  "testing": {
    "id": "testing",
    "title": "Testing",
    "description": "Learn Testing.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t197",
            "title": "Unit testing",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding Unit testing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Unit testing.",
              "sections": [
                {
                  "heading": "Diving into Unit testing",
                  "paragraphs": [
                    "Unit testing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Unit testing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Unit testing."
                  ],
                  "code": "// Example of Unit testing\nconsole.log('Practicing Unit testing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Unit testing",
                  "paragraphs": [
                    "When working with Unit testing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Unit testing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t198",
            "title": "Integration testing",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding Integration testing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Integration testing.",
              "sections": [
                {
                  "heading": "Diving into Integration testing",
                  "paragraphs": [
                    "Integration testing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Integration testing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Integration testing."
                  ],
                  "code": "// Example of Integration testing\nconsole.log('Practicing Integration testing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Integration testing",
                  "paragraphs": [
                    "When working with Integration testing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Integration testing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t199",
            "title": "E2E testing",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding E2E testing is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of E2E testing.",
              "sections": [
                {
                  "heading": "Diving into E2E testing",
                  "paragraphs": [
                    "E2E testing forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of E2E testing include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to E2E testing."
                  ],
                  "code": "// Example of E2E testing\nconsole.log('Practicing E2E testing');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in E2E testing",
                  "paragraphs": [
                    "When working with E2E testing at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of E2E testing. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t200",
            "title": "Mocking",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Mocking is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Mocking.",
              "sections": [
                {
                  "heading": "Diving into Mocking",
                  "paragraphs": [
                    "Mocking forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Mocking include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Mocking."
                  ],
                  "code": "// Example of Mocking\nconsole.log('Practicing Mocking');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Mocking",
                  "paragraphs": [
                    "When working with Mocking at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Mocking. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t201",
            "title": "Test driven development",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding Test driven development is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Test driven development.",
              "sections": [
                {
                  "heading": "Diving into Test driven development",
                  "paragraphs": [
                    "Test driven development forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Test driven development include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Test driven development."
                  ],
                  "code": "// Example of Test driven development\nconsole.log('Practicing Test driven development');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Test driven development",
                  "paragraphs": [
                    "When working with Test driven development at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Test driven development. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t202",
            "title": "Tools examples:",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Tools examples: is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Tools examples:.",
              "sections": [
                {
                  "heading": "Diving into Tools examples:",
                  "paragraphs": [
                    "Tools examples: forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Tools examples: include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Tools examples:."
                  ],
                  "code": "// Example of Tools examples:\nconsole.log('Practicing Tools examples:');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Tools examples:",
                  "paragraphs": [
                    "When working with Tools examples: at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Tools examples:. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t203",
            "title": "Jest",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Jest is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Jest.",
              "sections": [
                {
                  "heading": "Diving into Jest",
                  "paragraphs": [
                    "Jest forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Jest include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Jest."
                  ],
                  "code": "// Example of Jest\nconsole.log('Practicing Jest');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Jest",
                  "paragraphs": [
                    "When working with Jest at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Jest. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t204",
            "title": "Playwright",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding Playwright is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Playwright.",
              "sections": [
                {
                  "heading": "Diving into Playwright",
                  "paragraphs": [
                    "Playwright forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Playwright include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Playwright."
                  ],
                  "code": "// Example of Playwright\nconsole.log('Practicing Playwright');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Playwright",
                  "paragraphs": [
                    "When working with Playwright at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Playwright. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t205",
            "title": "Cypress",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding Cypress is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Cypress.",
              "sections": [
                {
                  "heading": "Diving into Cypress",
                  "paragraphs": [
                    "Cypress forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Cypress include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Cypress."
                  ],
                  "code": "// Example of Cypress\nconsole.log('Practicing Cypress');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Cypress",
                  "paragraphs": [
                    "When working with Cypress at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Cypress. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t206",
            "title": "Write tests for API",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Write tests for API",
              "desc": "Put your knowledge to the test by implementing \"Write tests for API\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/testing-1"
            }
          },
          {
            "id": "t207",
            "title": "Test React component",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Test React component",
              "desc": "Put your knowledge to the test by implementing \"Test React component\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/testing-2"
            }
          }
        ]
      }
    ]
  },
  "devops": {
    "id": "devops",
    "title": "DevOps Basics",
    "description": "Learn DevOps.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t208",
            "title": "CI/CD",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding CI/CD is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of CI/CD.",
              "sections": [
                {
                  "heading": "Diving into CI/CD",
                  "paragraphs": [
                    "CI/CD forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of CI/CD include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to CI/CD."
                  ],
                  "code": "// Example of CI/CD\nconsole.log('Practicing CI/CD');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in CI/CD",
                  "paragraphs": [
                    "When working with CI/CD at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of CI/CD. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t209",
            "title": "Docker",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Docker is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Docker.",
              "sections": [
                {
                  "heading": "Diving into Docker",
                  "paragraphs": [
                    "Docker forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Docker include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Docker."
                  ],
                  "code": "// Example of Docker\nconsole.log('Practicing Docker');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Docker",
                  "paragraphs": [
                    "When working with Docker at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Docker. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t210",
            "title": "Containers",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Containers is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Containers.",
              "sections": [
                {
                  "heading": "Diving into Containers",
                  "paragraphs": [
                    "Containers forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Containers include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Containers."
                  ],
                  "code": "// Example of Containers\nconsole.log('Practicing Containers');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Containers",
                  "paragraphs": [
                    "When working with Containers at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Containers. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t211",
            "title": "Deployment strategies",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Deployment strategies is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Deployment strategies.",
              "sections": [
                {
                  "heading": "Diving into Deployment strategies",
                  "paragraphs": [
                    "Deployment strategies forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Deployment strategies include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Deployment strategies."
                  ],
                  "code": "// Example of Deployment strategies\nconsole.log('Practicing Deployment strategies');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Deployment strategies",
                  "paragraphs": [
                    "When working with Deployment strategies at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Deployment strategies. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t212",
            "title": "Environment variables",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Environment variables is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Environment variables.",
              "sections": [
                {
                  "heading": "Diving into Environment variables",
                  "paragraphs": [
                    "Environment variables forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Environment variables include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Environment variables."
                  ],
                  "code": "// Example of Environment variables\nconsole.log('Practicing Environment variables');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Environment variables",
                  "paragraphs": [
                    "When working with Environment variables at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Environment variables. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t213",
            "title": "Infrastructure as code",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Infrastructure as code is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Infrastructure as code.",
              "sections": [
                {
                  "heading": "Diving into Infrastructure as code",
                  "paragraphs": [
                    "Infrastructure as code forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Infrastructure as code include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Infrastructure as code."
                  ],
                  "code": "// Example of Infrastructure as code\nconsole.log('Practicing Infrastructure as code');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Infrastructure as code",
                  "paragraphs": [
                    "When working with Infrastructure as code at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Infrastructure as code. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t214",
            "title": "Containerize app",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Containerize app",
              "desc": "Put your knowledge to the test by implementing \"Containerize app\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/devops-1"
            }
          },
          {
            "id": "t215",
            "title": "Setup CI pipeline",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Setup CI pipeline",
              "desc": "Put your knowledge to the test by implementing \"Setup CI pipeline\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/devops-2"
            }
          }
        ]
      }
    ]
  },
  "cloud": {
    "id": "cloud",
    "title": "Cloud & Deployment",
    "description": "Learn Cloud.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t216",
            "title": "Cloud fundamentals",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding Cloud fundamentals is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Cloud fundamentals.",
              "sections": [
                {
                  "heading": "Diving into Cloud fundamentals",
                  "paragraphs": [
                    "Cloud fundamentals forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Cloud fundamentals include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Cloud fundamentals."
                  ],
                  "code": "// Example of Cloud fundamentals\nconsole.log('Practicing Cloud fundamentals');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Cloud fundamentals",
                  "paragraphs": [
                    "When working with Cloud fundamentals at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Cloud fundamentals. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t217",
            "title": "Serverless",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Serverless is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Serverless.",
              "sections": [
                {
                  "heading": "Diving into Serverless",
                  "paragraphs": [
                    "Serverless forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Serverless include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Serverless."
                  ],
                  "code": "// Example of Serverless\nconsole.log('Practicing Serverless');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Serverless",
                  "paragraphs": [
                    "When working with Serverless at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Serverless. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t218",
            "title": "Edge functions",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding Edge functions is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Edge functions.",
              "sections": [
                {
                  "heading": "Diving into Edge functions",
                  "paragraphs": [
                    "Edge functions forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Edge functions include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Edge functions."
                  ],
                  "code": "// Example of Edge functions\nconsole.log('Practicing Edge functions');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Edge functions",
                  "paragraphs": [
                    "When working with Edge functions at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Edge functions. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t219",
            "title": "Hosting architectures",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Hosting architectures is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Hosting architectures.",
              "sections": [
                {
                  "heading": "Diving into Hosting architectures",
                  "paragraphs": [
                    "Hosting architectures forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Hosting architectures include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Hosting architectures."
                  ],
                  "code": "// Example of Hosting architectures\nconsole.log('Practicing Hosting architectures');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Hosting architectures",
                  "paragraphs": [
                    "When working with Hosting architectures at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Hosting architectures. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t220",
            "title": "CDN",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding CDN is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of CDN.",
              "sections": [
                {
                  "heading": "Diving into CDN",
                  "paragraphs": [
                    "CDN forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of CDN include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to CDN."
                  ],
                  "code": "// Example of CDN\nconsole.log('Practicing CDN');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in CDN",
                  "paragraphs": [
                    "When working with CDN at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of CDN. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t221",
            "title": "Autoscaling",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding Autoscaling is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Autoscaling.",
              "sections": [
                {
                  "heading": "Diving into Autoscaling",
                  "paragraphs": [
                    "Autoscaling forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Autoscaling include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Autoscaling."
                  ],
                  "code": "// Example of Autoscaling\nconsole.log('Practicing Autoscaling');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Autoscaling",
                  "paragraphs": [
                    "When working with Autoscaling at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Autoscaling. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t222",
            "title": "Deploy full stack app",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Deploy full stack app",
              "desc": "Put your knowledge to the test by implementing \"Deploy full stack app\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/cloud-1"
            }
          }
        ]
      }
    ]
  },
  "realtime": {
    "id": "realtime",
    "title": "Real-Time Applications",
    "description": "Learn Real-Time.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t223",
            "title": "WebSockets",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding WebSockets is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of WebSockets.",
              "sections": [
                {
                  "heading": "Diving into WebSockets",
                  "paragraphs": [
                    "WebSockets forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of WebSockets include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to WebSockets."
                  ],
                  "code": "// Example of WebSockets\nconsole.log('Practicing WebSockets');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in WebSockets",
                  "paragraphs": [
                    "When working with WebSockets at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of WebSockets. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t224",
            "title": "Server Sent Events",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Server Sent Events is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Server Sent Events.",
              "sections": [
                {
                  "heading": "Diving into Server Sent Events",
                  "paragraphs": [
                    "Server Sent Events forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Server Sent Events include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Server Sent Events."
                  ],
                  "code": "// Example of Server Sent Events\nconsole.log('Practicing Server Sent Events');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Server Sent Events",
                  "paragraphs": [
                    "When working with Server Sent Events at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Server Sent Events. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t225",
            "title": "Pub/Sub systems",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding Pub/Sub systems is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Pub/Sub systems.",
              "sections": [
                {
                  "heading": "Diving into Pub/Sub systems",
                  "paragraphs": [
                    "Pub/Sub systems forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Pub/Sub systems include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Pub/Sub systems."
                  ],
                  "code": "// Example of Pub/Sub systems\nconsole.log('Practicing Pub/Sub systems');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Pub/Sub systems",
                  "paragraphs": [
                    "When working with Pub/Sub systems at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Pub/Sub systems. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t226",
            "title": "Chat architecture",
            "type": "reading",
            "readingTime": "14 min read",
            "article": {
              "lead": "Understanding Chat architecture is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Chat architecture.",
              "sections": [
                {
                  "heading": "Diving into Chat architecture",
                  "paragraphs": [
                    "Chat architecture forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Chat architecture include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Chat architecture."
                  ],
                  "code": "// Example of Chat architecture\nconsole.log('Practicing Chat architecture');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Chat architecture",
                  "paragraphs": [
                    "When working with Chat architecture at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Chat architecture. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t227",
            "title": "Notification systems",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Notification systems is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Notification systems.",
              "sections": [
                {
                  "heading": "Diving into Notification systems",
                  "paragraphs": [
                    "Notification systems forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Notification systems include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Notification systems."
                  ],
                  "code": "// Example of Notification systems\nconsole.log('Practicing Notification systems');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Notification systems",
                  "paragraphs": [
                    "When working with Notification systems at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Notification systems. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t228",
            "title": "Build real-time chat",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Build real-time chat",
              "desc": "Put your knowledge to the test by implementing \"Build real-time chat\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/realtime-1"
            }
          }
        ]
      }
    ]
  },
  "security": {
    "id": "security",
    "title": "Security Engineering",
    "description": "Learn Security.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t229",
            "title": "XSS",
            "type": "reading",
            "readingTime": "7 min read",
            "article": {
              "lead": "Understanding XSS is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of XSS.",
              "sections": [
                {
                  "heading": "Diving into XSS",
                  "paragraphs": [
                    "XSS forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of XSS include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to XSS."
                  ],
                  "code": "// Example of XSS\nconsole.log('Practicing XSS');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in XSS",
                  "paragraphs": [
                    "When working with XSS at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of XSS. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t230",
            "title": "CSRF",
            "type": "reading",
            "readingTime": "10 min read",
            "article": {
              "lead": "Understanding CSRF is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of CSRF.",
              "sections": [
                {
                  "heading": "Diving into CSRF",
                  "paragraphs": [
                    "CSRF forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of CSRF include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to CSRF."
                  ],
                  "code": "// Example of CSRF\nconsole.log('Practicing CSRF');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in CSRF",
                  "paragraphs": [
                    "When working with CSRF at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of CSRF. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t231",
            "title": "CSP",
            "type": "reading",
            "readingTime": "9 min read",
            "article": {
              "lead": "Understanding CSP is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of CSP.",
              "sections": [
                {
                  "heading": "Diving into CSP",
                  "paragraphs": [
                    "CSP forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of CSP include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to CSP."
                  ],
                  "code": "// Example of CSP\nconsole.log('Practicing CSP');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in CSP",
                  "paragraphs": [
                    "When working with CSP at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of CSP. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t232",
            "title": "Secure headers",
            "type": "reading",
            "readingTime": "11 min read",
            "article": {
              "lead": "Understanding Secure headers is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Secure headers.",
              "sections": [
                {
                  "heading": "Diving into Secure headers",
                  "paragraphs": [
                    "Secure headers forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Secure headers include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Secure headers."
                  ],
                  "code": "// Example of Secure headers\nconsole.log('Practicing Secure headers');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Secure headers",
                  "paragraphs": [
                    "When working with Secure headers at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Secure headers. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t233",
            "title": "Authentication attacks",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding Authentication attacks is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Authentication attacks.",
              "sections": [
                {
                  "heading": "Diving into Authentication attacks",
                  "paragraphs": [
                    "Authentication attacks forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Authentication attacks include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Authentication attacks."
                  ],
                  "code": "// Example of Authentication attacks\nconsole.log('Practicing Authentication attacks');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Authentication attacks",
                  "paragraphs": [
                    "When working with Authentication attacks at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Authentication attacks. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t234",
            "title": "OWASP Top 10",
            "type": "reading",
            "readingTime": "6 min read",
            "article": {
              "lead": "Understanding OWASP Top 10 is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of OWASP Top 10.",
              "sections": [
                {
                  "heading": "Diving into OWASP Top 10",
                  "paragraphs": [
                    "OWASP Top 10 forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of OWASP Top 10 include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to OWASP Top 10."
                  ],
                  "code": "// Example of OWASP Top 10\nconsole.log('Practicing OWASP Top 10');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in OWASP Top 10",
                  "paragraphs": [
                    "When working with OWASP Top 10 at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of OWASP Top 10. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t235",
            "title": "Fix vulnerable app challenge",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Fix vulnerable app challenge",
              "desc": "Put your knowledge to the test by implementing \"Fix vulnerable app challenge\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/security-1"
            }
          }
        ]
      }
    ]
  },
  "adv-frontend": {
    "id": "adv-frontend",
    "title": "Advanced Frontend Architecture",
    "description": "Learn Adv Frontend.",
    "sections": [
      {
        "id": "s1",
        "title": "Core Concepts",
        "topics": [
          {
            "id": "t236",
            "title": "State management",
            "type": "reading",
            "readingTime": "5 min read",
            "article": {
              "lead": "Understanding State management is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of State management.",
              "sections": [
                {
                  "heading": "Diving into State management",
                  "paragraphs": [
                    "State management forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of State management include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to State management."
                  ],
                  "code": "// Example of State management\nconsole.log('Practicing State management');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in State management",
                  "paragraphs": [
                    "When working with State management at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of State management. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t237",
            "title": "Micro frontends",
            "type": "reading",
            "readingTime": "12 min read",
            "article": {
              "lead": "Understanding Micro frontends is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Micro frontends.",
              "sections": [
                {
                  "heading": "Diving into Micro frontends",
                  "paragraphs": [
                    "Micro frontends forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Micro frontends include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Micro frontends."
                  ],
                  "code": "// Example of Micro frontends\nconsole.log('Practicing Micro frontends');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Micro frontends",
                  "paragraphs": [
                    "When working with Micro frontends at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Micro frontends. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t238",
            "title": "Design systems",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Design systems is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Design systems.",
              "sections": [
                {
                  "heading": "Diving into Design systems",
                  "paragraphs": [
                    "Design systems forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Design systems include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Design systems."
                  ],
                  "code": "// Example of Design systems\nconsole.log('Practicing Design systems');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Design systems",
                  "paragraphs": [
                    "When working with Design systems at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Design systems. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t239",
            "title": "Component libraries",
            "type": "reading",
            "readingTime": "8 min read",
            "article": {
              "lead": "Understanding Component libraries is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Component libraries.",
              "sections": [
                {
                  "heading": "Diving into Component libraries",
                  "paragraphs": [
                    "Component libraries forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Component libraries include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Component libraries."
                  ],
                  "code": "// Example of Component libraries\nconsole.log('Practicing Component libraries');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Component libraries",
                  "paragraphs": [
                    "When working with Component libraries at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Component libraries. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          },
          {
            "id": "t240",
            "title": "Accessibility engineering",
            "type": "reading",
            "readingTime": "13 min read",
            "article": {
              "lead": "Understanding Accessibility engineering is crucial for any full-stack developer. This comprehensive guide covers all the essentials and core mechanics of Accessibility engineering.",
              "sections": [
                {
                  "heading": "Diving into Accessibility engineering",
                  "paragraphs": [
                    "Accessibility engineering forms a critical part of modern web architecture. Mastering it allows you to build scalable, robust, and performant applications.",
                    "The core concepts of Accessibility engineering include understanding its underlying principles, how it fits into the broader ecosystem, and its practical implementations. In a production environment, you will often find yourself dealing with edge cases and optimization strategies related to Accessibility engineering."
                  ],
                  "code": "// Example of Accessibility engineering\nconsole.log('Practicing Accessibility engineering');\nfunction init() {\n  return 'Success';\n}"
                },
                {
                  "heading": "Advanced Concepts in Accessibility engineering",
                  "paragraphs": [
                    "When working with Accessibility engineering at scale, performance and security become paramount. Always ensure you are following the latest industry standards.",
                    "Common pitfalls include misconfiguration, memory leaks, or improper state management depending on the specific domain of Accessibility engineering. Always validate inputs and handle errors gracefully."
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "s2",
        "title": "Challenges & Practice",
        "topics": [
          {
            "id": "t241",
            "title": "Build reusable UI library",
            "type": "practice",
            "readingTime": "Practice Task",
            "practice": {
              "title": "Build reusable UI library",
              "desc": "Put your knowledge to the test by implementing \"Build reusable UI library\". Try to write clean, optimal, and performant code.",
              "link": "/workspace/adv-frontend-1"
            }
          }
        ]
      }
    ]
  }
};
