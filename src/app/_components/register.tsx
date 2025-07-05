'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterPopup } from '../../hooks/use-register-popup';
import { useLoginPopup } from '../../hooks/use-login-popup';
import Image from 'next/image';
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from 'sonner';
import Link from 'next/link';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const show = useRegisterPopup(state => state.show);
  const setShowRegister = useRegisterPopup(state => state.setShow);
  const setShowLogin = useLoginPopup(state => state.setShow);

  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!show) return null;

  const login = () => {
    setShowLogin(true);
    setShowRegister(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Registration successful! Redirecting to login...");
        console.log('Registration successful:', data);
        // Optionally, redirect to login page after a short delay
        setTimeout(() => {
          setShowLogin(true);
          setShowRegister(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error('Registration failed. Please try again.');
        console.log('Registration failed:', errorData);
      }
    } catch (err) {
      console.log('Network error during registration:', err);
      toast.error('Network error. Could not connect to the server.');
    }
  };

  const close = () => {
    setShowRegister(false);
  }

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
      <div className='w-full max-w-3xl flex flex-col sm:flex-row fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
        <div className='hidden sm:block flex-1 relative bg-white rounded-l-3xl'>
          <Image src={'/images/_reg_img.png'} fill alt='login image' className='object-cover rounded-l-xl shadow-lg' />
        </div>
          <Card id='login' className="w-full max-w-sm ml-auto mr-auto sm:mr-0 outline-none border-none shadow-none relative rounded-r-xl rounded-l-xl sm:rounded-l-none">
          <IoCloseCircleOutline className="absolute top-1 right-1 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={close} />
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription className='hidden sm:block'>
              Enter your email below to create an account
            </CardDescription>
            <CardAction>
              <Button variant="link" onClick={login}>Have an account?</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input id="reg-password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reg-confirm-password">Confirm Password</Label>
                  <Input id="reg-confirm-password" type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Register
            </Button>
            <p className='text-xs text-neutral-600'>
              By proceeding, I confirm that I have received, read, and agree to:{" "}
              <Link href='/docs/about-us.pdf' className='underline' target='_blank'>About Us</Link>,{" "}
              <Link href='/docs/privacy-policy.pdf' className='underline' target='_blank'>Privacy Policy</Link>,{" "}
              <Link href='/docs/refund-policy.pdf' className='underline' target='_blank'>Refund Policy</Link>, and{" "}
              <Link href='/docs/terms-of-use.pdf' className='underline' target='_blank'>Terms of Use</Link>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;