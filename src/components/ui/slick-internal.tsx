"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/assets/scss/slider.scss";
import IconChevronRight from "@/shared/icons/chevronRight";
import IconChevronLeft from "@/shared/icons/chevronLeft";

type SlickInternalProps = {
  settings: any;
  children: React.ReactNode;
  className?: string;
};

export default function _SlickInternal({ settings, children, className }: SlickInternalProps) {
  return (
    <Slider
      {...{
        ...settings,
        nextArrow: (
          <button>
            <span className="size-full">
              <IconChevronRight />
            </span>
          </button>
        ),
        prevArrow: (
          <button>
            <span className="size-full">
              <IconChevronLeft />
            </span>
          </button>
        )
      }}
      className={className}
    >
      {children}
    </Slider>
  );
}
