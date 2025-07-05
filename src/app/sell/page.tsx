import Image from 'next/image';
import React from 'react';
import { MdPeopleAlt } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { cn } from '@/lib/utils';
import SellCarVerification from './forms';

const Sell = () => {
    return (
        <div className='pt-28 sm:pt-30'>
            {/* First section with image */}
            <div className='relative'>
                <div className='pb-16 bg-gradient-to-r from-[#c8dffa] from-10% via-[#cee3fb] via-20% to-white to-80%'>
                    <div className='w-full max-w-4xl mx-auto'>
                        <Image
                            src={"/images/sell_your_car.png"}
                            height={0}
                            width={0}
                            sizes='100vw'
                            className='w-full h-auto'
                            alt="sell your car at pest price"
                        />
                    </div>
                </div>
                {/* Gradient overlay at bottom of image section to blend with form */}
                <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent'></div>
            </div>

            {/* Form section with smooth transition */}
            <SellCarVerification />

            {/* How It Works Section */}
            <section className='py-8 mt-16'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center text-gray-800 mb-12 text-shadow-lg'>How MotoG Works</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {[
                            {
                                icon: () => <FaThList className={cn("text-4xl mx-auto")} />,
                                title: 'List Your Car',
                                description: 'Our team will verify your listing for authenticity, and after approval your car will be listed for *FREE to different potential Buyers'
                            },
                            {
                                icon: () => <MdPeopleAlt className={cn("text-4xl mx-auto")} />,
                                title: 'Connect with Buyers directly',
                                description: 'Your contact details will be shared to the interested Buyers so that they can contact you directly for the deal'
                            },
                            {
                                icon: () => <FaRupeeSign className={cn("text-4xl mx-auto")} />,
                                title: 'Sell Your Car At Ease',
                                description: "Negotiate your best price, and sell your car. MotoG doesn't charge any commission"
                            }
                        ].map((step, index) => (
                            <div key={index} className='bg-white p-6 rounded-lg shadow-md text-center'>
                                {step.icon()}
                                <h3 className='text-xl font-semibold mb-2 pt-2'>{step.title}</h3>
                                <p className='text-gray-600'>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='relative'>
                {/* Gradient overlay at bottom of image section to blend with form */}
                <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent'></div>
                <div className='py-8 bg-gradient-to-r from-[#e2effb] from-10% via-[#f3f9fe] via-60% to-white to-80%'>
                    <div className='w-full max-w-4xl mx-auto'>
                        <Image
                            src={"/images/why_motog.png"}
                            height={0}
                            width={0}
                            sizes='100vw'
                            className='w-full h-auto'
                            alt="sell your car at pest price"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Sell;