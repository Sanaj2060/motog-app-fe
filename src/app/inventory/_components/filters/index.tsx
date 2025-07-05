'use client';
import BrandFilter from './brand-filter';
import FuelFilter from './fuel-filter';
import YearFilter from './year-filter';
import OwnerFilter from './owner-filter';
import PriceRangeFilter from './price-range-filter';

export interface FiltersSidebarProps {
    brand?: string;
    setBrand: (v?: string) => void;
    fuel?: string;
    setFuel: (v?: string) => void;
    year?: string;
    setYear: (v?: string) => void;
    transmission?: string;
    setTransmission: (v?: string) => void;
    owner?: string;
    setOwner: (v?: string) => void;
    priceRange: [number, number];
    setPriceRange: (v: [number, number]) => void;
    verifiedOnly: boolean;
    setVerifiedOnly: (v: boolean) => void;
    onFilterChange: () => void;
    onReset: () => void;
}

export default function FiltersSidebar({
    brand,
    setBrand,
    fuel,
    setFuel,
    year,
    setYear,
    owner,
    setOwner,
    priceRange,
    setPriceRange,
    onFilterChange,
    onReset,
}: FiltersSidebarProps) {
    return (
        <div className="p-4 space-y-4 w-full max-w-xs overflow-y-auto border-1 rounded-xl shadow-xl">
            <BrandFilter brand={brand} setBrand={setBrand} />
            <FuelFilter fuel={fuel} setFuel={setFuel} />
            <YearFilter year={year} setYear={setYear} />
            <OwnerFilter owner={owner} setOwner={setOwner} />
            <PriceRangeFilter priceRange={priceRange} setPriceRange={setPriceRange} />

            <div className="pt-4 flex justify-between text-sm">
                <button
                    onClick={onReset}
                    className="text-gray-500 hover:underline rounded-md px-2 py-1"
                >
                    Reset
                </button>
                <button
                    onClick={onFilterChange}
                    className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}
