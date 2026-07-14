import { IconBadges } from "@/lib/icons";

export default function BadgesPage() {
  return (
    <section>
      <div className="page-head">
        <h1>Yutuqlar</h1>
        <p>Challenge&apos;lar va darslarni yakunlab, badge&apos;lar to&apos;plang.</p>
      </div>
      <div className="card settings-soon">
        <IconBadges />
        <h3>Badge&apos;lar tez orada</h3>
        <p>Yutuqlar tizimi keyingi versiyada qo&apos;shiladi.</p>
      </div>
    </section>
  );
}
