import { INSERT_ORDERED_LIST_COMMAND } from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { blockTypeToBlockName } from "@/components/editor/plugins/toolbar/block-format/block-format-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BLOCK_FORMAT_VALUE = "number";

export function FormatNumberedList() {
  const { activeEditor, blockType } = useToolbarContext();

  const formatParagraph = () => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      activeEditor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("!h-8 !w-8", blockType === "number" && "bg-secondary")}
      value={BLOCK_FORMAT_VALUE}
      onPointerDown={formatNumberedList}
    >
      {blockTypeToBlockName[BLOCK_FORMAT_VALUE].icon}
    </Button>
  );
}
