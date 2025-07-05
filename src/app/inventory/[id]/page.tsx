"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCarDetails } from "@/hooks/use-car-details";
import { ReactNode, useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { extractYear } from "../_components/car-card";
import { toOrdinal } from "@/lib/my-utils";

export default function CarDetailsPage() {
    const { id } = useParams() as { id: string };
    const { data: car, isLoading, isError } = useCarDetails(id);
    const [showContact, setShowContact] = useState(false);

    if (isLoading)
        return <p className="text-center mt-20">Loading car details...</p>;
    if (isError || !car)
        return <p className="text-center mt-20">Car not found.</p>;

    return (
        <div className="min-h-screen w-full bg-white pt-32 md:pt-36 lg:pt-40 pb-16 sm:px-8 md:px-20 overflow-x-hidden">
            <div className="max-w-screen-lg mx-auto space-y-6">
                {/* Title & Price */}
                <div className="px-4 md:px-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        CAR NAME
                    </h1>
                    <div className="mt-1 flex items-center gap-4 text-gray-700">
                        <span className="text-lg font-bold">
                            ₹{car.price.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>

                {/* Carousel Images */}
                <Carousel className="w-full">
                    <CarouselContent>
                        {car.images.map(({ url }, index: number) => (
                            <CarouselItem key={index}>
                                <div className="w-full relative aspect-[4/3] rounded-md overflow-hidden shadow">
                                    <Image
                                        src={url}
                                        alt={`image ${index + 1}`}
                                        className="object-cover"
                                        fill
                                        sizes="100vw"
                                        priority={index === 0}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:inline-flex" />
                    <CarouselNext className="hidden md:inline-flex" />
                    <CarouselPrevious className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full w-9 h-9" />
                    <CarouselNext className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full w-9 h-9" />
                </Carousel>

                {/* Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 text-sm text-gray-700 px-4 md:px-0">
                    <Detail
                        label="Year"
                        value={extractYear(car.rc_details?.reg_date)}
                    />
                    <Detail label="Fuel" value={car?.rc_details?.type} />
                    <Detail label="Owner"
                        value={<span>{car?.rc_details?.owner_count}<sup>{toOrdinal(car.rc_details.owner_count)}</sup></span>} />
                    <Detail
                        label="KMs Driven"
                        value={`${car.kilometers_driven.toLocaleString()} kms`}
                    />
                    <Detail label="Manufacturer" value={car.rc_details.vehicle_manufacturer_name} />
                    <Detail label="Norms Type" value={car.rc_details.norms_type} />
                    <Detail label="Seat Capacity" value={car.rc_details.vehicle_seat_capacity} />
                    <Detail label="Original Colour" value={car.rc_details.vehicle_colour} />
                    <Detail label="Location" value={car.usr_inp_city} />
                </div>

                {/* Description */}
                {car.description && (
                    <div className="text-sm text-gray-800 leading-relaxed px-4 md:px-0">
                        <h2 className="font-semibold text-base mb-2">Description</h2>
                        <p>{car.description}</p>
                    </div>
                )}

                {/* Contact Seller CTA */}
                {!showContact ? (
                    <div className="pt-4 px-4 md:px-0">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto "
                            onClick={() => setShowContact(true)}
                        >
                            Contact Seller
                        </Button>
                    </div>
                ) : (
                    <div className="rounded-md border p-4 shadow-sm bg-gray-50 space-y-2 px-4">
                        <h2 className="text-base sm:text-lg font-semibold">
                            Seller Contact
                        </h2>
                        <div className="flex items-center gap-2 text-sm">
                            <Phone size={16} /> {car.seller_phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Mail size={16} /> {car.owner_email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin size={16} /> {car.usr_inp_city}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function Detail({ label, value }: { label: string; value: string | number | ReactNode }) {
    return (
        <div className="flex flex-col">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
        </div>
    );
}
