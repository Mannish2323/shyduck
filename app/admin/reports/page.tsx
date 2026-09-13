"use client";

import React, { useState } from "react";
import { 
  AlertOctagon, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  UserX, 
  Clock, 
  Filter 
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { ADMIN_REPORTS } from "@/lib/mock-data";

export default function AdminModerationPage() {
  const { addToast } = useShyduck();
  const [reports, setReports] = useState(ADMIN_REPORTS);
  const [activeTab, setActiveTab] = useState<"Pending" | "Reviewing" | "Resolved" | "Dismissed">("Pending");

  const filteredReports = reports.filter((r) => r.status === activeTab);

  const handleAction = (reportId: string, action: "resolve" | "dismiss" | "warn" | "hide") => {
    if (action === "resolve") {
      setReports(reports.map((r) => (r.id === reportId ? { ...r, status: "Resolved" } : r)));
      addToast("Report Resolved", "Content flagged and resolution recorded.", "success");
    } else if (action === "dismiss") {
      setReports(reports.map((r) => (r.id === reportId ? { ...r, status: "Dismissed" } : r)));
      addToast("Report Dismissed", "Report closed without action.", "info");
    } else if (action === "hide") {
      setReports(reports.map((r) => (r.id === reportId ? { ...r, status: "Resolved" } : r)));
      addToast("Content Hidden", "Reported comment hidden from public feed.", "warning");
    } else if (action === "warn") {
      addToast("Warning Sent", "Author has been dispatched an official community violation warning.", "warning");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[#fbf7ef]">
          Community Moderation Queue
        </h1>
        <p className="text-xs text-[#8c91a8]">
          Review flagged content, enforce community rules, and resolve disputes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#1f2338] pb-1">
        {(["Pending", "Reviewing", "Resolved", "Dismissed"] as const).map((tab) => {
          const count = reports.filter((r) => r.status === tab).length;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center space-x-2 ${
                isActive
                  ? "bg-[#e9b65a] text-[#0a0b14] font-bold"
                  : "text-[#858aa1] hover:text-white hover:bg-[#131526]"
              }`}
            >
              <span>{tab}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-black/20 text-black" : "bg-[#181a2e] text-[#8e94ad]"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-6 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    Reason: {report.reason}
                  </span>
                  <span className="text-xs text-[#7e849e]">
                    Target: <strong className="text-[#fbf7ef]">{report.targetType}</strong> ({report.targetId})
                  </span>
                </div>

                <span className="text-xs text-[#6e738b] flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{report.createdAt}</span>
                </span>
              </div>

              {/* Flagged Content Preview */}
              <div className="p-4 rounded-xl bg-[#131526] border border-[#20243b] space-y-1">
                <span className="text-[10px] uppercase font-semibold text-[#6d7287] block">
                  Reported Content Snippet:
                </span>
                <p className="text-xs sm:text-sm text-[#e2e6f5] italic font-serif">
                  &ldquo;{report.contentSnippet}&rdquo;
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-[#7d8299]">
                <span>Reported by: <strong className="text-[#a4a9be]">@{report.reporterUsername}</strong></span>
              </div>

              {/* Action Buttons */}
              {report.status === "Pending" && (
                <div className="pt-3 border-t border-[#1a1d30] flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleAction(report.id, "hide")}
                    className="button button-secondary px-3 py-1.5 text-xs font-semibold flex items-center space-x-1.5 text-amber-300"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide Content</span>
                  </button>

                  <button
                    onClick={() => handleAction(report.id, "warn")}
                    className="button button-secondary px-3 py-1.5 text-xs font-semibold flex items-center space-x-1.5 text-rose-300"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Warn Author</span>
                  </button>

                  <button
                    onClick={() => handleAction(report.id, "resolve")}
                    className="button button-primary px-4 py-1.5 text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>

                  <button
                    onClick={() => handleAction(report.id, "dismiss")}
                    className="px-3 py-1.5 text-xs text-[#7e849e] hover:text-white"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-10 text-center bg-[#0d0f1e] border border-[#20243b] rounded-2xl text-xs text-[#8c91a8]">
            No reports under &ldquo;{activeTab}&rdquo; status.
          </div>
        )}
      </div>
    </div>
  );
}
