import { CalendarDays, Edit3, Sparkles } from "lucide-react";
import { looksLikeHtml, safeHtml } from "../lib/html.js";

// Full reading view for a single post, also reused inside the preview modal and
// the editor's live preview pane.
export default function BlogDetail({ post, onEdit }) {
  if (!post) {
    return (
      <section className="detail-panel empty-detail">
        <Sparkles size={36} />
        <h2>Your writing desk is ready</h2>
        <p>Create a new post to start building your blog collection.</p>
      </section>
    );
  }

  return (
    <article className="detail-panel">
      <img className="detail-cover" src={post.cover} alt="" />
      <div className="detail-content">
        <div className="meta-row">
          <span className={post.status === "Published" ? "pill published" : "pill draft"}>{post.status}</span>
          <span>{post.category}</span>
          <span><CalendarDays size={15} /> Updated {post.updatedAt}</span>
        </div>
        <h2>{post.title}</h2>
        <p className="subtitle">{post.subtitle}</p>
        <div className="author-row">
          <span>{post.author}</span>
          <button type="button" onClick={() => onEdit(post)}>
            <Edit3 size={16} />
            Edit
          </button>
        </div>
        <div className="article-body">{renderStoryContent(post.content)}</div>
      </div>
    </article>
  );
}

// Converts stored content into React nodes. Rich HTML is rendered through the
// sanitiser; the lightweight Markdown-like format is parsed line by line.
function renderStoryContent(content) {
  if (looksLikeHtml(content)) {
    return <div dangerouslySetInnerHTML={safeHtml(content)} />;
  }

  const lines = content.split("\n");
  const nodes = [];
  let listItems = [];

  function flushList() {
    if (listItems.length) {
      nodes.push(
        <ul key={`list-${nodes.length}`}>
          {listItems.map((item) => <li key={item}>{item}</li>)}
        </ul>,
      );
      listItems = [];
    }
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }
    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }
    flushList();
    if (line.startsWith("## ")) nodes.push(<h3 key={index}>{line.slice(3)}</h3>);
    else if (line.startsWith("> ")) nodes.push(<blockquote key={index}>{line.slice(2)}</blockquote>);
    else if (line === "---") nodes.push(<hr key={index} />);
    else if (line.startsWith("![") && line.includes("](") && line.endsWith(")")) {
      const src = line.slice(line.indexOf("](") + 2, -1);
      nodes.push(<img className="story-inline-image" src={src} alt="" key={index} />);
    } else nodes.push(<p key={index}>{line}</p>);
  });
  flushList();
  return nodes;
}
