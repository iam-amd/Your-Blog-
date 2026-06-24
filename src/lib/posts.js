import { today } from "./dates.js";
import { sanitizeHtml } from "./html.js";

// A blank post used as the starting point when writing something new, and as a
// source of default values when normalising posts loaded from storage.
export function emptyPost() {
  return {
    title: "",
    subtitle: "",
    author: "B. Ahamed",
    category: "Writing",
    status: "Draft",
    cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    content: "",
  };
}

// Fills in any missing or invalid fields so the rest of the app can safely
// trust every post object (guards against corrupted localStorage data).
export function normalizePost(post) {
  const fallback = emptyPost();
  const status = post?.status === "Published" ? "Published" : "Draft";
  return {
    ...fallback,
    ...post,
    id: post?.id || crypto.randomUUID(),
    title: String(post?.title || fallback.title || ""),
    subtitle: String(post?.subtitle || fallback.subtitle || ""),
    author: String(post?.author || fallback.author),
    category: String(post?.category || fallback.category),
    status,
    cover: String(post?.cover || fallback.cover),
    content: sanitizeHtml(post?.content || fallback.content || ""),
    createdAt: post?.createdAt || today(),
    updatedAt: post?.updatedAt || today(),
  };
}
