import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import AstrologyCard from "@/components/common/astrology-card";

import astrologyImg1 from "@/assets/images/home/astrology-img-01.png";
import astrologyImg2 from "@/assets/images/home/astrology-img-02.png";
import astrologyImg3 from "@/assets/images/home/astrology-img-03.png";
import astrologyImg4 from "@/assets/images/home/astrology-img-04.png";

const ASTROLOGY_DATA = [
  {
    image: astrologyImg1,
    tag: "Janma Kundali",
    title: "Holistic Life Blueprint",
    description: "Unlock the secrets of your birth chart and take control of your life's journey with awareness.",
    btnText: "BOOK NOW",
    slug: "BOOK NOW"
  },
  {
    image: astrologyImg2,
    tag: "Kundali Matching",
    title: "Aligning Destinies For A Harmonious Future",
    description: "A valuable guidance to navigate life with your partner through thick & thin.",
    btnText: "BOOK NOW",
    slug: "BOOK NOW"
  },
  {
    image: astrologyImg3,
    tag: "Prashna Kundali",
    title: "Practical Life Strategies",
    description: "Gain deeper insights into your life's pressing questions and find clarity.",
    btnText: "BOOK NOW",
    slug: "BOOK NOW"
  },
  {
    image: astrologyImg4,
    tag: "Muhurta",
    title: "The Best Time For Success",
    description: "Align with the most auspicious time to crease the probabilities of success.",
    btnText: "BOOK NOW",
    slug: "BOOK NOW"
  }
];

const Astrology = () => {
  return (
    <section className="common-section">
      <div className="container">
        <Typography variant="h2" size="p" className="mb-3" isTitle>
          Astrology
        </Typography>
        <Grid className="justify-between gap-y-4">
          <Grid.Col className="md:w-5/12">
            <Typography variant="h3" size="h3" className="mb-0 font-semibold">
              Bring the Cosmos Into Your Daily Rituals
            </Typography>
          </Grid.Col>
          <Grid.Col className="md:w-7/12 lg:w-6/12 xl:w-5/12">
            <Typography variant="p" size="h6" className="mb-0 text-secondary/70">
              Explore astrology-inspired products designed to deepen your self-awareness, align with the universe, and
              elevate your everyday rituals.
            </Typography>
          </Grid.Col>
        </Grid>
        <Grid className="mt-6 md:mt-8 lg:mt-10 2xl:mt-12 gap-y-4" size="md">
          {ASTROLOGY_DATA?.map((astrology) => {
            return (
              <Grid.Col key={astrology?.tag} className="md:w-6/12 xl:w-3/12">
                <AstrologyCard
                  image={astrology?.image.src}
                  tag={astrology?.tag}
                  title={astrology?.title}
                  description={astrology?.description}
                  btnText={astrology?.btnText}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      </div>
    </section>
  );
};

export default Astrology;
