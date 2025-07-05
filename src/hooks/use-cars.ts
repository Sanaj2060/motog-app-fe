'use client';

import { useQuery } from '@tanstack/react-query';

// lib/api.ts
export interface FetchCarsParams {
    skip?: number;              // Default: 0
    limit?: number;             // Default: 10
    city?: string | null;
    vehicle_type?: 'car' | 'bike' | null;
    min_price?: number | null;
    max_price?: number | null;
    min_year?: number | null;
    max_year?: number | null;
    min_km_driven?: number | null;
    max_km_driven?: number | null;
}

export type CarDto = {
    vehicle_type: string;
    reg_no: string;
    kilometers_driven: number;
    price: number;
    usr_inp_city: string;
    city: string;
    seller_phone: string;
    description: string;
    id: number;
    user_id: number;
    is_active: boolean;
    created_at: string;
    owner_email: string;
    rc_details: RcDetails;
    images: ImageData[];
};

export type RcDetails = {
    type: string;
    model: string;
    reg_date: string;
    norms_type: string;
    owner_count: string;
    vehicle_manufacturer_name: string;
    vehicle_seat_capacity: string;
    vehicle_colour: string;
};

type ImageData = {
    id: number;
    url: string;
    is_primary: boolean;
};

async function fetchCars(params: FetchCarsParams): Promise<CarDto[]> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings`);
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') url.searchParams.append(k, String(v));
    });
    const res = await fetch(url.toString(), {
        next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
}

export function useCars(params: FetchCarsParams) {
    return useQuery({
        queryKey: ['cars', params],
        queryFn: () => fetchCars(params)
    });
}
