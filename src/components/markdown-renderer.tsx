/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { theme } = useTheme();
  return (
    <div data-color-mode={`${theme}`}>
      <div className="wmde-markdown-var"> </div>
      <MDEditor.Markdown source={content} className="!bg-transparent" />
    </div>
  );
}
