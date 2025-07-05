"use client";

import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CarDto } from "@/hooks/use-cars";
import CarCard from "../inventory/_components/car-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyListingsPage() {
  const { token } = useAuth();

  const { data: myListings, refetch } = useQuery<CarDto[]>({
    queryKey: ["my-listings", token?.user.id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/my-listings`,
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!token,
  });

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
          },
        }
      );
      refetch();
    } catch (error) {
      console.error("Failed to delete listing", error);
    }
  };

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg">Please log in to see your listings.</p>
        <Button asChild className="mt-4">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Listings</h1>
      {myListings && myListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myListings.map((car) => (
            <div key={car.id} className="relative">
              <CarCard car={car} />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                >
                  <Link href={`/sell?id=${car.id}`}>Edit</Link>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(car.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            You have no active listings.
          </p>
          <Button asChild className="mt-4">
            <Link href="/sell">Create a Listing</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
