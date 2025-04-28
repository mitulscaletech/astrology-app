"use client";
import Image from "next/image";
import Link from "next/link";

import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import SlickSlider from "@/components/ui/slick-slider";
import { Button } from "@/components/ui/button";

import "@/assets/scss/testimonial.scss";
import IconStarRounded from "@/shared/icons/star-rounded";
import IconArrowForward from "@/shared/icons/arrow-forward";

import testimonialImg1 from "@/assets/images/home/testimonial-img-01.jpg";
import testimonialImg2 from "@/assets/images/home/testimonial-img-02.jpg";
import testimonialImg3 from "@/assets/images/home/testimonial-img-03.jpg";
import testimonialImg4 from "@/assets/images/home/testimonial-img-04.jpg";

const testimonial_DATA = [
  {
    image: testimonialImg1,
    title: "“Have consulted via Kundali as well as Prashna and looking forward for more guidance in the near future”",
    name: "Person Name",
    star: 5
  },
  {
    image: testimonialImg2,
    title: "“Booking was easy and the astrologer was good. He was thoughtful & could connect”",
    name: "Person Name",
    star: 5
  },
  {
    image: testimonialImg3,
    title: "“Consultation was insightful & clear”",
    name: "Person Name",
    star: 5
  },
  {
    image: testimonialImg4,
    title:
      "“Very experienced astrologer & to the point. Met many astrologers over these years but this one was quality! ”",
    name: "Person Name",
    star: 5
  }
];

const Testimonials = () => {
  const settings = {
    arrows: false,
    // autoplay: true,
    infinite: false,
    slidesToShow: 2,
    variableWidth: true
    // speed: 1000,
    // autoplaySpeed: 4000
  };
  return (
    <section className="common-section bg-secondary text-accent-white overflow-hidden">
      <div className="container">
        <Typography variant="h2" size="p" className="mb-3" isTitle>
          testimonial
        </Typography>
        <Grid className="justify-between items-center ">
          <Grid.Col className="md:w-5/12">
            <Typography variant="h3" size="h3" className="mb-0 font-semibold">
              Bring the Cosmos Into Your Daily Rituals
            </Typography>
          </Grid.Col>
          <Grid.Col className="md:w-5/12">
            <Typography variant="p" size="h6" className="mb-0 text-accent-white/70">
              Explore testimonial-inspired products designed to deepen your self-awareness, align with the universe, and
              elevate your everyday rituals.
            </Typography>
          </Grid.Col>
        </Grid>
        <SlickSlider settings={settings} className="testimonial-slider py-8 lg:py-10 xl:py-12">
          {testimonial_DATA.map((testimonial) => (
            <div key={testimonial.title} className="px-2 md:px-2 2xl:px-2.5 3xl:px-3">
              <div className="w-72 lg:w-80 xl:w-88 2xl:w-96 3xl:w-112 4xl:w-128 flex flex-col border border-secondary/20 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card min-h-full relative overflow-hidden">
                <Image
                  src={testimonial?.image}
                  alt={testimonial?.name}
                  className="w-full aspect-[563/801] object-cover"
                />
                <div className="absolute size-full flex flex-col justify-end p-4 md:p-4 lg:p-6 2xl:p-8 grow top-0 bg-gradient-to-b from-secondary/20 to-secondary/70 z-2">
                  <Typography variant="h4" size="h5" className="mb-4 xl:mb-5 italic">
                    {testimonial?.title}
                  </Typography>
                  <div className="flex gap-2 mb-3">
                    {Array.from({ length: testimonial?.star }, (_, index) => (
                      <div key={index} className="size-4">
                        <IconStarRounded />
                      </div>
                    ))}
                  </div>
                  <Typography variant="p" size="p" className="">
                    {testimonial?.name}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </SlickSlider>
        <div className="text-center">
          <Button asChild variant="highlight" className="gap-2.5">
            <Link href="/">
              Book a Session
              <span className="size-6">
                <IconArrowForward />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
