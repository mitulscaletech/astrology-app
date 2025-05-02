"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import SlickSlider from "@/components/ui/slick-slider";

import astrologerImg1 from "@/assets/images/dummy/astrologer-01.jpg";
import astrologerImg2 from "@/assets/images/dummy/astrologer-02.jpg";
import astrologerImg3 from "@/assets/images/dummy/astrologer-03.jpg";
import IconExpand from "@/shared/icons/expand";
import IconSpeaker from "@/shared/icons/speaker";
import IconPlay from "@/shared/icons/play";
import VideoPlayer from "./video-player";

const astrologerData = [
  {
    image: astrologerImg1,
    video:
      "https://wewake.site/cdn/shop/videos/c/vp/f07aa91bd486482c9fa5d136f038d871/f07aa91bd486482c9fa5d136f038d871.HD-1080p-7.2Mbps-34184510.mp4"
  },
  {
    image: astrologerImg2,
    video:
      "https://wewake.site/cdn/shop/videos/c/vp/fa3458b194534d329f2ac8f8860e38d8/fa3458b194534d329f2ac8f8860e38d8.HD-720p-4.5Mbps-44495929.mp4"
  },
  { image: astrologerImg3 }
];

const AstrologySlider = () => {
  const [nav1, setNav1] = useState<any | null>(null);
  const [nav2, setNav2] = useState<any | null>(null);

  const mainSettings = {
    asNavFor: nav2 as any | undefined,
    ref: (slider: any) => setNav1(slider),
    arrows: false
    // fade: true,
    // autoplay: true,
    // speed: 1000,
    // autoplaySpeed: 4000
  };

  const thumbSettings = {
    asNavFor: nav1 as any | undefined,
    ref: (slider: any) => setNav2(slider),
    slidesToShow: astrologerData.length >= 3 ? 3 : astrologerData.length,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true
  };

  return (
    <div>
      <SlickSlider settings={mainSettings} className="mb-1 md:mb-2 lg:mb-3 2xl:mb-3.5">
        {astrologerData.map((astrologer, idx) => (
          <div key={idx}>
            <div className="relative">
              {!astrologer.video && (
                <Image
                  src={astrologer.image}
                  alt={`Main Image ${idx}`}
                  width={1016}
                  height={574}
                  className="w-full aspect-[770/440] object-cover rounded-xl xl:rounded-3xl"
                />
              )}
              {astrologer.video && <VideoPlayer videoSrc={astrologer.video} />}
            </div>
          </div>
        ))}
      </SlickSlider>

      <SlickSlider settings={thumbSettings} className="px-7 lg:px-16">
        {astrologerData.map((astrologer, idx) => (
          <div key={idx} className="px-0.5 md:px-2 !block">
            <Image
              src={astrologer.image}
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
