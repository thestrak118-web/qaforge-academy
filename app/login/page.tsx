"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { mapAuthError } from "@/lib/auth-errors";
import AuthIllustration from "@/components/AuthIllustration";
import { BrandIcon, IconMail, IconLock, IconEye, IconEyeOff, IconShield } from "@/lib/icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(mapAuthError(signInError.message, "login"));
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="brand-mark">
            <BrandIcon />
          </div>
          <div className="brand-txt">
            <strong>QAForge</strong>
            <span>Academy</span>
          </div>
        </div>
        <div className="auth-tagline">LEARN. PRACTICE. MASTER.</div>

        <AuthIllustration />

        <blockquote className="auth-quote">
          <span className="auth-quote-mark">&ldquo;</span>
          <p>
            Sifat — bu tasodif emas,
            <br />
            bu ongli tanlov va odat.
          </p>
          <cite>— QA Mindset</cite>
        </blockquote>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-shield">
            <IconShield />
          </div>
          <h1>Xush kelibsiz!</h1>
          <p className="auth-sub">Hisobingizga kiring va o&apos;rganishni davom ettiring.</p>

          <div className="auth-field">
            <label className="auth-field-label" htmlFor="email">
              Email manzil
            </label>
            <div className="field">
              <IconMail />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-field-label" htmlFor="password">
              Parol
            </label>
            <div className="field">
              <IconLock />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Parolni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="field-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <div className="auth-submit">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Kirilmoqda…" : "Kirish"}
            </button>
          </div>

          <p className="auth-switch">
            Hisobingiz yo&apos;qmi? <Link href="/register">Ro&apos;yxatdan o&apos;tish</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
