// Utilities for post content validation and sanitization

// Sanitize HTML: remove script and inline event handlers
export function sanitizeContent(html) {
  if (!html) return "";
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    doc.querySelectorAll("script,style").forEach((el) => el.remove());
    doc.querySelectorAll("*").forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
      });
    });
    return doc.body.innerHTML.trim();
  } catch {
    return "";
  }
}

export function hasNonWhitespaceContent(html) {
  if (!html) return false;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return /\S/.test(doc.body.textContent || "");
}

export function validatePost({ title, content }) {
  const errors = { title: null, content: null };
  const t = (title || "").trim();
  if (!t) {
    errors.title = "Title is required.";
  } else if (t.length > 120) {
    errors.title = "Title must be between 1 and 120 characters.";
  }

  const c = content || "";
  if (!hasNonWhitespaceContent(c)) {
    errors.content = "Content cannot be empty.";
  } else {
    const doc = new DOMParser().parseFromString(c, "text/html");
    if ((doc.body.textContent || "").length > 5000) {
      errors.content = "Content must not exceed 5000 characters.";
    }
  }

  return { valid: !errors.title && !errors.content, errors };
}

let _lastSubmitAt = 0;
export function canSubmit() {
  const now = Date.now();
  if (now - _lastSubmitAt < 3000) return false;
  _lastSubmitAt = now;
  return true;
}
