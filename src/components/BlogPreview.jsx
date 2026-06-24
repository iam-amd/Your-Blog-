import { BookOpen, Edit3, ExternalLink, X } from "lucide-react";
import { escapeHtml, storyToHtml } from "../lib/html.js";
import BlogDetail from "./BlogDetail.jsx";

// Modal that previews a post the way a reader would see it, with an option to
// open a clean standalone reader page in a new browser tab.
export default function BlogPreview({ post, onClose, onEdit }) {
  function openInNewTab() {
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(post.title)} - Your Blog!</title>
  <style>
    *{box-sizing:border-box}
    body{
      margin:0;
      background:radial-gradient(circle,rgba(23,23,23,.12) 1px,transparent 1.2px) 0 0/14px 14px,#d9d4cd;
      color:#171717;
      font-family:Georgia,'Times New Roman',serif;
    }
    header{
      align-items:center;
      background:rgba(231,228,222,.94);
      border-bottom:1px solid #171717;
      display:flex;
      justify-content:space-between;
      padding:18px clamp(16px,5vw,52px);
    }
    .brand{font:900 clamp(24px,4vw,34px) Georgia,'Times New Roman',serif}
    .status{
      border:1px solid #171717;
      border-radius:999px;
      font:800 12px Arial,sans-serif;
      padding:5px 10px;
    }
    main{
      background:#eeeae3;
      border:1px solid #171717;
      border-radius:8px;
      box-shadow:0 16px 38px rgba(23,23,23,.16);
      margin:34px auto 72px;
      max-width:920px;
      padding:clamp(14px,3vw,24px);
      width:min(calc(100% - 28px),920px);
    }
    .cover{width:100%;max-height:460px;object-fit:cover;border:1px solid #171717;border-radius:6px;filter:grayscale(.3)}
    .meta{align-items:center;display:flex;flex-wrap:wrap;gap:10px;font:700 14px Arial,sans-serif;color:#4b4945;margin:24px 0 12px}
    .tag{border:1px solid #171717;border-radius:999px;color:#171717;padding:4px 9px}
    h1{font-size:clamp(38px,8vw,78px);line-height:.96;margin:0 0 16px}
    .sub{font:400 clamp(17px,2.4vw,21px)/1.5 Arial,sans-serif;color:#4b4945}
    .author{border-top:1px solid #171717;border-bottom:1px solid #171717;padding:14px 0;margin:28px 0;font:800 15px Arial,sans-serif}
    p{font-size:clamp(18px,2.6vw,21px);line-height:1.75}
    .story-image{width:100%;max-height:520px;object-fit:cover;border:1px solid #171717;border-radius:6px;margin:18px 0}
    h2{font-size:clamp(30px,5vw,46px);line-height:1.05;margin:30px 0 8px}
    h3{font-size:clamp(24px,4vw,34px);line-height:1.14;margin:26px 0 8px}
    h4,h5,h6{font:800 clamp(19px,3vw,24px)/1.25 Arial,sans-serif;margin:22px 0 8px}
    blockquote{border-left:4px solid #171717;font-size:clamp(22px,4vw,30px);line-height:1.35;margin:24px 0;padding-left:18px}
    hr{border:0;border-top:1px solid #171717;margin:30px 0}
    li{font-size:clamp(18px,2.6vw,21px);line-height:1.7;margin:6px 0}
    figure{margin:28px 0}
    figure img,.article-body img{width:100%;max-height:520px;object-fit:cover;border:1px solid #171717;border-radius:6px}
    figcaption{color:#65615b;font:600 13px Arial,sans-serif;margin-top:8px;text-align:center}
    @media(max-width:640px){
      header{align-items:flex-start;flex-direction:column;gap:10px}
      main{margin-top:18px;width:min(calc(100% - 20px),920px)}
      .meta{font-size:12px}
    }
  </style>
</head>
<body><header><div class="brand">Your Blog!</div><div>Clean reader preview</div></header><main>
  <img class="cover" src="${escapeHtml(post.cover)}" alt="" />
  <div class="meta"><span class="tag">${escapeHtml(post.status)}</span><span>${escapeHtml(post.category)}</span><span>Updated ${escapeHtml(post.updatedAt)}</span></div>
  <h1>${escapeHtml(post.title)}</h1>
  <div class="sub">${escapeHtml(post.subtitle)}</div>
  <div class="author">${escapeHtml(post.author)}</div>
  ${storyToHtml(post.content)}
</main></body></html>`;
    const page = window.open("", "_blank");
    if (page) {
      page.document.write(html);
      page.document.close();
    }
  }

  return (
    <div className="preview-backdrop" role="dialog" aria-modal="true" aria-label="Blog preview">
      <article className="preview-modal">
        <header className="preview-toolbar">
          <div className="brand compact">
            <span className="brand-mark"><BookOpen size={18} /></span>
            <div>
              <strong>Your Blog!</strong>
              <span>Preview</span>
            </div>
          </div>
          <div className="preview-actions">
            <button type="button" onClick={openInNewTab}>
              <ExternalLink size={16} />
              New tab
            </button>
            <button type="button" onClick={() => onEdit(post)}>
              <Edit3 size={16} />
              Edit
            </button>
            <button className="icon-button" type="button" title="Close preview" onClick={onClose}>
              <X size={19} />
            </button>
          </div>
        </header>
        <BlogDetail post={post} onEdit={onEdit} />
      </article>
    </div>
  );
}
