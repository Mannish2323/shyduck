"use client";

import React from "react";
import Link from "next/link";
import { 
  Users, 
  BookOpen, 
  Eye, 
  AlertOctagon, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { ADMIN_REPORTS, ADMIN_AUDIT_LOGS } from "@/lib/mock-data";

export default function AdminOverviewPage() {
  const { stories } = useShyduck();
  const pendingReports = ADMIN_REPORTS.filter((r) => r.status === "Pending");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[#fbf7ef]">
          System Overview
        </h1>
        <p className="text-xs text-[#8c91a8]">
          Real-time metrics, content activity, and active moderation alerts.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Total Stories</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#fbf7ef]">
            {stories.length}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            All systems normal
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Total Reads</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#fbf7ef]">
            1,420,800
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            +12% vs last month
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Active Creators</span>
            <Users className="w-4 h-4 text-[#e9b65a]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#fbf7ef]">
            284
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            +18 joined this week
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Pending Reports</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#fbf7ef]">
            {pendingReports.length}
          </div>
          <span className="text-[10px] text-rose-400 font-semibold">
            Requires review
          </span>
        </div>
      </div>

      {/* Quick Access Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Moderation Alert Card */}
        <div className="p-6 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <AlertOctagon className="w-4 h-4" />
              <span>Moderation Action Required</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
              {pendingReports.length} Flagged User Reports
            </h3>
            <p className="text-xs text-[#8c91a8] leading-relaxed">
              Review flagged comments and chapter issues to ensure community guidelines are strictly upheld.
            </p>
          </div>

          <Link
            href="/admin/reports"
            className="button button-primary px-4 py-2.5 text-xs font-semibold flex items-center justify-center space-x-1.5 self-start"
          >
            <span>Open Moderation Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Homepage Control Card */}
        <div className="p-6 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#e9b65a]">
              <Sparkles className="w-4 h-4" />
              <span>Editorial Spotlight</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
              Curate Featured Masterpieces
            </h3>
            <p className="text-xs text-[#8c91a8] leading-relaxed">
              Configure homepage hero stories, seasonal genre themes, and promotional broadcast ribbons.
            </p>
          </div>

          <Link
            href="/admin/featured"
            className="button button-secondary px-4 py-2.5 text-xs font-semibold flex items-center justify-center space-x-1.5 self-start"
          >
            <span>Manage Homepage Sections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Recent Audit Log Preview */}
      <div className="p-6 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-4">
        <div className="flex items-center justify-between border-b border-[#1c2035] pb-3">
          <h3 className="font-serif font-bold text-base text-[#fbf7ef] flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#e9b65a]" />
            <span>Recent Platform Audit Events</span>
          </h3>
          <Link href="/admin/audit" className="text-xs text-[#e9b65a] hover:underline">
            View full log →
          </Link>
        </div>

        <div className="space-y-3 text-xs">
          {ADMIN_AUDIT_LOGS.slice(0, 3).map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-[#131526] border border-[#20243b] flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-[#fbf7ef]">{log.adminName}</span>
                <span className="text-[#8c91a8]"> executed </span>
                <span className="font-semibold text-[#e9b65a]">{log.action}</span>
                <span className="text-[#8c91a8]"> on {log.target}</span>
              </div>
              <span className="text-[10px] text-[#6b7086]">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
