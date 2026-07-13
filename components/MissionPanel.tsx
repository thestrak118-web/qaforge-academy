interface MissionPanelProps {
  mission: string;
}

export default function MissionPanel({ mission }: MissionPanelProps) {
  return (
    <div className="block">
      <div className="eyebrow">Vazifa</div>
      <p className="body" style={{ whiteSpace: "pre-line" }}>
        {mission}
      </p>
    </div>
  );
}
