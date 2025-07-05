"use client";

import { Button } from "@/components/ui/button";
import useDetectLocation from "@/hooks/use-detect-location";
import useLocation from "@/hooks/use-location";
import useManualLocation from "@/hooks/use-manual-location";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginBtn from "./login-btn";
import { FC } from "react";

const Navbar: FC<{ isMenuOpen: boolean }> = ({ isMenuOpen }) => {
    const path = usePathname();
    useDetectLocation();
    const setShow = useManualLocation(state => state.setShow);
    const locality = useLocation(state => state.locality);
    return (
        <div className={cn("md:block", isMenuOpen ? "block" : "hidden")}>
            <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2">
                    <nav className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-1">
                        <Button
                            variant="link"
                            className={cn("justify-start md:justify-center text-sm font-medium md:pl-0", path === "/sell" && "underline")}
                        >
                            <Link href={"/sell"}>SELL CAR</Link>
                        </Button>
                        <Button variant="link" className={cn("justify-start md:justify-center text-sm font-medium", path === "/buy" && "underline")}>
                            <Link href={"/inventory"}>BUY CAR</Link>
                        </Button>
                        <Button variant="link" className={cn("justify-start md:justify-center text-sm font-medium", path === "/about-us" && "underline")}>
                            <Link href={"/about-us"} className=''>ABOUT US</Link>
                        </Button>
                        <Button variant="link" className={cn("justify-start md:justify-center text-sm font-medium", path === "/tips-n-advices" && "underline")}>
                            <Link href={"/tips-n-advices"}>TIPS & ADVICES</Link>
                        </Button>
                    </nav>

                    {/* Location and Mobile Login */}
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-3 md:mt-0">
                        <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 justify-start md:justify-center pr-0 mr-0"
                            onClick={() => setShow(true)}>
                            <MapPin className="h-4 w-4" />
                            <span className=''>{locality?.structuredFormat.mainText.text ?? 'Select Location'}</span>
                        </Button>

                        <div className="md:hidden">
                            <LoginBtn />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;