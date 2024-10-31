"use-client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import Image from 'next/image'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        mounted && <NextThemesProvider {...props}>{children}</NextThemesProvider>
    );
}


export default function ThemeChanger() {
    const { theme, setTheme } = useTheme();

    // A sun / moon toggle
    return (
        <div className="block">
            {
                theme === 'dark' ? (
                    <Image width={30} height={30} src="/moon-solid.svg" alt='Dark mode switch' className='h-full hover:bg-accent p-1 rounded-sm mr-4' onClick={() => { setTheme('light') }} />
                ) : (
                    <Image width={30} height={30} src="/sun-solid.svg" alt='Light mode switch' className='h-full hover:bg-accent p-1 rounded-sm mr-4' onClick={() => { setTheme('dark') }} />
                )
            }
        </div>
    )
}