import Typography from "@/components/ui/typography";
import ProfileCard from "@/components/common/astrologer-profile-card";

export default function DashboardBanner() {
  return (
    <section className="py-2 md:py-3">
      <div className="container">
        <Typography variant="h2" size="p" isTitle className="mb-2 lg:mb-3">
          your profile
        </Typography>
        <Typography variant="h3" size="h4" className="font-head font-semibold">
          Welcome Dr Ganesh,
        </Typography>
        <ProfileCard isButtons isDesc />
      </div>
    </section>
  );
}
