import React from "react";
import service1 from "@/assets/images/astrology-service-1.webp";
import service2 from "@/assets/images/astrology-service-2.webp";
import service3 from "@/assets/images/astrology-service-3.webp";
import service4 from "@/assets/images/astrology-service-4.webp";
import Image from "next/image";
import Grid from "@/components/ui/grid";
import Link from "next/link";

const services = [
  {
    title: "Janma Kundali: Holistic Life Blueprint",
    description: "Unlock the secrets of your birth chart and take control of your life’s journey with clarity!",
    image: service1,
    link: "service-list/janma-kundali-holistic-life-blueprint"
  },
  {
    title: "Prashna Kundali: Practical Life Strategies",
    description:
      "Gain deeper insights into your life’s pressing questions and find clarity with our Prashna Kundali today!",
    image: service2,
    link: "service-list/prashna-kundali-practical-life-strategies"
  },
  {
    title: "Kundali Matching: Aligning Destinies for a Harmonious Future",
    description: "This service provides valuable guidance to navigate life with your partner through thick & thin.",
    image: service3,
    link: "service-list/kundali-matching-aligning-destinies-for-a-harmonious-future"
  },
  {
    title: "Muhurta: Choosing the Best Time for Success",
    description: "Unlock the power of timing with our Muhurta consultation and align with the most auspicious moments.",
    image: service4,
    link: "service-list/muhurta-choosing-the-best-time-for-success"
  }
];

const ServiceList = () => {
  return (
    <Grid className="gap-y-6">
      {services.map((service, idx) => (
        <Grid.Col key={idx} className="md:w-6/12">
          <div className="rounded-xl min-h-full shadow-md overflow-hidden transition hover:shadow-lg">
            <Image
              src={service.image}
              alt={service.title}
              width={400}
              height={400}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                <Link href={service.link} className="text-secondary hover:text-primary">
                  {service.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <Link
                href={service.link}
                className="text-primary hover:text-primary-700 font-semibold text-sm inline-flex items-center gap-1"
              >
                Know More <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ServiceList;
