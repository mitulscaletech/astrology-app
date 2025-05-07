import Grid from "@/components/ui/grid";
import Typography from "../ui/typography";
import "@/assets/scss/cms-content.scss";

const LearnDetailsContent = () => {
  return (
    <section>
      <div className="container">
        <div className="pb-7 lg:pb-8 xl:pb-10 2xl:pb-12 4xl:pb-16 border-b border-secondary/50 mb-2 lg:mb-4 2xl:mb-5">
          <Grid className="mt-6 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-20 3xl:mt-24 gap-y-2.5 md:gap-y-4">
            <Grid.Col className="md:w-5/12">
              <Typography variant="h3" size="p" isTitle className="text-highlight font-semibold">
                Introduction
              </Typography>
            </Grid.Col>
            <Grid.Col className="md:w-7/12">
              <Typography variant="div" size="h6" className="text-secondary/70 cms-content">
                <p>
                  Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose, and the
                  desire to improve the world. While many donors rely on personal passions or immediate societal needs
                  to guide their giving, Vedic astrology introduces another layer: aligning charitable endeavors with
                  the planets and houses that best reflect your karmic purpose. By examining your birth chart, you may
                  find clues about which causes resonate on a deeper level—whether it’s education, healthcare,
                  environmental conservation, or spiritual upliftment.
                </p>
                <p>
                  This blog explores how understanding planetary placements can illuminate your philanthropic callings,
                  shaping how and when you give. We’ll discuss relevant houses (like the 9th for spiritual or higher
                  causes, and the 11th for social networks), the significance of Jupiter and Saturn in altruistic
                  expression, and practical steps to tailor your contributions so they’re both impactful and cosmically
                  aligned. If you’re seeking a philanthropic path that resonates with your unique cosmic blueprint, read
                  on.
                </p>
              </Typography>
            </Grid.Col>
          </Grid>
          <Grid className="mt-6 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-20 3xl:mt-24 gap-y-2.5 md:gap-y-4">
            <Grid.Col className="md:w-5/12">
              <Typography variant="h4" size="h4" className="font-semibold">
                The Spiritual Dimension of Philanthropy
              </Typography>
            </Grid.Col>
            <Grid.Col className="md:w-7/12">
              <Typography variant="div" size="h6" className="text-secondary/70 cms-content">
                <p>
                  In many Eastern traditions, giving isn’t merely about distributing excess wealth; it’s a dharmic duty
                  reflecting compassion, gratitude, and the pursuit of spiritual merit. Vedic astrology frames this as
                  part of your karmic journey—supporting areas that correspond to your cosmic strengths or addressing
                  karmic imbalances. For instance, a strong Jupiter might nudge you to fund educational scholarships,
                  while a heavy Saturn influence can spark empathy for underprivileged communities or justice reforms.
                </p>
                <p>
                  Charitable giving also fosters personal growth. Donating time or resources in line with your chart’s
                  karmic lessons can accelerate spiritual fulfillment, create a virtuous cycle of blessings, and
                  integrate philanthropic work into your life’s mission rather than treating it as a peripheral
                  activity.
                </p>
              </Typography>
            </Grid.Col>
          </Grid>
          <Grid className="mt-6 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-20 3xl:mt-24 gap-y-2.5 md:gap-y-4">
            <Grid.Col className="md:w-5/12">
              <Typography variant="h4" size="h4" className="font-semibold">
                Key Houses for Altruism
              </Typography>
            </Grid.Col>
            <Grid.Col className="md:w-7/12">
              <Typography variant="div" size="h6" className="text-secondary/70 cms-content">
                <p>9th, 11th, and 12th In astrology, certain houses relate strongly to philanthropic endeavors:</p>
                <ul>
                  <li>
                    9th House: Linked with spirituality, wisdom, and moral principles. Donations stemming from the 9th
                    house might focus on educational or religious causes, global outreach, or big-picture humanitarian
                    efforts.
                  </li>
                  <li>
                    11th House: Governs social networks, collective causes, and philanthropic gains. Individuals with a
                    strong 11th might champion community projects, group funding initiatives, or large-scale
                    collaborations.
                  </li>
                  <li>
                    12th House: Symbolizes empathy, charity, and dissolution of personal ego. People with prominent
                    12th-house placements might feel drawn to help the marginalized—prisons, hospitals, refugee camps—or
                    spiritual retreats and monasteries.
                  </li>
                </ul>
                <p>
                  Observing which house(s) stand out can guide you toward more resonant philanthropic efforts. If your
                  chart highlights the 9th, an overseas education NGO might be your calling; if it’s the 12th, you might
                  volunteer in medical camps or palliative care.
                </p>
                <p>
                  Charitable giving also fosters personal growth. Donating time or resources in line with your chart’s
                  karmic lessons can accelerate spiritual fulfillment, create a virtuous cycle of blessings, and
                  integrate philanthropic work into your life’s mission rather than treating it as a peripheral
                  activity.
                </p>
              </Typography>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default LearnDetailsContent;
