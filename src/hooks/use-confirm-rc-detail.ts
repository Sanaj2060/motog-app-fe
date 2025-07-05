import { create } from "zustand";
import { RcDetails } from "./use-cars";

type RcDetailsWithRegNo = RcDetails & { reg_no: string };

type UseConfirmStore = {
    show: boolean;
    details: RcDetailsWithRegNo | undefined;
    setShow: (b: boolean, details: RcDetailsWithRegNo | undefined) => void;
}

export const useConfirmRCDetail = create<UseConfirmStore>(set => ({
    show: false,
    details: undefined,
    setShow: (b: boolean, details: RcDetailsWithRegNo | undefined) => set(prev => ({ ...prev, show: b, details: details }))
}))
