import { ISection } from "../page";
import { Button } from "@/components/ui/button";
import { Block } from "@blocknote/core";

const ReviewPage = ({
  sections,
  onEdit,
}: {
  sections: ISection[];
  onEdit: (section: ISection) => void;
}) => {
  return (
    <div className="flex flex-col max-w-3xl w-full gap-4 border h-[600px] overflow-y-auto rounded-lg shadow-sm">
      {sections.length === 0 && (
        <p className="text-gray-500">
          No sections added yet. Start by adding a section!
        </p>
      )}

      {sections.map((section) => (
        <div
          key={section.SectionId}
          className="p-2 rounded-md relative group hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-semibold text-lg border-b">
            {section.SectionTitle}
          </h3>
          <div className="mt-2 text-sm text-gray-700">
            {section.SectionContent &&
              section.SectionContent.map((block: Block, idx: number) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const contentArray = block.content as any[];
                const text =
                  contentArray?.[0]?.type === "text"
                    ? contentArray[0].text
                    : "";
                return (
                  <p key={idx} className="">
                    {text}
                  </p>
                );
              })}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onEdit(section)}
          >
            Edit
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
