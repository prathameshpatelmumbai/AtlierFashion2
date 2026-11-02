"use client";

import React from "react";
import { useStudio } from "@/context/StudioContext";
import { 
  X, 
  Bell, 
  CheckCheck, 
  Scissors, 
  Truck, 
  Sparkles, 
  Clock,
  Layers
} from "lucide-react";

export const CustomerNotificationsModal: React.FC = () => {
  const { 
    customerNotificationsOpen, 
    setCustomerNotificationsOpen, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    customerNotificationCount
  } = useStudio();

  if (!customerNotificationsOpen) return null;

  // Filter only notifications destined for customer
  const customerNotifications = notifications.filter((n) => n.audience === "customer");

  const getNotificationIcon = (category: string) => {
    if (category.toLowerCase().includes("custom") || category.toLowerCase().includes("quotation")) {
      return <Scissors className="w-4 h-4 text-[#542333]" />;
    }
    if (category.toLowerCase().includes("courier") || category.toLowerCase().includes("shipped") || category.toLowerCase().includes("order")) {
      return <Truck className="w-4 h-4 text-emerald-800" />;
    }
    return <Sparkles className="w-4 h-4 text-[#B77A68]" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FBF7F1] w-full max-w-lg rounded-3xl border border-[#E4D5C5] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E4D5C5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#542333]" />
            <h3 className="font-serif text-lg text-[#21171F]">Atelier Notifications</h3>
            {customerNotificationCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#542333] text-white">
                {customerNotificationCount} new
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {customerNotificationCount > 0 && (
              <button
                onClick={() => markAllNotificationsAsRead("customer")}
                className="text-[11px] text-[#542333] hover:underline font-medium flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
            )}
            <button
              onClick={() => setCustomerNotificationsOpen(false)}
              className="p-1 rounded-full text-[#8F8178] hover:text-[#21171F]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {customerNotifications.length === 0 ? (
            <div className="text-center py-16 text-xs text-[#8F8178]">
              <Layers className="w-8 h-8 mx-auto mb-2 text-[#E4D5C5]" />
              No notifications yet. You will receive updates on custom inquiries and shipments here.
            </div>
          ) : (
            customerNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  !notif.read
                    ? "bg-white border-[#B77A68]/50 shadow-xs"
                    : "bg-white/60 border-[#E4D5C5] opacity-75"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#FBF7F1] border border-[#E4D5C5] flex items-center justify-center shrink-0 mt-0.5">
                  {getNotificationIcon(notif.category)}
                </div>

                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-[#21171F] font-sans">
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#542333]"></span>
                    )}
                  </div>
                  <p className="text-xs text-[#8F8178] leading-relaxed">
                    {notif.shortDescription}
                  </p>
                  <div className="text-[10px] text-[#8F8178] flex items-center gap-1 pt-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{notif.timestamp}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
