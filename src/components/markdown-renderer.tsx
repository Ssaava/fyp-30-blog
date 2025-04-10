/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CSSProperties } from "react";
import vscDarkPlus from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { node, className, children, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          const inline = !className?.includes("language-");

          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              style={
                vscDarkPlus as { [key: string]: CSSProperties } | undefined
              }
              {...rest}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...rest}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
