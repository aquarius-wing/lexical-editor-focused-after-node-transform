import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { TextNode } from "lexical";
import { useEffect } from "react";

export function TestPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerNodeTransform(TextNode, (textNode) => {
      console.log("node transformed", textNode);
    });
  }, [editor]);

  return null;
}

// The editor is focused on mount when `value` is a markdown heading
// and registerNodeTransform has been used.

let value = "# test"; // editor focused
// value = "test"; // editor not focused

const editorState = () => $convertFromMarkdownString(value, TRANSFORMERS);

const editorConfig = {
  onError(error) {
    throw error;
  },
  nodes: [HeadingNode],
  editorState
};

export default function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <TestPlugin />
      </div>
    </LexicalComposer>
  );
}
