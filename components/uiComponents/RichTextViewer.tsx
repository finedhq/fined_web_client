'use client';

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface ArticleViewerProps {
  content: string; // The HTML string from your database
}

export const RichTextViewer = ({ content }: ArticleViewerProps) => {
  // 1. Sanitize the HTML to prevent XSS attacks
  // const cleanContent = DOMPurify.sanitize(content);

  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    // Only run this in the browser (client-side)
    if (typeof window !== 'undefined') {
      // DOMPurify is sometimes a factory function depending on the version/bundler
      // We try to access it directly, or initialize it
      const sanitizer = DOMPurify(window);
      setSanitizedContent(sanitizer.sanitize(content));
    }
  }, [content]);

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
    />
  );
};