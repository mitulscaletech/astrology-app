"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IconFacebook from "@/shared/icons/facebook";
import Typography from "@/components/ui/typography";

interface IAuth {
  phone: string;
  code: string;
  currentTab?: string;
}

const Auth = ({ phone, code, currentTab }: IAuth) => {
  return (
    <div className="text-center w-96 mx-auto">
      <span className="text-xl uppercase text-primary font-sans font-medium tracking-wider block mb-2">
        {currentTab}
      </span>
      <Typography variant="h2" size="h4" className="font-head font-semibold mb-4 lg:mb-6">
        Sign Up To Begin Your Divine Journey
      </Typography>
      <Typography variant="h2" size="p" className="mb-6 lg:mb-12">
        {`Choose your preferred method to access your WeWake ${currentTab} dashboard.`}
      </Typography>
      <div className="space-y-4">
        <div className="flex space-x-2 mb-8">
          <div className="w-1/4">
            <Label htmlFor="countryCode" className="sr-only">
              Country Code
            </Label>
            <Button variant="outline" className="w-full h-10 px-3 flex justify-between items-center" type="button">
              {code} <span className="text-xs">▼</span>
            </Button>
          </div>
          <div className="w-3/4">
            <Label htmlFor="phoneNumber" className="sr-only">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              placeholder="000 000 000 000"
              value={phone}
              //   onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-10"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center">
          <Button variant="outline" size="rounded" className="h-10 px-0">
            <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="rounded" className="h-10 px-0">
            <span className="w-5 h-5">
              <IconFacebook />
            </span>
          </Button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary hover:underline font-semibold">
            Log in here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
