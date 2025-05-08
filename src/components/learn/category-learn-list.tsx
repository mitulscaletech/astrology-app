import Grid from "@/components/ui/grid";
import LearnCard from "@/components/learn/learn-card";

import learnImg1 from "@/assets/images/home/learn-01.jpg";
import learnImg2 from "@/assets/images/home/learn-02.jpg";
import learnImg3 from "@/assets/images/home/learn-03.jpg";
import LearnCategories from "./learn-categories";

const LEARN_DATA = [
  {
    image: learnImg1,
    date: "08 February 2025",
    readTime: "3 min Read",
    title: "Finding Your Philanthropic Purpose Through Vedic Astrology",
    description:
      "Introduction Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose..."
  },
  {
    image: learnImg2,
    date: "08 February 2025",
    readTime: "3 min Read",
    title: "Aligning Destinies For A Harmonious Future beyond writing a check",
    description:
      "Introduction Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose..."
  },
  {
    image: learnImg3,
    date: "08 February 2025",
    readTime: "3 min Read",
    title: "Strategies ofPractical Life, Philanthropy and expression of values, purpose",
    description:
      "Introduction Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose..."
  },
  {
    image: learnImg1,
    date: "08 February 2025",
    readTime: "3 min Read",
    title: "Finding of Philanthropic Purpose Through Vedic Astrology",
    description:
      "Introduction Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose..."
  },
  {
    image: learnImg2,
    date: "08 February 2025",
    readTime: "3 min Read",
    title: "Aligning Destinies For A Harmonious Future and writing a check",
    description:
      "Introduction Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose..."
  },
  {
    image: learnImg3,
    date: "08 February 2025",
    readTime: "3 min Read",
    title: "Practical Life Strategies, Philanthropy and expression of values, purpose",
    description:
      "Introduction Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose..."
  }
];

const CategoryLearnList = () => {
  return (
    <section className="small-section">
      <div className="container">
        <Grid className="gap-y-4" size="zero">
          <Grid.Col className="lg:w-4/12">
            <LearnCategories />
          </Grid.Col>
          <Grid.Col className="lg:w-8/12">
            <Grid className="gap-y-4" size="md">
              {LEARN_DATA?.map((astrology) => {
                return (
                  <Grid.Col key={astrology?.date} className="md:w-6/12">
                    <LearnCard
                      image={astrology?.image.src}
                      date={astrology?.date}
                      title={astrology?.title}
                      description={astrology?.description}
                      readTime={astrology?.readTime}
                    />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default CategoryLearnList;
