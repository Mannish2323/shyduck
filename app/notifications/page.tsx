"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  CheckCheck, 
  BookOpen, 
  UserPlus, 
  MessageSquare, 
  Award, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function NotificationsPage() {
  const { 
    notifications, 
    unreadNotificationsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    addToast 
  } = useShyduck();

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "unread") return !item.read;
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "chapter":
        return <BookOpen className="w-4 h-4 text-[#e9b65a]" />;
      case "follower":
        return <UserPlus className="w-4 h-4 text-emerald-400" />;
      case "comment":
        return <MessageSquare className="w-4 h-4 text-sky-400" />;
      case "milestone":
        return <Award className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="w-full min-h-screen py-10 shell max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
            <Bell className="w-3.5 h-3.5" />
            <span>Updates & Milestones</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#fbf7ef] tracking-tight">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-[#8c91a8]">
            Stay updated with new chapters, community replies, and author announcements.
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={() => {
              markAllNotificationsAsRead();
              addToast("All marked as read", "Your notification feed is cleared.", "info");
            }}
            className="button button-secondary px-4 py-2 text-xs font-semibold flex items-center space-x-2 self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4 text-[#e9b65a]" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-3 border-b border-[#1f2338] pb-1">
        <button
          onClick={() => setFilter("all")}
          className={`pb-2.5 text-xs sm:text-sm font-semibold transition-all relative ${
            filter === "all" ? "text-[#e9b65a]" : "text-[#7f849c] hover:text-white"
          }`}
        >
          All Notifications ({notifications.length})
          {filter === "all" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a]" />
          )}
        </button>

        <button
          onClick={() => setFilter("unread")}
          className={`pb-2.5 text-xs sm:text-sm font-semibold transition-all relative flex items-center space-x-1.5 ${
            filter === "unread" ? "text-[#e9b65a]" : "text-[#7f849c] hover:text-white"
          }`}
        >
          <span>Unread</span>
          {unreadNotificationsCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#e9b65a] text-[#0a0b14] font-bold">
              {unreadNotificationsCount}
            </span>
          )}
          {filter === "unread" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a]" />
          )}
        </button>
      </div>

      {/* Notifications Stream */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                notif.read
                  ? "bg-[#0d0f1e] border-[#1f2338] opacity-75 hover:opacity-100"
                  : "bg-[#121428] border-[#e9b65a]/40 shadow-sm"
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className="p-2 rounded-xl bg-[#181a2e] border border-[#272b45] shrink-0 mt-0.5">
                  {getNotificationIcon(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#fbf7ef]">
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#e9b65a] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#8e94ad] leading-relaxed">
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-[#696e83] block">
                    {notif.createdAt}
                  </span>
                </div>
              </div>

              {notif.link && (
                <Link
                  href={notif.link}
                  className="p-2 rounded-xl text-[#7f849c] hover:text-[#e9b65a] hover:bg-[#1b1e33] transition-colors shrink-0"
                  title="View Details"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0e101f] border border-[#22263d] rounded-2xl space-y-4">
          <ShyduckMascot mood="peaceful" size={72} />
          <div className="space-y-1 max-w-sm">
            <h3 className="text-xl font-serif font-bold text-[#fbf7ef]">
              All caught up!
            </h3>
            <p className="text-xs text-[#8c91a8]">
              No unread notifications at the moment. As authors publish chapters, you will see alerts here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
