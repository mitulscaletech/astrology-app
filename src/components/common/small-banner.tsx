import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import { Button } from "../ui/button";
import Link from "next/link";
import IconArrowForward from "@/shared/icons/arrow-forward";

interface SmallBannerProps {
  title: string;
  subTitle: string;
  desc: string;
  btnText: string;
  slug: string;
}

const SmallBanner: React.FC<SmallBannerProps> = ({ title, subTitle, desc, btnText, slug }) => {
  return (
    <section className="small-section">
      <div className="container">
        <Grid className="justify-between gap-y-4 items-end">
          <Grid.Col className="lg:w-6/12">
            <Typography variant="h1" size="p" className="mb-3" isTitle>
              {title}
            </Typography>
            <Typography variant="h2" size="h1" className="mb-0 font-semibold pe-12">
              {subTitle}
            </Typography>
          </Grid.Col>
          <Grid.Col className="lg:w-6/12 3xl:w-5/12">
            <Typography variant="p" size="h6" className="mb-0 text-secondary/70">
              {desc}
            </Typography>
            <Button asChild className="mt-4 md:mt-5 lg:mt-5 xl:mt-6 2xl:mt-8 4xl:mt-12" variant="highlight">
              <Link href={slug}>
                {btnText}
                <span className="size-5 md:size-6">
                  <IconArrowForward />
                </span>
              </Link>
            </Button>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default SmallBanner;
