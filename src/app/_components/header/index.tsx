"use client";

import React, { useState } from 'react';
import Navbar from './navbar';
import BrandLine from './brand-line';
import ManualLocation from './manual-location';
import Login from '../login';
import Register from '../register';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50">
            <BrandLine isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Navbar isMenuOpen={isMenuOpen} />
            <ManualLocation />
            <Login />
            <Register />
        </header>
    );
};

export default Header;