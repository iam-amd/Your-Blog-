// App-wide configuration values shared across the blog manager.

// Bump the key when the built-in editorial collection changes so returning
// visitors receive the new posts instead of stale demo data.
export const STORAGE_KEY = "your_blog_posts_v2";
export const LEGACY_STORAGE_KEYS = ["your_blog_posts_v1"];
export const CONTENT_VERSION_KEY = "your_blog_content_version";
export const CONTENT_VERSION = "2026-06-24-editorial-collection-v2";

// Image upload limits. Uploaded images are resized and compressed before being
// stored so the browser storage quota is not exhausted too quickly.
export const MAX_IMAGE_FILE_SIZE = 6 * 1024 * 1024; // 6 MB
export const IMAGE_MAX_WIDTH = 1400;
export const IMAGE_QUALITY = 0.78;

// Allow-list passed to DOMPurify so only safe rich-text tags and attributes
// survive when story HTML is rendered or saved.
export const SAFE_HTML_CONFIG = {
  ALLOWED_TAGS: [
    "p", "br", "strong", "b", "em", "i", "u",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "blockquote", "ul", "ol", "li",
    "figure", "figcaption", "img", "hr", "div", "span",
  ],
  ALLOWED_ATTR: ["src", "alt", "title", "class"],
  ALLOW_DATA_ATTR: false,
};
