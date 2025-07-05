"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { CarDto } from "@/hooks/use-cars";
import { useListingForms } from "@/hooks/use-listing-forms";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, startTransition, useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "sonner";

const steps = [
    "Car Details",
    "Price & Features",
    "Contact Information"
];

interface ISellForm {
    vehicle_type: string;
    kilometers_driven: number;
    price: number;
    city: string;
    seller_phone: string;
    description: string;
}

export default function DetailForm({ listing }: { listing?: CarDto }) {
    const token = useAuth(state => state.token);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<ISellForm>({
        vehicle_type: "car",
        kilometers_driven: 0,
        price: 0,
        city: "New Delhi",
        seller_phone: "",
        description: "",
    });
    const reg_no = useListingForms(state => state.reg_no);
    const showDetailForm = useListingForms(state => state.showForm);
    const setShowDetailForm = useListingForms(state => state.setShowForm);
    const setShowImageUpload = useListingForms(state => state.setShowImageUpload);

    useEffect(() => {
        if (listing) {
            setFormData({
                vehicle_type: listing.vehicle_type,
                kilometers_driven: listing.kilometers_driven,
                price: listing.price,
                city: listing.city,
                seller_phone: listing.seller_phone,
                description: listing.description || "",
            });
        }
    }, [listing]);

    if (!showDetailForm) return null;

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            console.log("formData:", formData);
            try {
                let res;
                if (listing) {
                    res = await axios.put(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/${listing.id}`,
                        formData,
                        { headers: { Authorization: `Bearer ${token?.access_token}` } }
                    );
                    toast.success("Listing updated successfully");
                } else {
                    res = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings`,
                        { ...formData, reg_no },
                        { headers: { Authorization: `Bearer ${token?.access_token}` } }
                    );
                    toast.success("Listing created successfully");
                }
                console.log("listing res:", res);
                setTimeout(() => {
                    setShowImageUpload(true, res.data.id);
                    setShowDetailForm(false, "");
                }, 500);
            } catch (e) {
                console.error("error listing: ", e);
                toast.error("Something went wrong!");
            }
        });
    }

    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
            <div className='w-full max-w-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-2xl'>
                <div className='flex flex-col sm:flex-row w-full shadow-lg rounded-xl bg-green-400'>
                    <Card id='listing-car-detail' className="w-full outline-none border-none shadow-none relative">
                        <IoCloseCircleOutline
                            className="absolute top-1 right-1 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800"
                            onClick={() => setShowDetailForm(false, "")} />
                        <CardHeader>
                            <div className="flex space-x-2">
                                {steps.map((step, index) => (
                                    <Badge key={`form-${index}`} variant={currentStep === index ? "default" : "outline"}
                                        onClick={() => index < currentStep && setCurrentStep(index)}
                                        className={cn("", index < currentStep && "hover:bg-neutral-50 hover:cursor-pointer")}
                                    >
                                        {step}
                                    </Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form id="sell-car-detail" onSubmit={onFormSubmit}>
                                <CarDetail currentStep={currentStep} formData={formData} setFormData={setFormData} />
                                <PriceNFeature currentStep={currentStep} formData={formData} setFormData={setFormData} />
                                <Contacts currentStep={currentStep} formData={formData} setFormData={setFormData} />
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            {currentStep < steps.length - 1 &&
                                <Button className="w-full" onClick={() => setCurrentStep(prev => prev + 1)}>
                                    Next
                                </Button>
                            }
                            {currentStep === steps.length - 1 &&
                                <Button type="submit" form="sell-car-detail" className="w-full">
                                    {listing ? 'Update' : 'Submit'}
                                </Button>
                            }
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const CarDetail = ({ currentStep, formData, setFormData }: { currentStep: number, formData: ISellForm, setFormData: Dispatch<SetStateAction<ISellForm>> }) => {
    if (steps[currentStep] !== "Car Details") return null;
    return (
        <div className="flex flex-col gap-6">
            <div className="gap-2 sm:flex sm:space-x-4">
                <Label htmlFor="vtype">Vehicle Type:</Label>
                <RadioGroup id="vtype" value={formData.vehicle_type} className="flex"
                    onValueChange={(val) => setFormData(prev => ({ ...prev, vehicle_type: val }))}
                >
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="car" id="r1" />
                        <Label htmlFor="r1">Car</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="bike" id="r2" />
                        <Label htmlFor="r2">Bike</Label>
                    </div>
                </RadioGroup>

            </div>
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="km-driven" className="w-32">Kilometers Driven</Label>
                </div>
                <Input id="km-driven"
                    value={formData.kilometers_driven}
                    onChange={(e) => setFormData(prev => ({ ...prev, kilometers_driven: parseInt(e.target.value) || 0 }))}
                    required
                    placeholder="How many kilometers have you driven?"
                />
            </div>
        </div>
    )
}

const PriceNFeature = ({ currentStep, formData, setFormData }: { currentStep: number, formData: ISellForm, setFormData: Dispatch<SetStateAction<ISellForm>> }) => {
    if (steps[currentStep] !== "Price & Features") return null;
    return (
        <div className="flex flex-col gap-6">
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="price">Price</Label>
                </div>
                <Input id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    required
                    placeholder="Please enter a selling price."
                />

            </div>
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="desc">Description</Label>
                </div>
                <Textarea id="desc"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Please give a description about the vehicle."
                />
            </div>
        </div>
    )
}

const Contacts = ({ currentStep, formData, setFormData }: { currentStep: number, formData: ISellForm, setFormData: Dispatch<SetStateAction<ISellForm>> }) => {
    if (steps[currentStep] !== "Contact Information") return null;
    return (
        <div className="flex flex-col gap-6">
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="city">City</Label>
                </div>
                <Input id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    required
                    placeholder="Please enter your city."
                />
            </div>
            <div className="gap-2 sm:flex sm:space-x-4">
                <div className="flex items-center">
                    <Label htmlFor="phone">Phone</Label>
                </div>
                <Input id="phone"
                    value={formData.seller_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, seller_phone: e.target.value }))}
                    required
                    placeholder="Please enter your contact number."
                />
            </div>
        </div>
    )
}

