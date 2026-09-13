"use client";

import React from "react";
import { History, Shield, Clock } from "lucide-react";
import { ADMIN_AUDIT_LOGS } from "@/lib/mock-data";

export default function AdminAuditLogPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[#fbf7ef]">
          Administrator Audit Logs
        </h1>
        <p className="text-xs text-[#8c91a8]">
          Immutable activity trail recording all moderation, feature changes, and system modifications.
        </p>
      </div>

      {/* Table */}
      <div className="border border-[#21263f] rounded-2xl overflow-hidden bg-[#0d0f1e]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121426] text-[#7d8299] uppercase tracking-wider font-semibold border-b border-[#1f2338]">
              <tr>
                <th className="p-4">Admin</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target</th>
                <th className="p-4">State Transition</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1e32]">
              {ADMIN_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-[#131526] transition-colors">
                  <td className="p-4 font-semibold text-[#fbf7ef]">
                    {log.adminName}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-[#181a2e] text-[#e9b65a] font-mono border border-[#272b47]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-[#cad0e6]">
                    {log.target}
                  </td>
                  <td className="p-4 font-mono text-[11px]">
                    <span className="text-rose-400">{log.beforeState}</span>
                    <span className="text-[#64687d] mx-1.5">→</span>
                    <span className="text-emerald-400">{log.afterState}</span>
                  </td>
                  <td className="p-4 text-[#6e738b] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
