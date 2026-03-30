import type { LayerType } from "@codecanon/waraq/lib";
import { IconCalendar } from "@tabler/icons-react";
import { formatDate } from "date-fns";

// TodaysDate layer type - displays formatted current date
export const TodaysDateLayerType: LayerType = {
  id: "todays-date",
  name: "Today's Date",
  icon: <IconCalendar size={16} />,
  render: (layer) => {
    const dateFormat = layer.value || "MM/dd/yyyy";
    let formattedDate: string;

    try {
      formattedDate = formatDate(Date.now(), dateFormat);
    } catch {
      formattedDate = new Date().toLocaleDateString();
    }

    return <span style={layer.contentStyle}>{formattedDate}</span>;
  },
  defaultValues: {
    value: "MM/dd/yyyy",
    cssVars: {
      "--width": "300px",
      "--height": "100px",
      "--font-size": "48px",
      "--font-weight": "600",
    },
  },
  keyboardShortcut: {
    description: "Add Today's Date",
    keys: ["D"],
    action: (context) => context.addLayer("todays-date"),
    category: "Layer",
  },
};
