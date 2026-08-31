export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// The heading text comes out of the *stored* article HTML, where the rich
// text editor has already turned characters like & and ' into entities
// (e.g. "Ticket & Tour" -> "Ticket &amp; Tour"). The article body itself is
// rendered via dangerouslySetInnerHTML, so the browser decodes those back to
// plain characters automatically — but this TOC text gets rendered as plain
// JSX text ({item.text}), which does NOT decode HTML entities. Without this
// step, any heading containing "&", "'", "\"", "<", or ">" would show the
// literal entity code (e.g. "&amp;") in the "In This Guide" box instead of
// the actual character.
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

// Finds every H2/H3 in an article's HTML, assigns each a stable, unique
// slug id, and returns both a flat list (for the "In This Guide" jump-link
// box) and the same HTML with those ids injected into the actual tags so
// the links resolve. Runs fresh on every render — doesn't touch the stored
// content, so nothing about how an article is saved needs to change for
// its table of contents to work.
export function extractTableOfContents(html: string): { toc: TocItem[]; html: string } {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  const headingRe = /<h([23])((?:\s+[^>]*)?)>([\s\S]*?)<\/h\1>/gi;

  const withIds = (html || "").replace(headingRe, (match, levelStr, attrs, inner) => {
    const level: 2 | 3 = levelStr === "3" ? 3 : 2;
    const text = decodeHtmlEntities(inner.replace(/<[^>]+>/g, "").trim());
    if (!text) return match;

    let id = slugifyHeading(text) || `section-${toc.length + 1}`;
    const count = seen.get(id) || 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

    toc.push({ id, text, level });
    return `<h${level} id="${id}"${attrs || ""}>${inner}</h${level}>`;
  });

  return { toc, html: withIds };
}
