import { Timestamp } from "firebase/firestore";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationItemProps {
  id: string;
  message: string;
  timestamp: Timestamp;
  read: boolean;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({ id, message, timestamp, read, onMarkAsRead }: NotificationItemProps) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-accent">
      <div className="space-y-1">
        <p className={`text-sm ${read ? 'text-muted-foreground' : 'font-medium'}`}>
          {message}
        </p>
        <p className="text-xs text-muted-foreground">
          {timestamp.toDate().toLocaleDateString()}
        </p>
      </div>
      {!read && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMarkAsRead(id)}
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}