"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Github,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function safeCallback(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}
export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter(),
    search = useSearchParams(),
    notified = useRef(false);
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [showPassword, setShowPassword] = useState(false),
    [pending, setPending] = useState(false);
  const callbackURL = safeCallback(search.get("callbackURL"));
  const signingUp = mode === "signup";
  useEffect(() => {
    if (notified.current) return;
    if (search.get("reason") === "protected") {
      toast("বিস্তারিত পণ্য দেখতে আগে সাইন ইন করুন।", { icon: "🔒" });
      notified.current = true;
    } else if (search.get("registered") === "1") {
      toast.success("রেজিস্ট্রেশন সফল হয়েছে! এখন সাইন ইন করুন।");
      notified.current = true;
    }
  }, [search]);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (signingUp && name.trim().length < 2)
      return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return toast.error("সঠিক ইমেইল ঠিকানা দিন।");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    setPending(true);
    try {
      if (signingUp) {
        const { error } = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        });
        if (error)
          return toast.error(error.message || "রেজিস্ট্রেশন করা যায়নি");
        // Requirement: after registering, take user to Sign In (not straight to Home).
        await authClient.signOut();
        router.push(
          `/signin?registered=1${callbackURL === "/" ? "" : `&callbackURL=${encodeURIComponent(callbackURL)}`}`,
        );
        router.refresh();
      } else {
        const { error } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (error)
          return toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push(callbackURL);
        router.refresh();
      }
    } catch {
      toast.error(
        "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। পরে আবার চেষ্টা করুন।",
      );
    } finally {
      setPending(false);
    }
  }
  async function social(provider: "google" | "github") {
    setPending(true);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL,
      });
      if (error)
        toast.error(
          error.message ||
            "সোশ্যাল লগইন কাজ করছে না। OAuth সেটিংস পরীক্ষা করুন।",
        );
    } catch {
      toast.error("OAuth সেটিংস বা নেটওয়ার্ক সংযোগ পরীক্ষা করুন।");
    } finally {
      setPending(false);
    }
  }
  return (
    <main className="shell flex justify-center pb-20 pt-12 sm:pt-17">
      <div className="w-full max-w-[460px]">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 grid h-15 w-15 place-items-center rounded-2xl bg-[#e5f7ea] text-[29px]">
            🛒
          </div>
          <h1 className="text-[30px] font-extrabold text-[#204b32]">
            {signingUp ? "সাইন আপ" : "সাইন ইন"}
          </h1>
          <p className="mt-2 text-sm leading-7 text-[#819484]">
            {signingUp
              ? "অ্যাকাউন্ট তৈরি করে নিত্যপণ্যের বিস্তারিত বাজারদর দেখুন।"
              : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
          </p>
        </div>
        <div className="surface rounded-[20px] p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            {signingUp && (
              <div>
                <label htmlFor="auth-name" className="form-label">
                  আপনার নাম
                </label>
                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute top-3.5 left-3 text-[#91a594]"
                  />
                  <input
                    id="auth-name"
                    className="form-input !pl-10"
                    autoComplete="name"
                    placeholder="আপনার পূর্ণ নাম"
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="auth-email" className="form-label">
                ইমেইল
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute top-3.5 left-3 text-[#91a594]"
                />
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  className="form-input !pl-10"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="auth-password" className="form-label">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute top-3.5 left-3 text-[#91a594]"
                />
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  autoComplete={signingUp ? "new-password" : "current-password"}
                  className="form-input !px-10"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  aria-label={
                    showPassword ? "পাসওয়ার্ড আড়াল করুন" : "পাসওয়ার্ড দেখুন"
                  }
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 text-[#809785]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={pending}
              className="primary-button w-full !py-3.5"
            >
              {pending ? (
                <LoaderCircle className="animate-spin" size={18} />
              ) : null}
              {signingUp ? "রেজিস্টার করুন" : "সাইন ইন"}{" "}
              {!pending && <ArrowRight size={18} />}
            </button>
          </form>
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#e8eee8]" />
            <span className="text-xs text-[#90a092]">অথবা</span>
            <span className="h-px flex-1 bg-[#e8eee8]" />
          </div>
          <div className="grid gap-3">
            <button
              disabled={pending}
              type="button"
              onClick={() => social("google")}
              className="secondary-button w-full !border-[#d8e4dc] !text-[#3e5b47]"
            >
              <span className="font-sans text-xl font-bold text-[#4285f4]">
                G
              </span>{" "}
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              disabled={pending}
              type="button"
              onClick={() => social("github")}
              className="secondary-button w-full !border-[#d8e4dc] !text-[#3e5b47]"
            >
              <Github size={19} /> GitHub দিয়ে চালিয়ে যান
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-[#718b78]">
            {signingUp ? "ইতোমধ্যে অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
            <Link
              className="font-bold text-[#17784c] hover:underline"
              href={`/${signingUp ? "signin" : "signup"}${callbackURL === "/" ? "" : `?callbackURL=${encodeURIComponent(callbackURL)}`}`}
            >
              {signingUp ? "সাইন ইন করুন" : "সাইন আপ করুন"}
            </Link>
          </p>
        </div>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#50795a] hover:underline"
        >
          <ArrowLeft size={15} /> হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
