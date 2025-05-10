"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  LinkIcon,
  ImageIcon,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  console.log(
    JSON.stringify({
      va: value,
    })
  );
  // Handle markdown formatting
  const insertMarkdown = (before: string, after = "") => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newText);

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus();
      const newCursorPos =
        selectedText.length > 0
          ? start + before.length + selectedText.length + after.length
          : start + before.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatActions = [
    {
      icon: <Bold size={18} />,
      title: "Bold",
      action: () => insertMarkdown("**", "**"),
    },
    {
      icon: <Italic size={18} />,
      title: "Italic",
      action: () => insertMarkdown("*", "*"),
    },
    {
      icon: <Heading1 size={18} />,
      title: "Heading 1",
      action: () => insertMarkdown("# "),
    },
    {
      icon: <Heading2 size={18} />,
      title: "Heading 2",
      action: () => insertMarkdown("## "),
    },
    {
      icon: <Heading3 size={18} />,
      title: "Heading 3",
      action: () => insertMarkdown("### "),
    },
    {
      icon: <List size={18} />,
      title: "Bullet List",
      action: () => insertMarkdown("- "),
    },
    {
      icon: <ListOrdered size={18} />,
      title: "Numbered List",
      action: () => insertMarkdown("1. "),
    },
    {
      icon: <Code size={18} />,
      title: "Code Block",
      action: () => insertMarkdown("```\n", "\n```"),
    },
    {
      icon: <Quote size={18} />,
      title: "Quote",
      action: () => insertMarkdown("> "),
    },
    {
      icon: <LinkIcon size={18} />,
      title: "Link",
      action: () => insertMarkdown("[", "](url)"),
    },
    {
      icon: <ImageIcon size={18} />,
      title: "Image",
      action: () => insertMarkdown("<img src='", "' alt='alt text' />"),
    },
  ];

  // Handle tab key to insert spaces instead of changing focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newText = value.substring(0, start) + "  " + value.substring(end);

      onChange(newText);

      // Set cursor position after the tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }

    if (e.key === "Enter") {
      // Let the default behavior happen but ensure proper resizing afterward
      setTimeout(() => {
        if (textareaRef.current) {
          const newHeight = Math.max(
            300,
            textareaRef.current.scrollHeight + 10
          );
          textareaRef.current.style.height = `${newHeight}px`;
        }
      }, 0);
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto";

      // Set the height to scrollHeight + some padding to ensure no clipping
      const newHeight = Math.max(300, textareaRef.current.scrollHeight + 10);
      textareaRef.current.style.height = `${newHeight}px`;

      // Ensure cursor visibility by scrolling if needed
      const cursorPosition = textareaRef.current.selectionStart;
      const lineHeight = Number.parseInt(
        getComputedStyle(textareaRef.current).lineHeight
      );
      const approximateLineNumber = value
        .substring(0, cursorPosition)
        .split("\n").length;
      const approximatePosition = approximateLineNumber * lineHeight;

      if (approximatePosition > textareaRef.current.clientHeight) {
        textareaRef.current.scrollTop =
          approximatePosition - textareaRef.current.clientHeight / 2;
      }
    }
  }, [value]);

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <div className="text-xs text-muted-foreground">
            Markdown supported
          </div>
        </div>

        <TabsContent value="write" className="p-0">
          <div className="border-b p-2 flex flex-wrap gap-1 bg-muted/30">
            {formatActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={action.action}
                title={action.title}
                className="h-8 w-8 p-0"
              >
                {action.icon}
                <span className="sr-only">{action.title}</span>
              </Button>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your content here using Markdown..."
            className="w-full min-h-[300px] p-4 focus:outline-none focus:ring-0 resize-none font-mono text-sm"
            style={{
              minHeight: "300px",
              height: "auto",
              whiteSpace: "pre-wrap",
              overflowY: "auto",
              lineHeight: "1.5",
            }}
          />
        </TabsContent>

        <TabsContent
          value="preview"
          className="p-4 min-h-[300px] overflow-auto"
        >
          {value ? (
            <div className="prose dark:prose-invert max-w-none">
              <MarkdownRenderer content={value} />
            </div>
          ) : (
            <div className="text-muted-foreground italic">
              Nothing to preview
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
