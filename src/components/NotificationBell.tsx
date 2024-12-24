import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, updateDoc, doc, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { NotificationList } from "./notifications/NotificationList";

interface Notification {
  id: string;
  message: string;
  timestamp: Timestamp;
  read: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs: Notification[] = [];
      snapshot.forEach((doc) => {
        notifs.push({ id: doc.id, ...doc.data() } as Notification);
      });
      setNotifications(notifs.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds));
    });

    return () => unsubscribe();
  }, [userId]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, {
        read: true
      });
      toast({
        description: "Notification marked as read",
        className: "bg-green-50 border-green-200"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to mark notification as read"
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 animate-pulse"
            >
              {unreadCount}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      <NotificationList 
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </DropdownMenu>
  );
}