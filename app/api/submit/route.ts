// Grades a challenge submission and, on a first-time correct solve, inserts
// challenge_submissions with a server-computed points_earned. The
// add_points_on_submission trigger is what actually credits profiles.points
// — the client only ever sends { challengeId, selectedIds }, never a point
// value.

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { CHALLENGES } from "@/data/challenges";
import { gradeSubmission } from "@/lib/scoring";

interface SubmitBody {
  challengeId?: unknown;
  selectedIds?: unknown;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Tizimga kirilmagan" }, { status: 401 });
  }

  const body: SubmitBody | null = await request.json().catch(() => null);
  const challengeId = typeof body?.challengeId === "string" ? body.challengeId : null;
  const selectedIds = Array.isArray(body?.selectedIds)
    ? body.selectedIds.filter((x): x is string => typeof x === "string")
    : null;

  if (!challengeId || !selectedIds) {
    return NextResponse.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const challenge = CHALLENGES.find((c) => c.id === challengeId);
  if (!challenge) {
    return NextResponse.json({ error: "Challenge topilmadi" }, { status: 404 });
  }

  const correct = gradeSubmission(challenge.options, selectedIds);
  if (!correct) {
    return NextResponse.json({ correct: false, alreadySolved: false, pointsAwarded: 0 });
  }

  const { error: insertError } = await supabase.from("challenge_submissions").insert({
    user_id: user.id,
    challenge_id: challenge.id,
    points_earned: challenge.points,
  });

  if (insertError) {
    // Unique violation on (user_id, challenge_id) = already solved before.
    if (insertError.code === "23505") {
      return NextResponse.json({ correct: true, alreadySolved: true, pointsAwarded: 0 });
    }
    return NextResponse.json({ error: "Saqlashda xatolik yuz berdi" }, { status: 500 });
  }

  return NextResponse.json({
    correct: true,
    alreadySolved: false,
    pointsAwarded: challenge.points,
  });
}
