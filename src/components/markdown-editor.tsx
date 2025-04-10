"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write");

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
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your content here using Markdown..."
            className="min-h-[300px] border-0 focus-visible:ring-0 rounded-none resize-none"
          />
        </TabsContent>
        <TabsContent value="preview" className="p-4 min-h-[300px]">
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
