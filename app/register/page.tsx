"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { mapAuthError } from "@/lib/auth-errors";
import AuthIllustration from "@/components/AuthIllustration";
import { BrandIcon, IconMail, IconLock, IconEye, IconEyeOff, IconShield, IconProfile } from "@/lib/icons";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }
    if (password.length < 6) {
      setError("Parol juda qisqa — kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Parollar bir xil emas.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { display_name: name.trim() },
      },
    });
    setLoading(false);

    if (signUpError) {
      setError(mapAuthError(signUpError.message, "register"));
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setNotice(
      "Ro'yxatdan o'tish muvaffaqiyatli! Hisobingizni faollashtirish uchun emailingizni tekshiring."
    );
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
          <h1>Ro&apos;yxatdan o&apos;tish</h1>
          <p className="auth-sub">QAForge Academy&apos;da amaliy QA ko&apos;nikmalarini o&apos;rganishni boshlang.</p>

          <div className="auth-field">
            <label className="auth-field-label" htmlFor="name">
              Ism
            </label>
            <div className="field">
              <IconProfile />
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Ismingiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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
                autoComplete="new-password"
                placeholder="Kamida 6 ta belgi"
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

          <div className="auth-field">
            <label className="auth-field-label" htmlFor="confirmPassword">
              Parolni tasdiqlash
            </label>
            <div className="field">
              <IconLock />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Parolni qayta kiriting"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}
          {notice && <div className="auth-note">{notice}</div>}

          <div className="auth-submit">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Yaratilmoqda…" : "Ro'yxatdan o'tish"}
            </button>
          </div>

          <p className="auth-switch">
            Hisobingiz bormi? <Link href="/login">Kirish</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
