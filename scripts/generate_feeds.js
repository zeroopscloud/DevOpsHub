// scripts/generate_feeds.js
const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const ROOT = process.cwd();
const INDEX = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const dom = new JSDOM(INDEX);
const document = dom.window.document;

// Collect all QA articles
const qas = Array.from(document.querySelectorAll("article.qa")).map(a => {
  return {
    title: a.getAttribute("data-title") || (a.querySelector(".q")?.textContent || "Untitled"),
    date: a.getAttribute("data-date") || new Date().toISOString().slice(0, 10),
    section: (a.closest("section")?.id) || "general",
    html: a.innerHTML
  };
});

// Helper to strip newlines
function stripNewlines(s) {
  return s.replace(/\n+/g, " ").replace(/<script[\s\S]*?<\/script>/gi, "");
}

// Build RSS XML
function buildRSS() {
  const siteUrl = "https://USERNAME.github.io";
  let items = qas.map(q => {
    const link = `${siteUrl}/#${encodeURIComponent(q.section)}`;
    return `  <item>
    <title><![CDATA[${q.title}]]></title>
    <link>${link}</link>
    <guid isPermaLink="false">${siteUrl}#${q.section}-${q.date}-${escape(q.title)}</guid>
    <pubDate>${new Date(q.date).toUTCString()}</pubDate>
    <description><![CDATA[${stripNewlines(q.html)}]]></description>
  </item>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>DevOps Interview Hub — Updates</title>
  <link>${siteUrl}</link>
  <description>Daily DevOps interview question updates</description>
  <language>en-US</language>
${items}
</channel>
</rss>`;
}

// Build Sitemap XML
function buildSitemap() {
  const siteUrl = "https://USERNAME.github.io";
  const pages = [{ loc: `${siteUrl}/`, priority: 1.0 }];
  const sections = Array.from(document.querySelectorAll("main section[id]")).map(s => s.id);
  sections.forEach(id => pages.push({ loc: `${siteUrl}/#${id}`, priority: 0.6 }));
  let urls = pages.map(p => `  <url><loc>${p.loc}</loc><priority>${p.priority}</priority></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Write files
fs.writeFileSync(path.join(ROOT, "rss.xml"), buildRSS(), "utf8");
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), buildSitemap(), "utf8");

console.log("rss.xml and sitemap.xml generated with", qas.length, "items");
