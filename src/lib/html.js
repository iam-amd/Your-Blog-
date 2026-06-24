import DOMPurify from "dompurify";
import { SAFE_HTML_CONFIG } from "./constants.js";

// Sanitises any HTML string against the safe tag/attribute allow-list.
export function sanitizeHtml(html) {
  return DOMPurify.sanitize(String(html || ""), SAFE_HTML_CONFIG);
}

// Convenience wrapper for React's dangerouslySetInnerHTML.
export function safeHtml(html) {
  return { __html: sanitizeHtml(html) };
}

// Escapes user text before it is placed inside a raw HTML string.
export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Detects whether stored content is already rich HTML (newer posts) or the
// lightweight Markdown-like plain text used by the seed posts.
export function looksLikeHtml(content) {
  return /<\/?(p|h[1-6]|blockquote|ul|ol|li|figure|figcaption|img|hr|div|span|strong|em|b|i|u)\b/i.test(content);
}

// Converts the lightweight Markdown-like format into sanitised HTML.
export function storyToHtml(content) {
  if (looksLikeHtml(content)) return sanitizeHtml(content);

  const lines = content.split("\n");
  let html = "";
  let list = [];

  function flushList() {
    if (list.length) {
      html += `<ul>${list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      list = [];
    }
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      return;
    }
    flushList();
    if (line.startsWith("## ")) html += `<h2>${escapeHtml(line.slice(3))}</h2>`;
    else if (line.startsWith("> ")) html += `<blockquote>${escapeHtml(line.slice(2))}</blockquote>`;
    else if (line === "---") html += "<hr />";
    else if (line.startsWith("![") && line.includes("](") && line.endsWith(")")) {
      html += `<img class="story-image" src="${escapeHtml(line.slice(line.indexOf("](") + 2, -1))}" alt="" />`;
    } else html += `<p>${escapeHtml(line)}</p>`;
  });
  flushList();
  return html;
}

// Prepares stored content for display inside the contentEditable rich editor.
export function contentToEditorHtml(content) {
  if (!content?.trim()) return "";
  if (looksLikeHtml(content)) return sanitizeHtml(content);
  return storyToHtml(content);
}
