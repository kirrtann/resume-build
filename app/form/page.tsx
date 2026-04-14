"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Addbox from "../addbox";

interface SectionProps {
  id: number;
  index: number;
  title: string;
  description: string;
  focused: boolean;
  canDelete: boolean;
  onFocus: () => void;
  onChange: (updated: { title?: string; description?: string }) => void;
  onDelete: () => void;
  preview?: boolean;
  onclickSection?: () => void;
  onclickQuestion?: () => void;
}

export default function SectionCard({
  index,
  title,
  description,
  focused,
  canDelete,
  onFocus,
  onChange,
  onDelete,
  preview,
}: SectionProps) {
  return (
    <>
      <div className="flex w-full gap-2 relative">
        <div
          onClick={onFocus}
          className={cn(
            "relative bg-card border w-full max-w-5xl rounded-sm px-6 pt-5 pb-6 cursor-pointer transition-all duration-200 overflow-hidden border-t-10 border-t-violet-600",
            !preview && focused ? "border-l-6 border-l-[#4285F4]" : "",
            preview ? "cursor-default mt-2 shadow-sm" : "",
          )}
        >
          <div className="flex items-center justify-between mb-3">
            {!preview && (
              <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-500 select-none">
                Section {index + 1}
              </p>
            )}

            {canDelete && !preview && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Delete section</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {preview ? (
            <div className="space-y-2">
              <h1 className="text-3xl font-normal text-black pt-2">
                {title || "Untitled form"}
              </h1>
              {description && (
                <p className="text-sm text-gray-800 pt-1">{description}</p>
              )}
            </div>
          ) : (
            <>
              <Input
                value={title}
                placeholder="Section title"
                onChange={(e) => onChange({ title: e.target.value })}
                onClick={(e) => {
                  e.stopPropagation();
                  onFocus();
                }}
                className={cn(
                  "text-[17px] font-semibold border-0 border-b rounded-none focus-visible:ring-0 px-0 bg-transparent h-9 placeholder:text-muted-foreground/40",
                )}
              />

              <Input
                value={description}
                placeholder="Section description (optional)"
                onChange={(e) => onChange({ description: e.target.value })}
                onClick={(e) => {
                  e.stopPropagation();
                  onFocus();
                }}
                className={cn(
                  "mt-3 text-sm border-0 border-b rounded-none focus-visible:ring-0 px-0 bg-transparent placeholder:text-muted-foreground/30",
                )}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
