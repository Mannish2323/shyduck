"use client";

import React, { useState } from "react";
import { 
  User, 
  Settings, 
  Moon, 
  Sun, 
  BookOpen, 
  Shield, 
  Feather, 
  Check, 
  Bell, 
  Sparkles,
  LogOut
} from "lucide-react";
import { useShyduck } from "@/lib/store";

export default function SettingsPage() {
  const { 
    user, 
    loginAs, 
    logout, 
    theme, 
    toggleTheme, 
    readerSettings, 
    updateReaderSettings, 
    addToast 
  } = useShyduck();

  const [name, setName] = useState(user?.name || "Manish Kumar");
  const [username, setUsername] = useState(user?.username || "manish_writer");
  const [bio, setBio] = useState(user?.bio || "Storyteller exploring cosmic myths and subcontinent speculative fiction.");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Profile saved!", "Your public author information has been updated.", "success");
  };

  return (
    <div className="w-full min-h-screen py-10 shell max-w-3xl space-y-8">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
          <Settings className="w-3.5 h-3.5" />
          <span>Account & Preferences</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#fbf7ef] tracking-tight">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#8c91a8]">
          Manage your personal profile, reading display defaults, and active role.
        </p>
      </div>

      {/* Role Switcher Banner */}
      <div className="p-6 rounded-2xl border border-[#252a45] bg-[#0e1022] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#e9b65a] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Platform Role</span>
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#181a2e] text-[#cad0e6] font-mono border border-[#272b47]">
            Current: {user?.role.toUpperCase()}
          </span>
        </div>

        <p className="text-xs text-[#8a8fa6]">
          Switch roles to experience Shyduck Tales from different personas (Reader, Creator, Administrator).
        </p>

        <div className="grid grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => {
              loginAs("reader");
              addToast("Switched to Reader role", "Reader controls enabled.", "info");
            }}
            className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              user?.role === "reader"
                ? "bg-[#e9b65a] text-[#0a0b14] border-[#e9b65a]"
                : "bg-[#141628] text-[#8e94ad] border-[#252942] hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reader</span>
          </button>

          <button
            onClick={() => {
              loginAs("writer");
              addToast("Switched to Writer role", "Creator studio enabled.", "info");
            }}
            className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              user?.role === "writer"
                ? "bg-[#e9b65a] text-[#0a0b14] border-[#e9b65a]"
                : "bg-[#141628] text-[#8e94ad] border-[#252942] hover:text-white"
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Writer</span>
          </button>

          <button
            onClick={() => {
              loginAs("admin");
              addToast("Switched to Admin role", "Admin moderation suite unlocked.", "info");
            }}
            className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              user?.role === "admin"
                ? "bg-[#e9b65a] text-[#0a0b14] border-[#e9b65a]"
                : "bg-[#141628] text-[#8e94ad] border-[#252942] hover:text-white"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-2xl border border-[#21263e] bg-[#0d0f1e] space-y-6">
        <h3 className="font-serif font-bold text-lg text-[#fbf7ef] border-b border-[#1c2035] pb-3">
          Profile Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#131526] text-[#fbf7ef] px-3.5 py-2 rounded-xl border border-[#242944] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Handle / Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#131526] text-[#fbf7ef] px-3.5 py-2 rounded-xl border border-[#242944] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
            Bio / Public Transmission
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-[#131526] text-[#fbf7ef] p-3 rounded-xl border border-[#242944] focus:border-[#e9b65a] outline-none text-xs sm:text-sm resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="button button-primary px-6 py-2.5 text-xs font-semibold">
            Save Profile Changes
          </button>
        </div>
      </form>

      {/* Reading Defaults */}
      <div className="p-6 sm:p-8 rounded-2xl border border-[#21263e] bg-[#0d0f1e] space-y-6">
        <h3 className="font-serif font-bold text-lg text-[#fbf7ef] border-b border-[#1c2035] pb-3">
          Default Reading Atmosphere
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Default Theme
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => updateReaderSettings({ theme: "dark" })}
                className={`py-2 rounded-xl border flex items-center justify-center space-x-1.5 ${
                  readerSettings.theme === "dark"
                    ? "bg-[#1f2338] text-[#e9b65a] border-[#e9b65a]"
                    : "bg-[#141628] text-[#8e94ad] border-[#252940]"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => updateReaderSettings({ theme: "light" })}
                className={`py-2 rounded-xl border flex items-center justify-center space-x-1.5 ${
                  readerSettings.theme === "light"
                    ? "bg-[#fbfaf5] text-[#0a0b14] border-[#e9b65a]"
                    : "bg-[#141628] text-[#8e94ad] border-[#252940]"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => updateReaderSettings({ theme: "sepia" })}
                className={`py-2 rounded-xl border flex items-center justify-center space-x-1.5 ${
                  readerSettings.theme === "sepia"
                    ? "bg-[#f4ecd8] text-[#3c2f21] border-[#e9b65a]"
                    : "bg-[#141628] text-[#8e94ad] border-[#252940]"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Sepia</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Default Typeface
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              {["serif", "sans", "mono"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => updateReaderSettings({ fontFamily: t as any })}
                  className={`py-2 rounded-xl border capitalize ${
                    readerSettings.fontFamily === t
                      ? "bg-[#e9b65a] text-[#0a0b14] border-[#e9b65a]"
                      : "bg-[#141628] text-[#8e94ad] border-[#252940]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-4 flex justify-between items-center text-xs">
        <span className="text-[#6d7287]">
          Logged in as {user?.email}
        </span>
        <button
          onClick={() => {
            logout();
            addToast("Logged out", "You can continue browsing as a guest.", "info");
          }}
          className="text-rose-400 hover:text-rose-300 font-semibold flex items-center space-x-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
