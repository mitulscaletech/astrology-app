"use client";

import Image from "next/image";
import { FC, useState } from "react";
import SlickSlider from "@/components/ui/slick-slider";

import astrologerImg1 from "@/assets/images/dummy/astrologer-01.jpg";
import astrologerImg2 from "@/assets/images/dummy/astrologer-02.jpg";
import astrologerImg3 from "@/assets/images/dummy/astrologer-03.jpg";

const images = [astrologerImg1, astrologerImg2, astrologerImg3];

const AstrologySlider = () => {
  const [nav1, setNav1] = useState<any | null>(null);
  const [nav2, setNav2] = useState<any | null>(null);

  const mainSettings = {
    asNavFor: nav2 as any | undefined,
    ref: (slider: any) => setNav1(slider),
    arrows: false,
    fade: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000
  };

  const thumbSettings = {
    asNavFor: nav1 as any | undefined,
    ref: (slider: any) => setNav2(slider),
    slidesToShow: images.length >= 3 ? 3 : images.length,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true
  };

  return (
    <div>
      <SlickSlider settings={mainSettings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <Image
              src={img}
              alt={`Main Image ${idx}`}
              width={1016}
              height={574}
              className="w-full aspect-[770/440] object-cover rounded-xl xl:rounded-3xl"
            />
          </div>
        ))}
      </SlickSlider>

      <SlickSlider settings={thumbSettings} className="mt-1 md:mt-2 lg:mt-3 2xl:mt-3.5 px-16">
        {images.map((img, idx) => (
          <div key={idx} className="px-2">
            <Image
              src={img}
              alt={`Thumbnail ${idx}`}
              width={276}
              height={154}
              className="w-full aspect-[770/440] rounded-md xl:rounded-lg object-cover cursor-pointer border border-gray-200"
            />
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default AstrologySlider;
