"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { lessons } from "@/data/lessons";

type ModelTool = { name: string; title?: string; description: string; inputSchema: object; annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean }; execute: (input: unknown) => unknown };
declare global { interface Document { readonly modelContext?: { registerTool(tool: ModelTool, options?: { signal?: AbortSignal }): void | Promise<void> } } }

export function WebMcpTools() {
  const router = useRouter();
  useEffect(() => {
    const context = document.modelContext; if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "start_english_lesson", title: "Start English lesson",
      description: "Open one of the six Happy English learning categories.",
      inputSchema: { type: "object", properties: { category: { type: "string", enum: lessons.map((lesson) => lesson.id) } }, required: ["category"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) { const category = (input as { category?: string })?.category; if (!lessons.some((lesson) => lesson.id === category)) throw new Error("Unknown lesson category"); router.push(`/learn/${category}`); return { status: "opened", category }; },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, [router]);
  return null;
}
