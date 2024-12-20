import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload, FileDownload } from "lucide-react";

export const DataImportExport = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Here you would implement the actual file processing
      // For now, we'll just simulate a delay
      setTimeout(() => {
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleExport = () => {
    // Implement export functionality here
    console.log("Exporting data...");
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Import/Export Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Import Data</h3>
          <p className="text-sm text-muted-foreground">
            Upload an Excel file (.xlsx) containing promo codes, agents, or redemption data.
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              <FileUpload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload File"}
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Export Data</h3>
          <p className="text-sm text-muted-foreground">
            Download your data in Excel format for backup or analysis.
          </p>
          <Button onClick={handleExport}>
            <FileDownload className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        </div>
      </div>
    </Card>
  );
};