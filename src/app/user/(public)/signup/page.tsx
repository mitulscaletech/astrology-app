"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconPhone from "@/shared/icons/check";
import IconMoonStar from "@/shared/icons/moonStar";
import IconMail from "@/shared/icons/mail";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  dob: z.string().min(1, "Date of birth is required"),
  birthTime: z.string().min(1, "Birth time is required"),
  birthPlace: z.string().min(1, "Birth place is required")
});

export default function UserSignup() {
  const [activeTab, setActiveTab] = useState("email");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signupSchema)
  });

  const handleEmailSignup = (data: any) => {
    console.log("Email signup:", data);
  };

  const handleSocialLogin = (provider: string) => {
    console.log("Social login:", provider);
  };

  const handleOTPSignup = (phone: string) => {
    console.log("OTP signup:", phone);
  };

  return (
    <div className='container flex flex-col items-center justify-center min-h-screen p-4'>
      <Link href='/' className='flex items-center space-x-2 mb-8'>
        <span className='h-6 w-6' >
          <IconMoonStar />
        </span>
        <span className='text-xl font-bold'>WeWake</span>
      </Link>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Create User Account</CardTitle>
          <CardDescription>Choose your preferred signup method</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='email' className='flex items-center'>
                <span className='w-4 h-4 mr-2' >
                  <IconMail />
                </span>
                Email
              </TabsTrigger>
              <TabsTrigger value='phone' className='flex items-center'>
                <span className='w-4 h-4 mr-2'>
                  <IconPhone />
                </span>
                Phone
              </TabsTrigger>
            </TabsList>
            <TabsContent value='email' className='space-y-4'>
              <form onSubmit={form.handleSubmit(handleEmailSignup)} className='space-y-4'>
                <div className='space-y-2'>
                  <label htmlFor='name' className='text-sm font-medium'>
                    Full Name
                  </label>
                  <Input {...form.register("name")} id='name' placeholder='Enter your full name' />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='email' className='text-sm font-medium'>
                    Email
                  </label>
                  <Input {...form.register("email")} id='email' type='email' placeholder='Enter your email' />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='password' className='text-sm font-medium'>
                    Password
                  </label>
                  <Input {...form.register("password")} id='password' type='password' placeholder='Create a password' />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='dob' className='text-sm font-medium'>
                    Date of Birth
                  </label>
                  <Input {...form.register("dob")} id='dob' type='date' />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='birthTime' className='text-sm font-medium'>
                    Birth Time
                  </label>
                  <Input {...form.register("birthTime")} id='birthTime' type='time' />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='birthPlace' className='text-sm font-medium'>
                    Birth Place
                  </label>
                  <Input {...form.register("birthPlace")} id='birthPlace' placeholder='Enter your birth place' />
                </div>
                <Button type='submit' className='w-full'>
                  Create Account
                </Button>
              </form>
            </TabsContent>
            <TabsContent value='phone' className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='phone' className='text-sm font-medium'>
                  Phone Number
                </label>
                <Input id='phone' type='tel' placeholder='Enter your phone number' />
                <Button onClick={() => handleOTPSignup("phone")} className='w-full mt-4'>
                  Send OTP
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='relative w-full'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-accent-white px-2 text-secondary-300'>Or continue with</span>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <Button variant='outline' onClick={() => handleSocialLogin("google")}>
              Google
            </Button>
            <Button variant='outline' onClick={() => handleSocialLogin("facebook")}>
              Facebook
            </Button>
            <Button variant='outline' onClick={() => handleSocialLogin("apple")}>
              Apple
            </Button>
          </div>
          <div className='text-center text-sm text-secondary-300'>
            Already have an account?{" "}
            <Link href='/auth/user' className='text-primary hover:underline'>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
