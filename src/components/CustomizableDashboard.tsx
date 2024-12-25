import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AgentPerformanceMetrics } from "./AgentPerformanceMetrics";
import { AgentLeaderboard } from "./AgentLeaderboard";
import { RedemptionTrends } from "./RedemptionTrends";
import { ActivityLogs } from "./ActivityLogs";
import { Settings2, GripVertical } from "lucide-react";

interface Widget {
  id: string;
  title: string;
  component: React.ReactNode;
  enabled: boolean;
}

export function CustomizableDashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { 
      id: "performance", 
      title: "Agent Performance", 
      component: <AgentPerformanceMetrics />,
      enabled: true 
    },
    { 
      id: "leaderboard", 
      title: "Leaderboard", 
      component: <AgentLeaderboard />,
      enabled: true 
    },
    { 
      id: "trends", 
      title: "Redemption Trends", 
      component: <RedemptionTrends />,
      enabled: true 
    },
    { 
      id: "activity", 
      title: "Recent Activity", 
      component: <ActivityLogs />,
      enabled: true 
    }
  ]);

  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    // Load widget preferences from localStorage
    const savedWidgets = localStorage.getItem('dashboardWidgets');
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
  }, []);

  const saveWidgetPreferences = (updatedWidgets: Widget[]) => {
    localStorage.setItem('dashboardWidgets', JSON.stringify(updatedWidgets));
    setWidgets(updatedWidgets);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    saveWidgetPreferences(items);
  };

  const toggleWidget = (widgetId: string) => {
    const updatedWidgets = widgets.map(widget => 
      widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
    );
    saveWidgetPreferences(updatedWidgets);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button
          variant="outline"
          onClick={() => setIsCustomizing(!isCustomizing)}
          className="flex items-center gap-2"
        >
          <Settings2 className="h-4 w-4" />
          {isCustomizing ? "Save Layout" : "Customize Dashboard"}
        </Button>
      </div>

      {isCustomizing ? (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Widget Settings</h3>
          <div className="space-y-4">
            {widgets.map((widget) => (
              <div key={widget.id} className="flex items-center justify-between py-2">
                <Label className="flex items-center gap-2">
                  <Switch
                    checked={widget.enabled}
                    onCheckedChange={() => toggleWidget(widget.id)}
                  />
                  {widget.title}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {widgets
                .filter(widget => widget.enabled)
                .map((widget, index) => (
                  <Draggable
                    key={widget.id}
                    draggableId={widget.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <Card className="h-full">
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">{widget.title}</h3>
                              {isCustomizing && (
                                <div {...provided.dragHandleProps}>
                                  <GripVertical className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            {widget.component}
                          </div>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
