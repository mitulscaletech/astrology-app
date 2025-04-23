"use client";

import Image from "next/image";
import { FC, useState } from "react";
import SlickSlider from "@/components/ui/slick-slider";

interface ServiceCarouselProp {
  images: any[];
}

const ServiceCarousel: FC<ServiceCarouselProp> = ({ images }) => {
  const [nav1, setNav1] = useState<any | null>(null);
  const [nav2, setNav2] = useState<any | null>(null);

  const mainSettings = {
    asNavFor: nav2 as any | undefined,
    ref: (slider: any) => setNav1(slider),
    arrows: false,
    fade: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    className: "rounded-xl overflow-hidden"
  };

  const thumbSettings = {
    asNavFor: nav1 as any | undefined,
    ref: (slider: any) => setNav2(slider),
    slidesToShow: images.length >= 3 ? 3 : images.length,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    className: "mt-4"
  };

  return (
    <div>
      <SlickSlider settings={mainSettings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <Image
              src={img}
              alt={`Main Image ${idx}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        ))}
      </SlickSlider>

      <SlickSlider settings={thumbSettings}>
        {images.map((img, idx) => (
          <div key={idx} className="px-2">
            <Image
              src={img}
              alt={`Thumbnail ${idx}`}
              width={80}
              height={80}
              className="w-full rounded-lg object-cover cursor-pointer border border-gray-200"
            />
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default ServiceCarousel;
