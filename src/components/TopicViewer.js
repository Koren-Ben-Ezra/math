import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css'; // KaTeX styling

function TopicViewer({ grade, topicFile }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!grade || !topicFile) {
      setContent('');
      return;
    }
    const path = `/content/${grade}/${topicFile}`;
    fetch(path)
      .then((res) => res.text())
      .then((text) => {
        // Convert Markdown to HTML
        const html = marked.parse(text);
        setContent(html);
      })
      .catch((err) => {
        console.error(`Error fetching ${path}:`, err);
        setContent('<p>Content not found.</p>');
      });
  }, [grade, topicFile]);

  useEffect(() => {
    // Once content is in the DOM, run KaTeX auto-render
    const container = document.getElementById('topic-content');
    if (!container) return;

    renderMathInElement(container, {
      delimiters: [
        { left: '$$', right: '$$', display: true }, 
        { left: '$', right: '$', display: false },
      ],
    });

    // Force KaTeX to be LTR, so "x=3" remains "x=3"
    const katexElems = container.querySelectorAll('.katex, .katex-display, .katex-html');
    katexElems.forEach((el) => {
      el.style.direction = 'ltr';
      el.style.unicodeBidi = 'bidi-override';
      el.style.textAlign = 'left';
    });
  }, [content]);

  return (
    <div id="topic-content-wrapper" className="topic-viewer-wrapper">
      <div
        id="topic-content"
        className="topic-viewer"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default TopicViewer;
