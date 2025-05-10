"use client";

import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value?: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const { theme } = useTheme();
  console.log("Theme: ", theme);
  return (
    <div data-color-mode={`${theme}`}>
      <div className="wmde-markdown-var"> </div>
      <MDEditor
        value={value}
        onChange={onChange}
        height={"100%"}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        visibleDragbar={false}
      />
    </div>
  );
}
