"use client";
import "@blocknote/mantine/style.css";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { ISection } from "../page";

export default function NewResumePage({
  open,
  setOpen,
  HandleSubmit,
  data,
  setData,
  editor,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  HandleSubmit: (e: React.FormEvent) => void;
  data: ISection;
  setData: (data: ISection) => void;
  editor: BlockNoteEditor;
}) {
  return (
    <div className="w-1/2 flex justify-center items-start mt-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-fit"
            onClick={() => {
              if (!data.SectionId) {
                setData({
                  SectionId: "",
                  SectionTitle: "",
                  SectionContent: [],
                });
                editor.replaceBlocks(editor.document, [
                  { type: "paragraph", content: [] },
                ]);
              }
            }}
          >
            Add Section
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-[500px]">
          <PopoverHeader>
            <PopoverDescription>
              <form className="" onSubmit={HandleSubmit}>
                <label className="text-sm font-bold">Section Title</label>
                <div className="border w-full mt-2 rounded-lg">
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg"
                    name="title"
                    value={data.SectionTitle}
                    onChange={(e) =>
                      setData({ ...data, SectionTitle: e.target.value })
                    }
                  />
                </div>
                <label className="text-sm font-bold mt-2 inline-block">
                  Section Content
                </label>
                <div className="border w-full mt-2 rounded-lg max-h-[300px] overflow-y-auto">
                  <BlockNoteView editor={editor} theme={"light"} />
                </div>
                <div className="flex justify-end mt-4">
                  <Button type="submit">
                    {data.SectionId ? "Update Section" : "Add Section"}
                  </Button>
                </div>
              </form>
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  );
}
