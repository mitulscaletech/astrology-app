import Grid from "../ui/grid";
import AstrologyFaqs from "./astrology-faqs";
import AstrologySlider from "./astrology-slider";

const AstrologyAbout = () => {
  return (
    <section>
      <div className="container">
        <Grid className="gap-y-4">
          <Grid.Col className="lg:w-6/12 2xl:w-7/12">
            <AstrologySlider />
          </Grid.Col>
          <Grid.Col className="lg:w-6/12 2xl:w-5/12">
            <AstrologyFaqs />
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default AstrologyAbout;
