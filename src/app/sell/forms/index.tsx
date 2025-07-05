'use client';

import { Input } from '@/components/ui/input';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { useLoginPopup } from '@/hooks/use-login-popup';
import { toast } from 'sonner';
import DetailForm from './detail-form';
import PhotoUploads from './photo-upload';
import { Button } from '@/components/ui/button';
import ConfirmRcDetail from './confirm-rc-details';
import { useConfirmRCDetail } from '@/hooks/use-confirm-rc-detail';
import { useSearchParams } from 'next/navigation';
import { useCarDetails } from '@/hooks/use-car-details';
import { useListingForms } from '@/hooks/use-listing-forms';

const SellCarVerification = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const [regNum, setRegNum] = useState("");
  const token = useAuth(state => state.token);
  const showLogin = useLoginPopup(state => state.setShow);
  const setShowConfirmDetail = useConfirmRCDetail(state => state.setShow);
  const searchParams = useSearchParams();
  const listingId = searchParams.get('id');
  const { data: carDetails } = useCarDetails(listingId!);
  const setShowForm = useListingForms(state => state.setShowForm);

  useEffect(() => {
    if (carDetails) {
      setShowForm(true, carDetails.reg_no);
    }
  }, [carDetails, setShowForm]);


  const verifyRegNo = async () => {
    if (!regNum) {
      toast.warning("Please enter a registration number.")
      return;
    }

    if (!token) {
      console.log("login required");
      showLogin(true);
      return;
    }

    try {
      const result = await axios.post(
        `${baseUrl}/vehicle-verify`,
        { reg_no: regNum }, { headers: { Authorization: `Bearer ${token?.access_token}` } }
      );

      console.log("verify result: ", result);
      if (result.status === 200) {
        toast.success("Car verified successfully!");
        setTimeout(() => {
          setShowConfirmDetail(true, result.data.data);
          setRegNum("");
        }, 300);
        return;
      }
    } catch (err) {
      const e = err as AxiosError;
      console.error("error verifying reg no.:", e);
      if (e.response && e.response.status === 401)
        toast.error("Authentication Failed! Please try logging in again.");
      else if (e.response && e.response.status >= 400)
        toast.error("Bad Request! Please try again.");
      else if (e.response && e.response?.status >= 500) toast.error("Something Went Wrong!");
    }
  }

  if (listingId) {
    return (
      <section className='relative z-10 w-full'>
        <DetailForm listing={carDetails} />
        <PhotoUploads />
      </section>
    )
  }

  return (
    <section className='relative z-10 w-full'>
      <div className='w-full max-w-3xl mx-auto text-center bg-white rounded-xl [box-shadow:0_0_10px_rgba(0,0,0,0.3)] py-2 sm:py-8 px-4 sm:px-32'>
        <h2 className='text-xl sm:text-3xl font-bold mb-6'>Enter your car Registration Number</h2>
        <div className='space-y-4 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-4 items-center max-w-xl'>
          <Input id='reg-no' value={regNum}
            onChange={(e) => setRegNum(e.target.value)}
            className='w-full sm:!text-lg font-semibold py-2 sm:py-6 uppercase'
            placeholder='Enter your car number'
            required />
          <Button
            size="lg"
            className="bg-blue-600/90 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold"
            onClick={verifyRegNo}
          >
            Sell My Car
          </Button>
        </div>
      </div>
      <ConfirmRcDetail />
      <DetailForm />
      <PhotoUploads />
    </section>
  )
}


export default SellCarVerification;