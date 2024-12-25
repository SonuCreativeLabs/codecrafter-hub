import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    onChange(newColor);
  };

  const presetColors = [
    "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff",
    "#ffff00", "#00ffff", "#ff00ff", "#c0c0c0", "#808080",
    "#800000", "#808000", "#008000", "#800080", "#008080",
    "#000080", "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4",
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
          style={{ backgroundColor: currentColor }}
        >
          <div className="w-full flex items-center gap-2">
            <div
              className="h-4 w-4 rounded border border-gray-200"
              style={{ backgroundColor: currentColor }}
            />
            <span style={{ color: getContrastColor(currentColor) }}>
              {currentColor}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div>
            <Input
              ref={inputRef}
              type="color"
              value={currentColor}
              onChange={handleChange}
              className="h-32 p-0 border-0"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className="w-8 h-8 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  setCurrentColor(presetColor);
                  onChange(presetColor);
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={currentColor}
              onChange={(e) => {
                setCurrentColor(e.target.value);
                onChange(e.target.value);
              }}
              className="flex-1"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Helper function to determine text color based on background
function getContrastColor(hexcolor: string) {
  // Convert hex to RGB
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? "#000000" : "#ffffff";
}
