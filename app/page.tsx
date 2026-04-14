"use client";
import { useState } from "react";
import NewResumePage from "./form/page";
import ReviewPage from "./review-form/page";
import { useCreateBlockNote } from "@blocknote/react";
import { Block } from "@blocknote/core";

export interface ISection {
  SectionId: string;
  SectionTitle: string;
  SectionContent: Block[];
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState<ISection[]>([]);
  const [data, setData] = useState<ISection>({
    SectionId: "",
    SectionTitle: "",
    SectionContent: [],
  });
  const editor = useCreateBlockNote();

  const handleEdit = (section: ISection) => {
    setData(section);
    if (section.SectionContent && section.SectionContent.length > 0) {
      editor.replaceBlocks(editor.document, section.SectionContent);
    } else {
      editor.replaceBlocks(editor.document, [
        { type: "paragraph", content: [] },
      ]);
    }
    setOpen(true);
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const content = editor.document;

    if (data.SectionId) {
      setSections(
        sections.map((s) =>
          s.SectionId === data.SectionId
            ? { ...data, SectionContent: content }
            : s,
        ),
      );
    } else {
      setSections([
        ...sections,
        { ...data, SectionId: Date.now().toString(), SectionContent: content },
      ]);
    }

    setData({ SectionId: "", SectionTitle: "", SectionContent: [] });
    editor.replaceBlocks(editor.document, [{ type: "paragraph", content: [] }]);
    setOpen(false);
  };

  return (
    <div className="w-full p-10">
      <NewResumePage
        open={open}
        setOpen={setOpen}
        HandleSubmit={HandleSubmit}
        data={data}
        setData={setData}
        editor={editor}
      />
      <div className="w-full pt-2">
        <ReviewPage sections={sections} onEdit={handleEdit} />
      </div>
    </div>
  );
}
