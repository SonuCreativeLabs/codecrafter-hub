import { Timestamp } from "firebase/firestore";
import { NotificationItem } from "./NotificationItem";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  message: string;
  timestamp: Timestamp;
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  return (
    <DropdownMenuContent className="w-80">
      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className="max-h-[300px] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground p-2">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              {...notification}
              onMarkAsRead={onMarkAsRead}
            />
          ))
        )}
      </div>
    </DropdownMenuContent>
  );
}