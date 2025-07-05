'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import useLocation from "@/hooks/use-location";
import CarCard from "./inventory/_components/car-card";
import { CarDto } from "@/hooks/use-cars";

export default function Home() {
  const location = useLocation(state => state.locality);
  const { data: featuredCars } = useQuery<AxiosResponse<CarDto[]>>({
    queryKey: ["featured-listings", location?.structuredFormat.mainText.text],
    queryFn: () => axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/homepage-listings?city=${location?.structuredFormat.mainText.text ?? 'New Delhi'}`
    ),
  });

  console.log("data", featuredCars);
  console.log(featuredCars && featuredCars.data.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Custom Backdrop */}
      <section className="mt-28 sm:mt-16 md:mt-28 relative w-full h-[420px] sm:h-[550px] md:h-[520px] lg:h-[450px] xl:h-[600px]">
        <Image
          src="/images/hero-background.png"
          alt="Car marketplace backdrop"
          fill
          priority
          className="object-cover object-bottom-right hidden md:inline-block"
          quality={100}
        />
        <Image
          src="/images/hero-img2.png"
          alt="Car marketplace backdrop"
          fill
          priority
          className="object-cover object-bottom md:hidden"
          quality={100}
        />

        {/* Card Overlay Responsive */}
        <div className="relative z-10 container mx-auto px-8 pt-4 lg:pt-[10%]">
          <Card className="hidden lg:block max-w-sm shadow-lg mb-6 ml-[4%]">
            <CardContent className="py-6 xl:p-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                SELL NOW @ EASE
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mb-6 font-medium">
                Free Listing & Buying for Lifetime
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 text-base font-bold"
                  asChild
                >
                  <Link href="/sell">List Your Vehicle</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-gray-900 py-4 text-base font-bold border-gray-300"
                  asChild
                >
                  <Link href="/inventory">Browse Inventory</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="lg:hidden w-full mx-auto sm:pt-12">
            <div className="p-6 sm:p-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-nowrap">
                SELL NOW @ EASE
              </h1>
              <p className="text-base sm:text-lg text-white mb-6 font-medium">
                Free Listing & Buying for Lifetime
              </p>

              <div className="flex flex-wrap gap-3 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 text-base font-bold"
                  asChild
                >
                  <Link href="/sell">List Your Vehicle</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-gray-900 py-4 text-base font-bold border-gray-300"
                  asChild
                >
                  <Link href="/inventory">Browse Inventory</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Listings */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Vehicles</h2>
          <p className="text-muted-foreground text-base">Latest listings this week in {location?.structuredFormat.mainText.text ?? 'New Delhi'}</p>
        </div>

        {featuredCars && featuredCars.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:w-5/6 mx-auto">
            {featuredCars.data.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No vehicles available at the moment</p>
          </div>
        )}
      </section>
    </div>
  );
}
