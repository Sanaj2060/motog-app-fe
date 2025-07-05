"use client";

import { extractYear } from "@/app/inventory/_components/car-card";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useConfirmRCDetail } from "@/hooks/use-confirm-rc-detail";
import { useListingForms } from "@/hooks/use-listing-forms";
import { toOrdinal } from "@/lib/my-utils";
import { ReactNode } from "react";
import { toast } from "sonner";

export default function ConfirmRcDetail() {
    const show = useConfirmRCDetail(state => state.show);
    const rc_details = useConfirmRCDetail(state => state.details);
    const setShow = useConfirmRCDetail(state => state.setShow);

    const setShowListingForm = useListingForms(state => state.setShowForm);

    if (show && !rc_details) {
        toast.warning("Undefined RC Details!");
        return null;
    }

    const onConfirmDetails = () => {
        if (!rc_details?.reg_no) {
            toast.warning("Something went wrong!");
            return;
        }
        setTimeout(() => {
            setShowListingForm(true, rc_details.reg_no);
            setShow(false, undefined);
        }, 300);
    }

    return (
        <Dialog open={show} onOpenChange={(b) => setShow(b, undefined)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="">Please Confirm Your Details</DialogTitle>
                    <DialogDescription className="hidden">
                        hidden Confirm RC Details description
                    </DialogDescription>
                </DialogHeader>
                {rc_details && (
                    <div className="flex flex-wrap space-x-12 space-y-2">
                        <Detail label="Model" value={rc_details.model} />
                        <Detail
                            label="Year"
                            value={extractYear(rc_details?.reg_date)}
                        />
                        <Detail label="Fuel" value={rc_details?.type} />
                        <Detail label="Owner"
                            value={<span>{rc_details?.owner_count}<sup>{toOrdinal(rc_details.owner_count)}</sup></span>} />
                        <Detail label="Manufacturer" value={rc_details.vehicle_manufacturer_name} />
                        <Detail label="Norms Type" value={rc_details.norms_type} />
                        <Detail label="Seat Capacity" value={rc_details.vehicle_seat_capacity} />
                        <Detail label="Original Colour" value={rc_details.vehicle_colour} />
                    </div>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={onConfirmDetails}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function Detail({ label, value }: { label: string; value: string | number | ReactNode }) {
    if (!value) return null;
    return (
        <div className="flex flex-col">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
        </div>
    );
}

