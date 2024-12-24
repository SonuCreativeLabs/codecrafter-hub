import { Timestamp } from "firebase/firestore";
import { NotificationItem } from "./NotificationItem";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  message: string;
  timestamp: Timestamp;
  read: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  return (
    <DropdownMenuContent className="w-80 p-0">
      <DropdownMenuLabel className="p-4 text-lg font-semibold">
        Notifications
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <ScrollArea className="h-[300px]">
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4 text-center">
            No notifications
          </p>
        ) : (
          <div className="space-y-1">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </DropdownMenuContent>
  );
}