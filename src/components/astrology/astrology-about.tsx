import Grid from "../ui/grid";
import AccordionComponent from "./astrology-faqs";
import AstrologySlider from "./astrology-slider";

const AstrologyAbout = () => {
  return (
    <section>
      <div className="container">
        <Grid>
          <Grid.Col className="md:w-7/12">
            <AstrologySlider />
          </Grid.Col>
          <Grid.Col className="md:w-5/12">
            <AccordionComponent />
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default AstrologyAbout;
