import { useRef, useState } from "react";
import { ChevronDown, Heading2, Image, List, Minus, Quote } from "lucide-react";
import { contentToEditorHtml, sanitizeHtml } from "../lib/html.js";
import { emptyPost } from "../lib/posts.js";
import { persistPost } from "../lib/storage.js";
import { today } from "../lib/dates.js";
import {
  MAX_IMAGE_FILE_SIZE,
  IMAGE_MAX_WIDTH,
  IMAGE_QUALITY,
} from "../lib/constants.js";
import BlogDetail from "./BlogDetail.jsx";

// Two-step writing experience: a Medium-style rich editor ("write") followed by
// a "finish" page for cover image, category, author and publishing.
export default function PostEditor({ post, onSave }) {
  const [draft, setDraft] = useState(post);
  const [coverMode, setCoverMode] = useState("link");
  const [saveMessage, setSaveMessage] = useState("");
  const [editorStep, setEditorStep] = useState("write");
  const [headingMenuOpen, setHeadingMenuOpen] = useState(false);
  const initialSnapshot = useRef(JSON.stringify(post));
  const editorRef = useRef(null);
  const storyImageRef = useRef(null);
  const coverImageRef = useRef(null);

  function update(field, value) {
    setDraft((current) => ({
      ...current,
      ...(field !== "content" && editorRef.current ? { content: editorRef.current.innerHTML } : {}),
      [field]: value,
    }));
  }

  function syncEditorContent() {
    update("content", editorRef.current?.innerHTML || "");
  }

  function goToFinish() {
    setDraft((current) => ({
      ...current,
      content: editorRef.current?.innerHTML || current.content,
    }));
    setEditorStep("finish");
  }

  function hasUnsavedChanges() {
    const latest = {
      ...draft,
      content: editorRef.current?.innerHTML || draft.content,
    };
    return JSON.stringify(latest) !== initialSnapshot.current;
  }

  function closeEditorTab() {
    if (hasUnsavedChanges()) {
      const shouldClose = window.confirm("You have unsaved changes. Close this editor tab anyway?");
      if (!shouldClose) return;
    }
    window.close();
    window.setTimeout(() => {
      window.location.href = window.location.pathname;
    }, 120);
  }

  function focusEditor() {
    editorRef.current?.focus();
  }

  function runCommand(command, value = null) {
    focusEditor();
    document.execCommand(command, false, value);
    syncEditorContent();
  }

  function handleEditorKeyDown(event) {
    const shortcut = event.ctrlKey || event.metaKey;
    if (!shortcut) return;

    const key = event.key.toLowerCase();
    if (key === "z" || key === "y") return;
    if (key === "b") {
      event.preventDefault();
      runCommand("bold");
    } else if (key === "i") {
      event.preventDefault();
      runCommand("italic");
    }
  }

  function insertHtml(html) {
    focusEditor();
    document.execCommand("insertHTML", false, sanitizeHtml(html));
    syncEditorContent();
  }

  function handleEditorPaste(event) {
    event.preventDefault();
    focusEditor();
    document.execCommand("insertText", false, event.clipboardData.getData("text/plain"));
    syncEditorContent();
  }

  // Reads an image file, resizes it down to IMAGE_MAX_WIDTH and re-encodes it as
  // a compressed JPEG data URL so it can be stored inline without bloating
  // localStorage. The result is handed back through the callback.
  function readImage(file, callback) {
    if (!file) return;
    if (!/^image\/(jpeg|jpg|png|webp)$/i.test(file.type)) {
      setSaveMessage("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_IMAGE_FILE_SIZE) {
      setSaveMessage("Image is too large. Choose an image under 6 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setSaveMessage("The image could not be read.");
    reader.onload = () => {
      const source = String(reader.result);
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, IMAGE_MAX_WIDTH / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          setSaveMessage("The image could not be prepared.");
          return;
        }
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL("image/jpeg", IMAGE_QUALITY));
        setSaveMessage("");
      };
      img.onerror = () => setSaveMessage("The image preview could not be created.");
      img.src = source;
    };
    reader.readAsDataURL(file);
  }

  function saveWithStatus(event, status) {
    event.preventDefault();
    const storyContent = editorRef.current?.innerHTML || draft.content;
    const savedPost = {
      ...draft,
      status,
      title: draft.title.trim() || "Untitled draft",
      subtitle: draft.subtitle.trim() || "No subtitle added yet.",
      content: sanitizeHtml(storyContent.trim() || "<p>Start writing your blog content here.</p>"),
      cover: draft.cover.trim() || emptyPost().cover,
    };
    try {
      const storedPost = persistPost(savedPost);
      onSave(storedPost);
      initialSnapshot.current = JSON.stringify(storedPost);
      window.history.replaceState(null, "", window.location.pathname);
      setDraft(storedPost);
      setSaveMessage(status === "Published" ? "Published successfully" : "Draft saved");
      window.setTimeout(() => {
        window.location.href = window.location.pathname;
      }, 1400);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "Unable to save this post.");
    }
  }

  function submit(event) {
    saveWithStatus(event, draft.status || "Draft");
  }

  return (
    <main className="write-page">
      <form className="editor medium-editor" onSubmit={submit}>
        <header className="write-header">
          <div>
            <strong>Your Blog!</strong>
            <span>{draft.status}</span>
          </div>
          <div className="write-header-actions">
            <button className="secondary-button compact-action" type="button" onClick={closeEditorTab}>Close tab</button>
            {editorStep === "write" && (
              <>
                <button className="secondary-button compact-action" type="button" onClick={(event) => saveWithStatus(event, "Draft")}>Save draft</button>
                <button className="secondary-button compact-action" type="button" onClick={goToFinish}>Continue</button>
              </>
            )}
            {editorStep === "finish" && (
              <button className="secondary-button compact-action" type="button" onClick={() => setEditorStep("write")}>Back</button>
            )}
            {saveMessage && <span className="save-message header-message">{saveMessage}</span>}
          </div>
        </header>

        {editorStep === "write" ? (
        <section className="editor-page">
          <textarea
            className="story-title-input"
            value={draft.title}
            onChange={(event) => update("title", event.target.value)}
            placeholder="Title"
            aria-label="Title"
            rows="2"
          />
          <textarea
            className="story-subtitle-input"
            value={draft.subtitle}
            onChange={(event) => update("subtitle", event.target.value)}
            placeholder="Tell your story in one short subtitle"
            aria-label="Subtitle"
            rows="2"
          />

          <div
            className="editor-toolbar"
            aria-label="Writing blocks"
            onMouseDown={(event) => {
              if (event.target.closest("button")) event.preventDefault();
            }}
          >
            <div
              className="heading-menu"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setHeadingMenuOpen(false);
              }}
            >
              <button
                className="heading-trigger"
                type="button"
                aria-haspopup="menu"
                aria-expanded={headingMenuOpen}
                onClick={() => setHeadingMenuOpen((open) => !open)}
              >
                <Heading2 size={17} />
                <span>H</span>
                <ChevronDown size={14} />
              </button>
              {headingMenuOpen && (
                <div className="heading-options" role="menu">
                  {[
                    ["p", "P"],
                    ["h1", "H1"],
                    ["h2", "H2"],
                    ["h3", "H3"],
                    ["h4", "H4"],
                    ["h5", "H5"],
                    ["h6", "H6"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        runCommand("formatBlock", value);
                        setHeadingMenuOpen(false);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button type="button" title="Turn current line into quote" onClick={() => runCommand("formatBlock", "blockquote")}>
              <Quote size={17} />
              Quote
            </button>
            <button type="button" title="Add bullet list" onClick={() => runCommand("insertUnorderedList")}>
              <List size={17} />
              List
            </button>
            <button type="button" title="Add divider" onClick={() => insertHtml("<hr><p><br></p>")}>
              <Minus size={17} />
              Divider
            </button>
            <button type="button" title="Upload image into story" onClick={() => storyImageRef.current?.click()}>
              <Image size={17} />
              Upload
            </button>
            <input
              ref={storyImageRef}
              className="hidden-file"
              type="file"
              accept="image/*"
              onChange={(event) => {
                readImage(event.target.files?.[0], (src) => insertHtml(`<figure><img src="${src}" alt=""><figcaption>Image caption</figcaption></figure><p><br></p>`));
                event.target.value = "";
              }}
            />
          </div>

          <label className="content-field">
            <span>Story content</span>
            <div
              ref={editorRef}
              className="story-editor"
              contentEditable
              suppressContentEditableWarning
              data-placeholder="Start writing your blog here..."
              onKeyDown={handleEditorKeyDown}
              onPaste={handleEditorPaste}
              onBlur={syncEditorContent}
              dangerouslySetInnerHTML={{ __html: contentToEditorHtml(draft.content) }}
            />
          </label>
        </section>
        ) : (
        <section className="finish-page">
          <div className="finish-details">
            <div>
              <p className="eyebrow">Final details</p>
              <h1>Ready to share?</h1>
              <p className="finish-copy">Add the details readers see before they open your story.</p>
            </div>

            <div className="form-grid settings-grid">
              <label>
                Category
                <input value={draft.category} onChange={(event) => update("category", event.target.value)} />
              </label>
              <label>
                Author
                <input value={draft.author} onChange={(event) => update("author", event.target.value)} />
              </label>
              <div className="cover-control">
                <span>Cover image</span>
                <div className="cover-preview">
                  {draft.cover ? (
                    <img src={draft.cover} alt="Cover preview" />
                  ) : (
                    <div>
                      <Image size={24} />
                      <p>Cover preview</p>
                    </div>
                  )}
                </div>
                <div className="cover-toggle">
                  <button className={coverMode === "link" ? "active" : ""} type="button" onClick={() => setCoverMode("link")}>URL</button>
                  <button className={coverMode === "upload" ? "active" : ""} type="button" onClick={() => setCoverMode("upload")}>Upload</button>
                </div>
                {coverMode === "link" ? (
                  <input value={draft.cover} onChange={(event) => update("cover", event.target.value)} />
                ) : (
                  <>
                    <button className="upload-button" type="button" onClick={() => coverImageRef.current?.click()}>Choose cover image</button>
                    <input
                      ref={coverImageRef}
                      className="hidden-file"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        readImage(event.target.files?.[0], (src) => update("cover", src));
                        event.target.value = "";
                      }}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="finish-actions">
              <button className="secondary-button draft-button" type="button" onClick={(event) => saveWithStatus(event, "Draft")}>
                Save draft
              </button>
              <button className="publish-button" type="button" onClick={(event) => saveWithStatus(event, "Published")}>
                Publish
              </button>
              {saveMessage && <span className="save-message">{saveMessage}</span>}
            </div>
          </div>

          <aside className="finish-preview" aria-label="Final blog preview">
            <p className="eyebrow">Live preview</p>
            <BlogDetail
              post={{
                ...draft,
                title: draft.title || "Untitled draft",
                subtitle: draft.subtitle || "No subtitle added yet.",
                category: draft.category || "Category",
                author: draft.author || "Author",
                cover: draft.cover || emptyPost().cover,
                updatedAt: today(),
              }}
              onEdit={() => setEditorStep("write")}
            />
          </aside>
        </section>
        )}
      </form>
    </main>
  );
}
