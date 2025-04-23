"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type SlickInternalProps = {
  settings: any;
  children: React.ReactNode;
  className?: string;
};

export default function _SlickInternal({ settings, children, className }: SlickInternalProps) {
  return (
    <Slider {...settings} className={className}>
      {children}
    </Slider>
  );
}
