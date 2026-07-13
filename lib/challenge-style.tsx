import type { ReactNode } from "react";
import type { Difficulty, Domain } from "@/data/challenges";
import {
  IconDomainEcommerce,
  IconDomainApi,
  IconDomainBanking,
  IconDomainForms,
  IconDomainWeb,
} from "@/lib/icons";

interface DomainStyle {
  icon: ReactNode;
  bg: string;
  color: string;
}

export const DOMAIN_STYLE: Record<Domain, DomainStyle> = {
  ecommerce: { icon: <IconDomainEcommerce />, bg: "var(--lime-soft)", color: "var(--lime)" },
  api: { icon: <IconDomainApi />, bg: "var(--cyan-soft)", color: "var(--cyan)" },
  banking: { icon: <IconDomainBanking />, bg: "rgba(251,191,36,.14)", color: "var(--yellow)" },
  forms: { icon: <IconDomainForms />, bg: "rgba(168,85,247,.15)", color: "#c084fc" },
  web: { icon: <IconDomainWeb />, bg: "rgba(244,63,94,.14)", color: "var(--red)" },
};

export const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  easy: "d-easy",
  medium: "d-medium",
  hard: "d-hard",
};

export const DIFFICULTY_CHIP_CLASS: Record<Difficulty, string> = {
  easy: "diff-easy",
  medium: "diff-medium",
  hard: "diff-hard",
};
