import { createContext, useContext } from "react";

interface MarkdownState {
  isMarkdown: boolean;
}

const MarkdownContext = createContext<MarkdownState>({
  isMarkdown: false,
});

function Markdown({
  isMarkdown = true,
  children,
}: Partial<MarkdownState> & { children: React.ReactNode }) {
  const context: MarkdownState = { isMarkdown };

  return (
    <MarkdownContext.Provider value={context}>
      {children}
    </MarkdownContext.Provider>
  );
}

function useMarkdown() {
  return useContext(MarkdownContext);
}

export { Markdown, useMarkdown };
