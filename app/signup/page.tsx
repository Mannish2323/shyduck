"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Lock, 
  User, 
  CheckCircle2 
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function SignupPage() {
  const router = useRouter();
  const { addToast } = useShyduck();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "shyduck_pending_profile",
        JSON.stringify({
          username: username.trim().toLowerCase(),
          email: email.trim(),
          name: username.trim(),
        })
      );
      setIsLoading(false);
      addToast("Account details saved", "Choose your primary Shyduck Tales experience next.", "success");
      router.push("/onboarding");
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 p-8 sm:p-10 rounded-3xl border border-[#242942] bg-[#0e1020] shadow-2xl relative">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <ShyduckMascot mood="creative" size={56} />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf7ef]">
            Begin Your Journey
          </h1>
          <p className="text-xs text-[#8c91a8]">
            Join thousands of authors and readers crafting the new wave of Indian fiction.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Username *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-[#6e738d]" />
              <input
                type="text"
                required
                placeholder="e.g. arjun_quill"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#131526] text-[#fbf7ef] pl-10 pr-4 py-2.5 rounded-xl border border-[#262b44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#6e738d]" />
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#131526] text-[#fbf7ef] pl-10 pr-4 py-2.5 rounded-xl border border-[#262b44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#6e738d]" />
              <input
                type="password"
                required
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#131526] text-[#fbf7ef] pl-10 pr-4 py-2.5 rounded-xl border border-[#262b44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
              />
            </div>
          </div>

          <label className="flex items-start space-x-2 text-xs text-[#8c91a8] cursor-pointer pt-1">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-[#2a2f4c] text-[#e9b65a] focus:ring-[#e9b65a]"
            />
            <span>
              I agree to the{" "}
              <Link href="/guidelines" className="text-[#e9b65a] hover:underline">
                Creator Guidelines
              </Link>{" "}
              and Community Rules.
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading || !agreeTerms}
            className="button button-primary w-full py-3 text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-[#e9b65a]/15 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Preparing your quill...</span>
            ) : (
              <>
                <span>Create Account & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-[#8c91a8]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#e9b65a] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
