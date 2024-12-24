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
    <DropdownMenuContent 
      className="w-80 p-0 bg-white dark:bg-gray-950 shadow-lg border-2 border-gray-100 dark:border-gray-800"
      sideOffset={5}
      align="end"
    >
      <DropdownMenuLabel className="p-4 text-lg font-semibold bg-gray-50 dark:bg-gray-900">
        Notifications
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <ScrollArea className="h-[300px]">
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4 text-center bg-white dark:bg-gray-950">
            No notifications
          </p>
        ) : (
          <div className="space-y-1 bg-white dark:bg-gray-950">
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