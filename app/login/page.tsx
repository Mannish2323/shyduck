"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Lock, 
  UserCheck, 
  Feather, 
  BookOpen, 
  Shield 
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function LoginPage() {
  const router = useRouter();
  const { loginAs, addToast } = useShyduck();

  const [email, setEmail] = useState("manish@shyduck.io");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      loginAs("writer");
      setIsLoading(false);
      addToast("Welcome back, Storyteller!", "Signed in to your creative account.", "success");
      router.push("/library");
    }, 600);
  };

  const handleRoleQuickLogin = (role: "reader" | "writer" | "admin") => {
    loginAs(role);
    addToast(`Switched demo role to ${role.toUpperCase()}`, "Navigation state updated.", "info");
    if (role === "writer") router.push("/write");
    else if (role === "admin") router.push("/admin");
    else router.push("/discover");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 p-8 sm:p-10 rounded-3xl border border-[#242942] bg-[#0e1020] shadow-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-2 bg-gradient-to-r from-transparent via-[#e9b65a] to-transparent rounded-full" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <ShyduckMascot mood="peaceful" size={56} />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf7ef]">
            Welcome Back
          </h1>
          <p className="text-xs text-[#8c91a8]">
            Sign in to continue reading your saved worlds and managing your stories.
          </p>
        </div>

        {/* Quick Demo Role Logins */}
        <div className="p-4 rounded-2xl bg-[#141628] border border-[#252a44] space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#e9b65a]">
            <span>⚡ Instant Demo Switcher</span>
            <span className="text-[10px] text-[#71768e] lowercase font-normal">no password needed</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleRoleQuickLogin("reader")}
              className="py-2 rounded-xl bg-[#1a1d33] hover:bg-[#222642] text-xs font-semibold text-[#cad0e6] flex flex-col items-center space-y-1 transition-colors border border-[#2b304f]"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Reader</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleQuickLogin("writer")}
              className="py-2 rounded-xl bg-[#1a1d33] hover:bg-[#222642] text-xs font-semibold text-[#e9b65a] flex flex-col items-center space-y-1 transition-colors border border-[#2b304f]"
            >
              <Feather className="w-3.5 h-3.5 text-[#e9b65a]" />
              <span>Writer Studio</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleQuickLogin("admin")}
              className="py-2 rounded-xl bg-[#1a1d33] hover:bg-[#222642] text-xs font-semibold text-purple-300 flex flex-col items-center space-y-1 transition-colors border border-[#2b304f]"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Suite</span>
            </button>
          </div>
        </div>

        {/* Google Continue Button */}
        <button
          onClick={() => handleRoleQuickLogin("reader")}
          className="w-full py-3 px-4 rounded-2xl border border-[#2b304f] bg-[#141628] hover:bg-[#1c1f36] text-xs font-semibold text-[#fbf7ef] flex items-center justify-center space-x-2.5 transition-all active:scale-[0.98]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <span className="absolute w-full h-[1px] bg-[#1f2338]" />
          <span className="relative bg-[#0e1020] px-3 text-[11px] text-[#6b7087] uppercase tracking-wider">
            Or continue with email
          </span>
        </div>

        {/* Email Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#6e738d]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#131526] text-[#fbf7ef] pl-10 pr-4 py-2.5 rounded-xl border border-[#262b44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
                Password
              </label>
              <a href="#" className="text-[11px] text-[#e9b65a] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#6e738d]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#131526] text-[#fbf7ef] pl-10 pr-4 py-2.5 rounded-xl border border-[#262b44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="button button-primary w-full py-3 text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-[#e9b65a]/15 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Verifying credentials...</span>
            ) : (
              <>
                <span>Sign In to Shyduck</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#8c91a8] pt-2">
          New to Shyduck Tales?{" "}
          <Link href="/signup" className="text-[#e9b65a] font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
