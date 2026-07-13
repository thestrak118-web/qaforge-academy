"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Section } from "@/data/lessons";
import { IconArrowLeft, IconArrowRight } from "@/lib/icons";

interface SectionNavProps {
  section: Section;
  prev: Section | null;
  next: Section | null;
  indexInModule: number;
  totalInModule: number;
  isDone: boolean;
  onComplete: () => void;
}

export default function SectionNav({
  section,
  prev,
  next,
  indexInModule,
  totalInModule,
  isDone,
  onComplete,
}: SectionNavProps) {
  const router = useRouter();
  // Theory sections are marked complete by this button. Quiz/practical
  // sections are gated — they can only be completed by the inline
  // SectionQuiz / PracticalTask actions.
  const canManuallyComplete = section.type === "theory";
  const gated = !isDone && !canManuallyComplete;
  const disabled = gated || (isDone && !next);

  const handleForward = () => {
    if (!isDone && canManuallyComplete) onComplete();
    if (next) router.push(`/learn/${next.id}`);
  };

  const label = next ? "Bajarildi va davom etish" : isDone ? "Bajarildi" : "Bajarildi deb belgilash";

  return (
    <div className="section-bottom-nav">
      {prev ? (
        <Link href={`/learn/${prev.id}`} className="btn btn-ghost">
          <IconArrowLeft /> Oldingi
        </Link>
      ) : (
        <span />
      )}

      <span className="step-label">
        Section {indexInModule + 1} / {totalInModule}
      </span>

      <button type="button" className="btn btn-primary" onClick={handleForward} disabled={disabled}>
        {label} {next && <IconArrowRight />}
      </button>
    </div>
  );
}
