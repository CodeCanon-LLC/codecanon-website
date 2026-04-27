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
import { type Layer } from "@codecanon/waraq/lib";

const initialLayers: Layer[] = [
  {
    id: "codecanon-logo-initial",
    type: "image",
    name: "Code Canon Logo",
    value: "/assets/light.png",
    parentStyle: {},
    contentStyle: {},
    cssVars: {
      "--width": "720px",
      "--height": "960px",
      "--object-fit": "contain",
    },
    transform: {
      translate: [48, 48],
      rotate: 0,
      scale: [1, 1],
    },
  },
];

export default function WaraqDemo() {
  return (
    <Waraq className="size-full" initialLayers={initialLayers}>
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

      <WaraqPanel position="left-start">
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

      <WaraqPanel position="right-start">
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
