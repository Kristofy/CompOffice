import { ReadClaims, auth } from "@/auth";
import { permanentRedirect } from "next/navigation";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    console.log("Trying to log in", session)
    if (((session?.user.role ?? 0) & ReadClaims.Order) === 0) {
        // return permission denied
        const error = encodeURIComponent("You do not have permission to access this page.");
        const pathname = process.env.NEXT_PUBLIC_URL ?? ""
        permanentRedirect(`${pathname}/?error=${error}`);
    }

    return (<>
        {children}
    </>
    );
}