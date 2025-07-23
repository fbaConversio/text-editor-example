import { INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
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

const BLOCK_FORMAT_VALUE = "bullet";

export function FormatBulletedList() {
  const { activeEditor, blockType } = useToolbarContext();

  const formatParagraph = () => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatBulletedList = () => {
    if (blockType !== "bullet") {
      activeEditor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("!h-8 !w-8", blockType === "bullet" && "bg-secondary")}
      value={BLOCK_FORMAT_VALUE}
      onPointerDown={formatBulletedList}
    >
      {blockTypeToBlockName[BLOCK_FORMAT_VALUE].icon}
    </Button>
  );
}
