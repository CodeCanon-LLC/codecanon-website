import {
  ActionBorder,
  ActionCorner,
  ActionDocumentBackground,
  ActionDocumentSize,
  ActionFill,
  ActionPosition,
  ActionSize,
  ActionToolbarHistory,
  ActionToolbarTool,
  ActionToolbarZoom,
  PaneAddLayer,
  PaneLayerTree,
  Waraq,
  WaraqBackground,
  WaraqFrame,
  WaraqPane,
  WaraqPaneContent,
  WaraqPanel,
  WaraqPaneTitle,
  WaraqStage,
  WaraqToolbar,
  WaraqToolbarGroup,
} from "@codecanon/waraq";

export default function WaraqDemo() {
  return (
    <Waraq className="h-full w-full">
      <WaraqBackground variant="dots" />

      <WaraqToolbar>
        <WaraqToolbarGroup>
          <ActionToolbarTool />
        </WaraqToolbarGroup>
        <WaraqToolbarGroup>
          <ActionToolbarHistory />
        </WaraqToolbarGroup>
        <WaraqToolbarGroup>
          <ActionToolbarZoom />
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
