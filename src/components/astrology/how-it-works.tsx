import Grid from "@/components/ui/grid";
import Typography from "../ui/typography";
import "@/assets/scss/how-it-work.scss";

const bookingSteps = [
  {
    number: 1,
    title: "Select time slot",
    description: "Choose your preferred time & date for your personalised consultation."
  },
  {
    number: 2,
    title: "Fill Your Details",
    description:
      "Provide the necessary information and questions you have in mind. This helps our experts prepare a focused consultation."
  },
  {
    number: 3,
    title: "Complete Payment",
    description: "Secure your consultation with payment. You'll receive confirmation and meeting details via email."
  }
];

const HowItWork = () => {
  return (
    <section className="small-section">
      <div className="container">
        <Typography variant="h2" size="p" className="mb-2 lg:mb-3" isTitle>
          How It Works
        </Typography>
        <Typography variant="h3" size="h4" className="font-bold">
          How to Book Your Session
        </Typography>
        <Grid className="mt-6 md:mt-8 lg:mt-10 2xl:mt-12 gap-y-4 2xl:-mx-4 2xl:[&>*]:px-4 how-it-work">
          {bookingSteps.map((step) => (
            <Grid.Col key={step.number} className="md:w-4/12">
              <div className="item flex md:flex-col gap-4 md:gap-4 lg:gap-8 xl:gap-10 2xl:gap-12 p-5 md:p-6 lg:p-8 2xl:p-11 4xl:p-12 rounded-xl lg:rounded-2xl xl:rounded-3xl bg-highlight/20 min-h-full relative after:contents-[''] after:absolute after:bg-secondary/20">
                <div className="flex justify-center items-top shrink-0 size-12 lg:size-18 xl:size-20 2xl:size-24 bg-highlight rounded-full outline outline-2 outline-secondary/20 outline-offset-4 lg:outline-offset-8 ">
                  <span className="font-head font-semibold text-accent-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-7xl">
                    {step.number}.
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2 xl:gap-3">
                  <Typography variant="h3" size="h5" className="font-bold">
                    {step.title}
                  </Typography>
                  <Typography variant="p" size="h6" className="text-secondary/70">
                    {step.description}
                  </Typography>
                </div>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default HowItWork;
