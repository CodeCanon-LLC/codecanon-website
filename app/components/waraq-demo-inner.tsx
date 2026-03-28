import {
  Waraq,
  WaraqBackground,
  WaraqFrame,
  WaraqKeyboardShortcuts,
  WaraqPanel,
  WaraqPane,
  WaraqPaneContent,
  WaraqPaneTitle,
  WaraqStage,
  WaraqToolbar,
  WaraqToolbarGroup,
  PaneAddLayer,
  PaneLayerTree,
  ActionToolbarTool,
  ActionToolbarHistory,
  ActionToolbarZoom,
  ActionPosition,
  ActionSize,
  ActionFill,
  ActionBorder,
  ActionCorner,
  ActionDocumentSize,
  ActionDocumentBackground,
} from "@codecanon/waraq";

export default function WaraqDemoInner() {
  return (
    <Waraq className="h-full w-full">
      <WaraqBackground variant="dots" />

      <WaraqToolbar position="top-center">
        <WaraqToolbarGroup>
          <ActionToolbarTool />
        </WaraqToolbarGroup>
        <WaraqToolbarGroup>
          <ActionToolbarHistory />
        </WaraqToolbarGroup>
        <WaraqToolbarGroup>
          <ActionToolbarZoom />
        </WaraqToolbarGroup>
        <WaraqToolbarGroup>
          <WaraqKeyboardShortcuts />
        </WaraqToolbarGroup>
      </WaraqToolbar>

      <WaraqPanel position="top-left">
        <WaraqPane>
          <WaraqPaneTitle>Add layer</WaraqPaneTitle>
          <WaraqPaneContent>
            <PaneAddLayer />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane>
          <WaraqPaneTitle>Layers</WaraqPaneTitle>
          <WaraqPaneContent>
            <PaneLayerTree />
          </WaraqPaneContent>
        </WaraqPane>
      </WaraqPanel>

      <WaraqStage>
        <WaraqFrame />
      </WaraqStage>

      <WaraqPanel position="top-right">
        <WaraqPane showFor="document">
          <WaraqPaneTitle>Document</WaraqPaneTitle>
          <WaraqPaneContent>
            <ActionDocumentSize />
            <ActionDocumentBackground />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane showFor="layer">
          <WaraqPaneTitle>Position & size</WaraqPaneTitle>
          <WaraqPaneContent>
            <ActionPosition />
            <ActionSize />
          </WaraqPaneContent>
        </WaraqPane>
        <WaraqPane showFor="layer">
          <WaraqPaneTitle>Appearance</WaraqPaneTitle>
          <WaraqPaneContent>
            <ActionFill />
            <ActionCorner />
            <ActionBorder />
          </WaraqPaneContent>
        </WaraqPane>
      </WaraqPanel>
    </Waraq>
  );
}
