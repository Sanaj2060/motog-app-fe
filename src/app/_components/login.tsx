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
import { IoCloseCircleOutline } from "react-icons/io5";
import Image from 'next/image';
import { useRegisterPopup } from '../../hooks/use-register-popup';
import { useLoginPopup } from '../../hooks/use-login-popup';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const setToken = useAuth(state => state.setToken);
  const show = useLoginPopup(state => state.show);
  const setShowLogin = useLoginPopup(state => state.setShow);
  const setShowRegister = useRegisterPopup(state => state.setShow);

  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!show) return null;

  const signUp = () => {
    setShowRegister(true);
    setShowLogin(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI expects 'username' for email in form data
    formData.append('password', password);

    try {
      // Note: FastAPI's OAuth2PasswordBearer expects x-www-form-urlencoded for login
      const response = await fetch(`${BACKEND_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the access token in localStorage (for client-side access)
        setToken(data.access_token);
        toast.success("Login successful");
        console.log('Login successful:', data);
        // Redirect to home page or dashboard
        setTimeout(() => {
          setShowLogin(false);
        }, 1000);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        toast.error('Login failed. Please check your credentials!');
      }
    } catch (err) {
      console.error('Network error during login:', err);
      toast.error('Network error. Could not connect to the server.');
    }
  };

  const close = () => {
    setShowLogin(false);
  }

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
      <div className='w-full max-w-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 '>
        <div className='flex flex-col sm:flex-row w-full- shadow-lg rounded-xl'>
          <div className='rounded-l-xl overflow-hidden hidden sm:block bg-white'>
            <Image src={'/images/login_img.png'} width={500} height={500} alt='login image' className='' />
          </div>
          <Card id='login' className="w-full max-w-sm ml-auto mr-auto sm:mr-0 outline-none border-none shadow-none relative rounded-r-xl rounded-l-xl sm:rounded-l-none">
            <IoCloseCircleOutline className="absolute top-1 right-1 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={close} />
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription className='hidden sm:block'>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link" onClick={signUp}>Sign Up</Button>
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
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
