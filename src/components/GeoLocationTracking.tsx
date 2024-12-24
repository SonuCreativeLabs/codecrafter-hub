import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Filter, Download } from "lucide-react";

interface RedemptionLocation {
  id: string;
  lat: number;
  lng: number;
  agentId: string;
  agentName: string;
  code: string;
  timestamp: Date;
  region: string;
}

const mockLocations: RedemptionLocation[] = [
  {
    id: "1",
    lat: 19.0760,
    lng: 72.8777,
    agentId: "A123",
    agentName: "John Doe",
    code: "PROMO123",
    timestamp: new Date(),
    region: "Mumbai"
  },
  // Add more mock data as needed
];

export function GeoLocationTracking() {
  const [locations] = useState<RedemptionLocation[]>(mockLocations);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const initMap = () => {
    // Initialize map using a library like Leaflet or Google Maps
    // This is a placeholder for the actual implementation
    console.log("Map initialized");
  };

  const filterLocations = () => {
    return locations.filter(location => {
      const matchesRegion = selectedRegion === "all" || location.region === selectedRegion;
      const matchesAgent = selectedAgent === "all" || location.agentId === selectedAgent;
      const matchesDate = !dateRange.from || !dateRange.to || 
        (location.timestamp >= dateRange.from && location.timestamp <= dateRange.to);
      
      return matchesRegion && matchesAgent && matchesDate;
    });
  };

  const exportData = () => {
    const filteredData = filterLocations();
    const csvContent = [
      ["Date", "Agent", "Code", "Region", "Latitude", "Longitude"],
      ...filteredData.map(loc => [
        loc.timestamp.toISOString(),
        loc.agentName,
        loc.code,
        loc.region,
        loc.lat,
        loc.lng
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `location-data-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Geo-Location Tracking</h2>
          <Button
            variant="outline"
            onClick={exportData}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger>
              <SelectValue placeholder="Select Agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="A123">John Doe</SelectItem>
              <SelectItem value="A124">Jane Smith</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange
            selected={dateRange}
            onSelect={setDateRange}
          />

          <Button className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Apply Filters
          </Button>
        </div>

        <div className="bg-gray-100 rounded-lg h-[500px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p>Map will be displayed here</p>
            <p className="text-sm">Integration with map service required</p>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Note: This is a placeholder for the map component.</p>
          <p>To implement the actual map:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Integrate with Google Maps or Leaflet</li>
            <li>Add markers for each redemption location</li>
            <li>Implement clustering for dense areas</li>
            <li>Add click handlers for marker details</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
