import Image from "next/image";
import React from "react";
import icon from "@/assets/images/logo-icon.png";

const Loader = () => {
  return (
    <div className='fixed flex justify-center items-center top-0 start-0 h-full w-full bg-accent-white/50 backdrop-blur-sm z-10'>
      <div className='size-20 flex justify-center items-center relative'>
        <Image src={icon} alt='icon' className='w-6/12 absolute m-auto z-1' />
        <div className='w-20 h-20 flex justify-center items-center bg-accent-white/50 border-4 border-t-transparent border-primary rounded-full animate-spin'></div>
      </div>
    </div>
  );
};

export default Loader;
