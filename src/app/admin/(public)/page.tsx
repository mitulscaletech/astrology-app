"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MoonStar, Shield } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log("Admin login:", { email, password });
  };

  return (
    <div className='container flex flex-col items-center justify-center min-h-screen p-4'>
      <Link href='/' className='flex items-center space-x-2 mb-8'>
        <MoonStar className='h-6 w-6' />
        <span className='text-xl font-bold'>WeWake</span>
      </Link>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <div className='flex items-center justify-center mb-4'>
            <Shield className='h-12 w-12 text-primary' />
          </div>
          <CardTitle className='text-2xl text-center'>Admin Login</CardTitle>
          <CardDescription className='text-center'>Access the admin dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium'>
                Email
              </label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='password' className='text-sm font-medium'>
                Password
              </label>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <Button type='submit' className='w-full'>
              Sign In
            </Button>
            <div className='flex items-center justify-between w-full text-sm text-secondary-300'>
              <Link href='/' className='hover:underline'>
                Back to Home
              </Link>
              <Link href='#' className='text-primary hover:underline'>
                Forgot Password?
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
