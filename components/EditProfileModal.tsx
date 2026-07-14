"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { mapAuthError } from "@/lib/auth-errors";
import { IconX, IconProfile, IconLock, IconEye, IconEyeOff, IconLogout } from "@/lib/icons";

interface EditProfileModalProps {
  onClose: () => void;
}

export default function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { profile, updateDisplayName, signOut } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(profile?.display_name ?? "");
  const [nameSaving, setNameSaving] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameSaved, setNameSaved] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSaveName = async () => {
    setNameError(null);
    setNameSaved(false);
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError("Ism bo'sh bo'lishi mumkin emas.");
      return;
    }
    setNameSaving(true);
    const { error } = await updateDisplayName(trimmed);
    setNameSaving(false);
    if (error) {
      setNameError("Ismni saqlashda xatolik yuz berdi. Qayta urinib ko'ring.");
      return;
    }
    setNameSaved(true);
  };

  const handleChangePassword = async () => {
    setPasswordError(null);
    setPasswordSaved(false);
    if (!newPassword || !confirmPassword) {
      setPasswordError("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Parol juda qisqa — kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Parollar bir xil emas.");
      return;
    }
    setPasswordSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordSaving(false);
    if (error) {
      setPasswordError(mapAuthError(error.message, "register"));
      return;
    }
    setPasswordSaved(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="toc-overlay" onClick={onClose}>
      <div className="toc-modal edit-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="toc-head">
          <h2 style={{ fontSize: 16, fontWeight: 800 }}>Profilni tahrirlash</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Yopish">
            <IconX />
          </button>
        </div>

        <div className="edit-profile-section">
          <h3 className="edit-profile-section-title">Ismni o&apos;zgartirish</h3>
          <div className="auth-field" style={{ marginTop: 10 }}>
            <div className="field">
              <IconProfile />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameSaved(false);
                }}
                placeholder="Ismingiz"
              />
            </div>
          </div>
          {nameError && <div className="auth-error">{nameError}</div>}
          {nameSaved && <div className="auth-note">Ism yangilandi.</div>}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ marginTop: 12 }}
            onClick={handleSaveName}
            disabled={nameSaving}
          >
            {nameSaving ? "Saqlanmoqda…" : "Saqlash"}
          </button>
        </div>

        <div className="edit-profile-section">
          <h3 className="edit-profile-section-title">Parolni o&apos;zgartirish</h3>
          <div className="auth-field" style={{ marginTop: 10 }}>
            <div className="field">
              <IconLock />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Yangi parol"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordSaved(false);
                }}
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
          <div className="auth-field" style={{ marginTop: 10 }}>
            <div className="field">
              <IconLock />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Yangi parolni tasdiqlash"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordSaved(false);
                }}
              />
            </div>
          </div>
          {passwordError && <div className="auth-error">{passwordError}</div>}
          {passwordSaved && <div className="auth-note">Parol yangilandi.</div>}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ marginTop: 12 }}
            onClick={handleChangePassword}
            disabled={passwordSaving}
          >
            {passwordSaving ? "Yangilanmoqda…" : "Parolni yangilash"}
          </button>
        </div>

        <div className="edit-profile-section">
          <button type="button" className="btn btn-ghost btn-sm btn-block" onClick={handleLogout}>
            <IconLogout />
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
