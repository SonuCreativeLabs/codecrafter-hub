import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase-config";
import { collection, query, where, onSnapshot, updateDoc, doc, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  timestamp: Timestamp;
  targetUserId: string;
}

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("targetUserId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs: Notification[] = [];
      snapshot.forEach((doc) => {
        notifs.push({ id: doc.id, ...doc.data() as Omit<Notification, 'id'> });
      });
      setNotifications(notifs.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds));
      setUnreadCount(notifs.filter(n => !n.read).length);

      // Show toast for new unread notifications
      const newUnread = notifs.filter(n => !n.read);
      if (newUnread.length > 0) {
        toast({
          title: "New Notification",
          description: newUnread[0].message,
        });
      }
    });

    return () => unsubscribe();
  }, [userId, toast]);

  const markAsRead = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, {
        read: true
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px] max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex flex-col items-start p-3 ${!notification.read ? 'bg-accent' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <span className="font-medium">{notification.message}</span>
              <span className="text-xs text-muted-foreground">
                {notification.timestamp.toDate().toLocaleString()}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}