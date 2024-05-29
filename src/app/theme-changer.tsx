"use-client"
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';

export default function ThemeChanger() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <></>;
    return null
    return (
        <div className="block">
            The current theme is: {theme}
            <br />
            <button onClick={() => setTheme('light')}>Light Mode</button>
            <br />
            <button onClick={() => setTheme('dark')}>Dark Mode</button>
        </div>
    )
}