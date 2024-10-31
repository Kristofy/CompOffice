"use client"

import './globals.css';

import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';


import ThemeChanger, { ThemeProvider } from './theme-changer';
import { signOut, useSession } from "next-auth/react";


const generalPages = [
    ["/general/country", "Country"],
    ["/general/currency", "Currency"],
    ["/general/currency-exchange", "Currency Exchange"],
    ["/general/holiday", "Holiday"],
    ["/general/region", "Region"],
    ["/general/instructor", "Instructor"],
    ["/general/instructor-company", "Instructor Company"],
    ["/general/instructor-holiday", "Instructor Holiday"],
    ["/general/pack", "Pack"],
    ["/general/pack-version", "Pack Version"],
    ["/general/topic", "Topic"],
    ["/general/unit", "Unit"],
    ["/general/unit-version", "Unit Version"],
    ["/general/pack-unit", "Pack Unit"],
];


const orderPages = [
    ["/order/customer", "Customer"],
    ["/order/industry", "Industry"],
    ["/order/order-pack-event", "Order Pack Event"],
    ["/order/customer-contact", "Customer Contact"],
    ["/order/order-pack-unit-event", "Order Pack Unit Event"],
    ["/order/order-participant", "Order Participant"],
    ["/order/participant", "Participant"],
    ["/order/instructor-pack-unit-event", "Instructor Pack Unit Event"],
    ["/order/instructor-pack-unit-event-dates", "Instructor Pack Unit Event Dates"],
    ["/order/pack-unit-event", "Pack Unit Event"],
    ["/order/pack-event", "Pack Event"],
];


const financePages = [
    ["/finance/invoice", "Invoice"],
    ["/finance/bank-account", "Bank Account"],
    ["/finance/bank-account-numbers", "Bank Account Numbers"],
    ["/finance/invoice-line", "Invoice Line"],
    ["/finance/invoice-line-type", "Invoice Line Type"],
    ["/finance/invoice-line-type-group", "Invoice Line Type Group"],
    ["/finance/invoice-type", "Invoice Type"],
    ["/finance/supplier", "Supplier"],
];

// function timeUntil(expiration: string): string {
//     const expirationData = new Date(expiration);
//     if (isNaN(expirationData.getTime())) {
//         throw new Error('Invalid date format');
//     }

//     const now = new Date();

//     const differenceInMilliseconds = expirationData.getTime() - now.getTime();

//     const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     // Format the result as HH:MM:SS
//     const formattedHours = String(hours).padStart(2, '0');
//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(seconds).padStart(2, '0');

//     return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
// }

export default function MainComponent({ children }: Readonly<{ children: React.ReactNode; }>) {

    const session = useSession();

    return (
        <ThemeProvider>
            <Menubar className='bg-primary rounded-none'>

                <MenubarMenu>
                    <MenubarTrigger className='hover:bg-accent'>
                        <Link href="/" shallow>
                            Home
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className='hover:bg-accent'>
                        General
                    </MenubarTrigger>
                    <MenubarContent>
                        {
                            generalPages.map(([url, title]) => (
                                <MenubarItem key={url as string} asChild>
                                    <Link href={url} shallow>
                                        {title}
                                    </Link>
                                </MenubarItem>
                            ))
                        }
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className='hover:bg-accent'>
                        Order
                    </MenubarTrigger>
                    <MenubarContent>
                        {
                            orderPages.map(([url, title]) => (
                                <MenubarItem key={url as string} asChild>
                                    <Link href={url} shallow>
                                        {title}
                                    </Link>
                                </MenubarItem>
                            ))
                        }
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className='hover:bg-accent'>
                        Finance
                    </MenubarTrigger>
                    <MenubarContent>
                        {
                            financePages.map(([url, title]) => (
                                <MenubarItem key={url as string} asChild>
                                    <Link href={url} shallow>
                                        {title}
                                    </Link>
                                </MenubarItem>
                            ))
                        }
                    </MenubarContent>
                </MenubarMenu>
                <div className='w-full h-full'>
                    <div className='h-full w-max ml-auto flex flex-row align-middle items-center'>
                        <p className='text-sm my-auto mr-4'>
                            {session.data?.user?.name}
                        </p>
                        <ThemeChanger />
                        <MenubarMenu>
                            <MenubarTrigger className='mr-4 hover:bg-accent' onClick={(() => { signOut(); })}>
                                Sign Out
                            </MenubarTrigger>
                        </MenubarMenu>
                    </div>
                </div>
            </Menubar>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
    )
}