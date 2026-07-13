import { IconTrophy, IconBolt } from "@/lib/icons";

interface RankBadgeProps {
  rank: string;
  points: number;
}

export default function RankBadge({ rank, points }: RankBadgeProps) {
  return (
    <>
      <div className="pill rank">
        <IconTrophy />
        <span className="lbl">{rank}</span>
      </div>
      <div className="pill pts">
        <IconBolt />
        <b className="mono">{points.toLocaleString()}</b>
      </div>
    </>
  );
}
