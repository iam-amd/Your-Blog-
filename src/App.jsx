import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  FileText,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { STORAGE_KEY } from "./lib/constants.js";
import { readPosts, writePosts } from "./lib/storage.js";
import { emptyPost, normalizePost } from "./lib/posts.js";
import { today } from "./lib/dates.js";
import { starterPosts } from "./data/starterPosts.js";
import Stat from "./components/Stat.jsx";
import BlogPreview from "./components/BlogPreview.jsx";
import PostEditor from "./components/PostEditor.jsx";

// Root component: the publishing dashboard. The editor opens in a separate
// browser tab driven by the ?editor=<id> query parameter.
export default function App() {
  const [posts, setPosts] = useState(readPosts);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const editorId = new URLSearchParams(window.location.search).get("editor");

  // Keep this tab in sync when posts are saved from the editor tab.
  useEffect(() => {
    function syncPosts(event) {
      if (event.key === STORAGE_KEY) setPosts(readPosts());
    }
    window.addEventListener("storage", syncPosts);
    return () => window.removeEventListener("storage", syncPosts);
  }, []);

  // Persist the dashboard's copy of the posts whenever they change.
  useEffect(() => {
    try {
      writePosts(posts);
    } catch (error) {
      console.warn("Unable to sync blog posts to local storage", error);
    }
  }, [posts]);

  const selectedPost = posts.find((post) => post.id === selectedId) || posts[0] || null;

  const filteredPosts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesStatus = statusFilter === "All" || post.status === statusFilter;
      const matchesQuery =
        !needle ||
        [post.title, post.subtitle, post.author, post.category, post.content]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [posts, query, statusFilter]);

  const counts = useMemo(
    () => ({
      total: posts.length,
      published: posts.filter((post) => post.status === "Published").length,
      draft: posts.filter((post) => post.status === "Draft").length,
    }),
    [posts],
  );

  if (editorId) {
    const targetPost =
      editorId === "new"
        ? { ...emptyPost(), id: crypto.randomUUID() }
        : posts.find((post) => post.id === editorId) || { ...emptyPost(), id: crypto.randomUUID() };
    return <PostEditor post={targetPost} onSave={savePost} />;
  }

  function savePost(post) {
    const normalized = normalizePost(post);
    setPosts((current) => {
      const exists = current.some((item) => item.id === normalized.id);
      if (exists) {
        return current.map((item) => (item.id === normalized.id ? { ...normalized, updatedAt: today() } : item));
      }
      return [{ ...normalized, createdAt: today(), updatedAt: today() }, ...current];
    });
  }

  function deletePost(id) {
    setPosts((current) => current.filter((post) => post.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function openPostPreview(post) {
    setSelectedId(post.id);
    setPreviewPost(post);
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <div className="brand">
          <div>
            <strong>Your Blog!</strong>
            <span>Write. Draft. Publish.</span>
          </div>
        </div>
        <button className="primary-button" type="button" onClick={() => openEditorTab("new")}>
          <Plus size={18} />
          Write
        </button>
      </header>

      <section className="workspace">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">The personal publishing desk</p>
            <h1>Your Blog!</h1>
            <p>
              A clean space to write posts, save drafts, publish stories, search your ideas, and read every blog in detail.
            </p>
          </div>
          <article className="featured-story">
            <img src={selectedPost?.cover || starterPosts[0].cover} alt="" />
            <div>
              <span className={selectedPost?.status === "Published" ? "pill published" : "pill draft"}>
                {selectedPost?.status || "Draft"}
              </span>
              <h2>{selectedPost?.title || "Start writing your first story"}</h2>
              <p>{selectedPost?.subtitle || "Create a new blog post and it will appear here."}</p>
              <button type="button" onClick={() => selectedPost && setPreviewPost(selectedPost)}>
                <Eye size={16} />
                Preview story
              </button>
            </div>
          </article>
        </section>

        <section className="summary-strip" aria-label="Blog summary">
          <Stat label="Total stories" value={counts.total} />
          <Stat label="Drafts waiting" value={counts.draft} />
          <Stat label="Published posts" value={counts.published} />
        </section>

        <section className="recent-tools">
          <div>
            <p className="eyebrow">Recent</p>
            <h2>Manage your posts</h2>
          </div>
          <label className="search-box">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts"
            />
          </label>
          <nav className="status-tabs" aria-label="Post status filters">
            {["All", "Draft", "Published"].map((status) => (
              <button
                className={statusFilter === status ? "tab active" : "tab"}
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
              >
                {status === "All" ? <BookOpen size={17} /> : status === "Draft" ? <Clock3 size={17} /> : <CheckCircle2 size={17} />}
                {status}
              </button>
            ))}
          </nav>
        </section>

        <div className="content-grid">
          <section className="post-list" aria-label="Blog posts">
            {filteredPosts.length ? (
              filteredPosts.map((post) => (
                <article
                  className={selectedPost?.id === post.id ? "post-card selected" : "post-card"}
                  key={post.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openPostPreview(post)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openPostPreview(post);
                    }
                  }}
                >
                  <img src={post.cover} alt="" />
                  <div className="post-card-body">
                    <div className="meta-row">
                      <span>{post.category}</span>
                      <span>{post.updatedAt}</span>
                    </div>
                    <span className={post.status === "Published" ? "pill published" : "pill draft"}>{post.status}</span>
                    <h2>{post.title}</h2>
                    <p>{post.subtitle}</p>
                    <div className="card-actions">
                      <span>{post.author}</span>
                      <button type="button" title="Edit post" onClick={(event) => { event.stopPropagation(); openEditorTab(post.id); }}>
                        <Edit3 size={16} />
                      </button>
                      <button type="button" title="Delete post" onClick={(event) => {
                        event.stopPropagation();
                        if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) deletePost(post.id);
                      }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <FileText size={34} />
                <h2>No matching posts</h2>
                <p>Try a different search term or status filter.</p>
              </div>
            )}
          </section>
        </div>
      </section>

      {previewPost && (
        <BlogPreview
          post={previewPost}
          onClose={() => setPreviewPost(null)}
          onEdit={(post) => {
            setPreviewPost(null);
            openEditorTab(post.id);
          }}
        />
      )}
    </main>
  );
}

// Opens the writing experience for a post (or "new") in a separate browser tab.
function openEditorTab(id) {
  window.open(`${window.location.origin}${window.location.pathname}?editor=${encodeURIComponent(id)}`, "_blank");
}
