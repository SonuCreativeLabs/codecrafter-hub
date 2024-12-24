import { Timestamp } from "firebase/firestore";
import { Check, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  id: string;
  message: string;
  timestamp: Timestamp;
  read: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({ 
  id, 
  message, 
  timestamp, 
  read, 
  type = 'info',
  onMarkAsRead 
}: NotificationItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 hover:bg-accent transition-colors",
      !read && "bg-accent/50"
    )}>
      <div className="flex-shrink-0 mt-1">
        {getIcon()}
      </div>
      <div className="flex-1 space-y-1">
        <p className={cn(
          "text-sm",
          !read && "font-medium"
        )}>
          {message}
        </p>
        <p className="text-xs text-muted-foreground">
          {timestamp.toDate().toLocaleDateString()} at {timestamp.toDate().toLocaleTimeString()}
        </p>
      </div>
      {!read && (
        <Button
          variant="ghost"
          size="sm"
          className="flex-shrink-0"
          onClick={() => onMarkAsRead(id)}
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}