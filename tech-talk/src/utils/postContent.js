// Utilities for post content validation and sanitization

// Sanitize HTML: remove <script> and inline event handlers (on*)
export function sanitizeContent(html) {
  if (!html) return "";
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove script and style elements
    doc.querySelectorAll("script,style").forEach((el) => el.remove());

    // Remove inline event handler attributes (on*) from all elements
    const elements = doc.querySelectorAll("*");
    elements.forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
      });
    });

    // Return cleaned innerHTML of body
    return doc.body.innerHTML.trim();
  } catch (err) {
    // Fallback: strip script tags and event handlers with simple regex
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/on\w+\s*=\s*\"[^\"]*\"/gi, "")
      .replace(/on\w+\s*=\s*'[^']*'/gi, "")
      .trim();
  }
}

// Check that content has at least one non-whitespace character when stripped of HTML
export function hasNonWhitespaceContent(html) {
  if (!html) return false;
  // Remove tags
  const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
  return /\S/.test(text);
}

// Validate title and content according to FSD rules
export function validatePost({ title, content }) {
  const errors = { title: null, content: null };

  const t = (title || "").trim();
  if (!t) {
    errors.title = "Title is required.";
  } else if (t.length < 1 || t.length > 120) {
    errors.title = "Title must be between 1 and 120 characters.";
  }

  const c = content || "";
  if (!hasNonWhitespaceContent(c)) {
    errors.content = "Content cannot be empty.";
  } else {
    // Measure text length (strip HTML) for character limit
    const textOnly = c.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
    if (textOnly.length > 5000) {
      errors.content = "Content must not exceed 5000 characters.";
    }
  }

  const valid = !errors.title && !errors.content;
  return { valid, errors };
}

// Simple duplicate submission guard (in-memory). Call canSubmit() before sending.
let _lastSubmitAt = 0;
export function canSubmit() {
  const now = Date.now();
  if (now - _lastSubmitAt < 3000) return false;
  _lastSubmitAt = now;
  return true;
}
