import WelcomeCard from "@/components/WelcomeCard";
import StatisticsCard from "@/components/StatisticsCard";
import CurrentPathCard from "@/components/CurrentPathCard";
import CoursesCard from "@/components/CoursesCard";
import QuickActions from "@/components/QuickActions";
import ProgressCard from "@/components/ProgressCard";

export default function DashboardPage() {
  return (
    <section className="grid">
      <WelcomeCard />
      <StatisticsCard />
      <div className="dash-grid">
        <div className="grid">
          <CurrentPathCard />
          <CoursesCard />
        </div>
        <div className="grid">
          <QuickActions />
          <ProgressCard />
        </div>
      </div>
    </section>
  );
}
