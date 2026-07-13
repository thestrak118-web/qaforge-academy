import type { ReactNode } from "react";
import type { MockBadgeIcon } from "@/data/showcase-mock";
import {
  IconBug,
  IconGrid,
  IconDomainApi,
  IconFlame,
  IconTarget,
  IconClock,
  IconClipboardCheck,
  IconShield,
  IconAutomation,
  IconCheckCircle,
  IconBolt,
  IconStar,
} from "@/lib/icons";

export const BADGE_ICON: Record<MockBadgeIcon, ReactNode> = {
  bug: <IconBug />,
  ui: <IconGrid />,
  api: <IconDomainApi />,
  streak: <IconFlame />,
  hunt: <IconTarget />,
  clock: <IconClock />,
  solver: <IconClipboardCheck />,
  security: <IconShield />,
  automation: <IconAutomation />,
  perfect: <IconCheckCircle />,
  load: <IconBolt />,
  grandmaster: <IconStar />,
};
