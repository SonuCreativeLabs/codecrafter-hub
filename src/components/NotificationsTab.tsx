import React from "react";
import { Bell, CheckCircle2, AlertCircle, Clock, ArrowUpRight, TrendingUp, UserCheck, MapPin, Star, ShieldAlert, Award, Target, Calendar, FileCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Mock notification data with role-specific notifications
const mockNotifications = {
  admin: [
    {
      id: 1,
      type: "alert",
      title: "System Performance Alert",
      message: "Multiple agents reporting slow response times in the promo code generation system. Technical team notified.",
      timestamp: "10 minutes ago",
      status: "unread",
      priority: "high",
      icon: AlertCircle
    },
    {
      id: 2,
      type: "success",
      title: "Monthly Target Overview",
      message: "Company-wide target achievement at 115%. Top performing region: Mumbai Central with 128% target completion.",
      timestamp: "1 hour ago",
      status: "unread",
      priority: "medium",
      icon: Target
    },
    {
      id: 3,
      type: "info",
      title: "New Agent Onboarding",
      message: "5 new agents completed onboarding process. Pending approval for territory allocation.",
      timestamp: "2 hours ago",
      status: "read",
      priority: "medium",
      icon: UserCheck
    },
    {
      id: 4,
      type: "alert",
      title: "Compliance Update Required",
      message: "New regulatory guidelines released. Agent documentation needs to be updated within 7 days.",
      timestamp: "3 hours ago",
      status: "unread",
      priority: "high",
      icon: FileCheck
    },
    {
      id: 5,
      type: "success",
      title: "Campaign Performance",
      message: "Diwali Special Campaign exceeding expectations. 75% of allocated promo codes redeemed.",
      timestamp: "4 hours ago",
      status: "read",
      priority: "medium",
      icon: Award
    }
  ],
  agent: [
    {
      id: 1,
      type: "alert",
      title: "Daily Target Alert",
      message: "You've achieved 45% of your daily target. 6 hours remaining to meet the goal.",
      timestamp: "10 minutes ago",
      status: "unread",
      priority: "high",
      icon: Target
    },
    {
      id: 2,
      type: "success",
      title: "Commission Milestone",
      message: "Congratulations! You've earned ₹5,000 bonus for exceeding weekly targets.",
      timestamp: "1 hour ago",
      status: "unread",
      priority: "medium",
      icon: Award
    },
    {
      id: 3,
      type: "info",
      title: "Training Schedule",
      message: "Mandatory product training session scheduled for tomorrow at 10 AM.",
      timestamp: "2 hours ago",
      status: "read",
      priority: "medium",
      icon: Calendar
    },
    {
      id: 4,
      type: "alert",
      title: "Document Verification",
      message: "3 customer KYC documents pending verification. Please complete within 24 hours.",
      timestamp: "3 hours ago",
      status: "unread",
      priority: "high",
      icon: FileCheck
    },
    {
      id: 5,
      type: "success",
      title: "Customer Feedback",
      message: "You received a 5-star rating from your last 3 customers. Keep up the good work!",
      timestamp: "4 hours ago",
      status: "read",
      priority: "medium",
      icon: Star
    }
  ]
};

interface NotificationsTabProps {
  userRole: 'admin' | 'agent';
}

export function NotificationsTab({ userRole }: NotificationsTabProps) {
  const notifications = mockNotifications[userRole];
  const unreadCount = notifications.filter(n => n.status === "unread").length;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
        {unreadCount > 0 && (
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {unreadCount} new
          </span>
        )}
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer",
                  notification.status === "unread" && "bg-muted/50 dark:bg-muted/10 border-l-4 border-l-primary"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Icon className={cn(
                      "h-5 w-5",
                      {
                        "text-destructive": notification.type === "alert",
                        "text-green-500": notification.type === "success",
                        "text-blue-500": notification.type === "info"
                      }
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            {
                              "bg-red-100 text-red-700": notification.priority === "high",
                              "bg-yellow-100 text-yellow-700": notification.priority === "medium",
                              "bg-green-100 text-green-700": notification.priority === "low"
                            }
                          )}
                        >
                          {notification.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
