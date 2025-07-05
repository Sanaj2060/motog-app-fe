'use client'

import React from 'react'
import { useLoginPopup } from '@/hooks/use-login-popup';
import { VscAccount } from "react-icons/vsc";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginBtn = () => {
    const setShowLogin = useLoginPopup(state => state.setShow);
    const token = useAuth(state => state.token);
    const setToken = useAuth(state => state.setToken);

    if (token) {
        return (
            <div className="flex items-center space-x-4">
                <Link href="/my-listings">
                    <Button variant={'ghost'} className='hover:cursor-pointer flex items-center space-x-2'>
                        My Listings
                    </Button>
                </Link>
                <Button variant={'ghost'} className='hover:cursor-pointer flex items-center space-x-2' onClick={() => setToken()}>
                    <IoMdLogOut className='text-lg' />
                    Logout
                </Button>
            </div>
        )
    }

    return (
        <Button variant={'ghost'} className=' hover:cursor-pointer flex items-center space-x-2' onClick={() => setShowLogin(true)}>
            <VscAccount className='text-lg' />
            Login / Register
        </Button>
    )
}

export default LoginBtn;
