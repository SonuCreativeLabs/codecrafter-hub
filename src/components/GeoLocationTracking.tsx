import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button } from "@/components/ui/button";

interface DateRange {
  from: Date;
  to: Date;
}

export function GeoLocationTracking() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  const locations = [
    { id: 1, position: [51.505, -0.09], name: "Location 1" },
    { id: 2, position: [51.51, -0.1], name: "Location 2" },
    { id: 3, position: [51.51, -0.12], name: "Location 3" },
  ];

  return (
    <div className="w-full h-[400px]">
      <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map(location => (
          <Marker key={location.id} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="mt-4">
        <Button onClick={() => handleDateRangeChange({ from: new Date(), to: new Date() })}>
          Reset Date Range
        </Button>
      </div>
    </div>
  );
}
