// Maps Supabase auth error messages to clear Uzbek copy for login/register forms.

export function mapAuthError(message: string | undefined, context: "login" | "register"): string {
  const m = (message ?? "").toLowerCase();

  if (m.includes("invalid login credentials")) {
    return "Email yoki parol noto'g'ri.";
  }
  if (m.includes("already registered") || m.includes("already exists") || m.includes("user already")) {
    return "Bu email bilan hisob allaqachon mavjud. Kirish sahifasidan foydalaning.";
  }
  if (m.includes("password") && (m.includes("at least") || m.includes("short") || m.includes("weak"))) {
    return "Parol juda qisqa — kamida 6 ta belgidan iborat bo'lishi kerak.";
  }
  if (m.includes("unable to validate email") || m.includes("invalid email") || m.includes("invalid format")) {
    return "Email manzil noto'g'ri formatda.";
  }
  if (m.includes("email not confirmed")) {
    return "Email hali tasdiqlanmagan. Pochtangizni tekshiring.";
  }
  if (m.includes("rate limit") || m.includes("too many")) {
    return "Juda ko'p urinish qilindi. Birozdan so'ng qayta urinib ko'ring.";
  }
  if (m.includes("network") || m.includes("fetch")) {
    return "Tarmoq xatosi. Internet aloqasini tekshirib, qayta urinib ko'ring.";
  }

  return context === "login"
    ? "Kirishda xatolik yuz berdi. Qayta urinib ko'ring."
    : "Ro'yxatdan o'tishda xatolik yuz berdi. Qayta urinib ko'ring.";
}
