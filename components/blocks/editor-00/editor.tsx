"use client";

import { ListItemNode, ListNode } from "@lexical/list";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  EditorState,
  ParagraphNode,
  SerializedEditorState,
  TextNode,
} from "lexical";

import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Plugins } from "./plugins";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { FloatingLinkContext } from "@/components/editor/context/floating-link-context";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    AutoLinkNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editable = true,
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
}: {
  editable?: boolean;
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  return (
    <div className="bg-background w-full overflow-hidden rounded-lg border">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editable,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <FloatingLinkContext>
            <Plugins editable={editable} />
          </FloatingLinkContext>

          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState) => {
              onChange?.(editorState);
              onSerializedChange?.(editorState.toJSON());
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
