import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileSpreadsheet, AlertCircle } from "lucide-react";
import { read, utils, writeFile } from 'xlsx';

interface ValidationError {
  row: number;
  column: string;
  message: string;
}

export function BulkDataManagement() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataType, setDataType] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const { toast } = useToast();

  const validateData = (data: any[]): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    data.forEach((row, index) => {
      switch (dataType) {
        case "promo-codes":
          if (!row.code || !row.value || !row.expiryDate) {
            errors.push({
              row: index + 1,
              column: "Required Fields",
              message: "Missing required fields: code, value, or expiry date"
            });
          }
          break;
        case "agent-details":
          if (!row.name || !row.email || !row.phone) {
            errors.push({
              row: index + 1,
              column: "Required Fields",
              message: "Missing required fields: name, email, or phone"
            });
          }
          if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
            errors.push({
              row: index + 1,
              column: "Email",
              message: "Invalid email format"
            });
          }
          break;
        case "redemption-logs":
          if (!row.code || !row.agentId || !row.timestamp) {
            errors.push({
              row: index + 1,
              column: "Required Fields",
              message: "Missing required fields: code, agentId, or timestamp"
            });
          }
          break;
      }
    });

    return errors;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrors([]);
    }
  };

  const processFile = async () => {
    if (!selectedFile || !dataType) {
      toast({
        title: "Error",
        description: "Please select a file and data type",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(sheet);

        // Validate data
        const validationErrors = validateData(jsonData);
        if (validationErrors.length > 0) {
          setErrors(validationErrors);
          toast({
            title: "Validation Failed",
            description: "Please check the error list below",
            variant: "destructive",
          });
          setUploading(false);
          return;
        }

        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        toast({
          title: "Success",
          description: "Data uploaded successfully",
        });
      };

      reader.readAsBinaryString(selectedFile);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const downloadTemplate = () => {
    let template;
    switch (dataType) {
      case "promo-codes":
        template = [{ code: "", value: "", expiryDate: "", description: "" }];
        break;
      case "agent-details":
        template = [{ name: "", email: "", phone: "", address: "" }];
        break;
      case "redemption-logs":
        template = [{ code: "", agentId: "", timestamp: "", status: "" }];
        break;
      default:
        return;
    }

    const ws = utils.json_to_sheet(template);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Template");
    writeFile(wb, `${dataType}-template.xlsx`);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Bulk Data Management</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select value={dataType} onValueChange={setDataType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="promo-codes">Promo Codes</SelectItem>
                <SelectItem value="agent-details">Agent Details</SelectItem>
                <SelectItem value="redemption-logs">Redemption Logs</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={downloadTemplate}
              disabled={!dataType}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Download Template
            </Button>
          </div>

          <div className="flex gap-4">
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="flex-1"
            />
            <Button
              onClick={processFile}
              disabled={!selectedFile || !dataType || uploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Uploading... {progress}%
              </p>
            </div>
          )}

          {errors.length > 0 && (
            <div className="mt-4 p-4 border rounded-lg bg-red-50">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <AlertCircle className="h-4 w-4" />
                <h3 className="font-semibold">Validation Errors</h3>
              </div>
              <ul className="space-y-2 text-sm text-red-600">
                {errors.map((error, index) => (
                  <li key={index}>
                    Row {error.row}: {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
