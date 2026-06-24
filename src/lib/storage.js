import {
  CONTENT_VERSION,
  CONTENT_VERSION_KEY,
  LEGACY_STORAGE_KEYS,
  STORAGE_KEY,
} from "./constants.js";
import { starterPosts } from "../data/starterPosts.js";
import { normalizePost } from "./posts.js";
import { today } from "./dates.js";

// Loads and normalises posts from localStorage, falling back to the seed posts
// when nothing is stored yet or the saved data is unreadable.
export function readPosts() {
  try {
    const contentVersion = localStorage.getItem(CONTENT_VERSION_KEY);
    if (contentVersion !== CONTENT_VERSION) {
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
      const freshPosts = starterPosts.map(normalizePost);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(freshPosts));
      localStorage.setItem(CONTENT_VERSION_KEY, CONTENT_VERSION);
      return freshPosts;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
      return starterPosts.map(normalizePost);
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizePost) : starterPosts.map(normalizePost);
  } catch {
    return starterPosts.map(normalizePost);
  }
}

// Saves the full list of posts to localStorage.
export function writePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// Inserts a new post or updates an existing one, then writes the result back to
// storage. Returns the normalised post or throws when the quota is exceeded.
export function persistPost(post) {
  const normalized = normalizePost(post);
  const current = readPosts();
  const exists = current.some((item) => item.id === normalized.id);
  const saved = exists
    ? current.map((item) => (item.id === normalized.id ? { ...normalized, updatedAt: today() } : item))
    : [{ ...normalized, createdAt: today(), updatedAt: today() }, ...current];
  try {
    writePosts(saved);
  } catch {
    throw new Error("Unable to save. The browser storage is full, so try a smaller image or remove an old post.");
  }
  return normalized;
}
