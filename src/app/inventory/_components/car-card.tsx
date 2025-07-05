import React from "react";

import { CarDto } from "@/hooks/use-cars";
import Link from "next/link";

export function extractYear(dateString: string): number {
    return new Date(dateString).getFullYear();
}

const CarCard: React.FC<{ car: CarDto }> = ({ car }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative">
                <img
                    src={car.images.find(image => image.is_primary)?.url}
                    alt={`car image - ${car.images.find(image => image.is_primary)?.url}`}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                    &#8377; {car.price.toLocaleString('en-IN')}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{extractYear(car.rc_details.reg_date)} {car.rc_details.model}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{car.kilometers_driven} kms</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{car.rc_details?.type}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {car.usr_inp_city}
                    </div>
                </div>

                <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                    <Link href={`/inventory/${car.id}`}>View Details</Link>
                </button>
            </div>
        </div >
    );
};

export default CarCard;