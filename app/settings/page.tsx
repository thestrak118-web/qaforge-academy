import { IconSettings } from "@/lib/icons";

export default function SettingsPage() {
  return (
    <section>
      <div className="page-head">
        <h1>Sozlamalar</h1>
        <p>Hisob, bildirishnoma va ko&apos;rinish sozlamalarini boshqaring.</p>
      </div>
      <div className="card settings-soon">
        <IconSettings />
        <h3>Sozlamalar tez orada</h3>
        <p>Hisob, bildirishnoma va ko&apos;rinish boshqaruvi keyingi versiyada qo&apos;shiladi.</p>
      </div>
    </section>
  );
}
