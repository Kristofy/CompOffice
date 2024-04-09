import './globals.css';

import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter as FontSans } from 'next/font/google';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

import { auth, signOut } from '@/auth';
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { cn } from '@/lib/utils';
import TRPCProvider from '@/trpc/client/Provider';

import AuthProvider from './auth-provider';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<TRPCProvider>
				<html lang="en">
					<body
						className={cn('min-h-screen bg-secondary font-sans antialiased', fontSans.variable)}>
						<AuthProvider>
							<form
								action={async () => {
									'use server';

									await signOut();
								}}>
								<button type="submit">Sign out</button>;
							</form>
							<Menubar>
								<MenubarMenu>
									<MenubarTrigger>
										<Link href="/" shallow>
											Home
										</Link>
									</MenubarTrigger>
								</MenubarMenu>
								<MenubarMenu>
									<MenubarTrigger>Services</MenubarTrigger>
									<MenubarContent>
										<MenubarItem asChild>
											<Link href="/unit" shallow>
												Module
											</Link>
										</MenubarItem>
										<MenubarItem>
											New Window <MenubarShortcut>⌘N</MenubarShortcut>
										</MenubarItem>
										<MenubarItem disabled>New Incognito Window</MenubarItem>
										<MenubarSeparator />
										<MenubarSub>
											<MenubarSubTrigger>Share</MenubarSubTrigger>
											<MenubarSubContent>
												<MenubarItem>Email link</MenubarItem>
												<MenubarItem>Messages</MenubarItem>
												<MenubarItem>Notes</MenubarItem>
											</MenubarSubContent>
										</MenubarSub>
										<MenubarSeparator />
										<MenubarItem>
											Print... <MenubarShortcut>⌘P</MenubarShortcut>
										</MenubarItem>
									</MenubarContent>
								</MenubarMenu>
								<MenubarMenu>
									<MenubarTrigger>Order</MenubarTrigger>
									<MenubarContent>
										<MenubarItem asChild>
											<Link href="/participant" shallow>
												Participants
											</Link>
										</MenubarItem>
										<MenubarItem>
											New Window <MenubarShortcut>⌘N</MenubarShortcut>
										</MenubarItem>
										<MenubarItem disabled>New Incognito Window</MenubarItem>
										<MenubarSeparator />
										<MenubarSub>
											<MenubarSubTrigger>Share</MenubarSubTrigger>
											<MenubarSubContent>
												<MenubarItem>Email link</MenubarItem>
												<MenubarItem>Messages</MenubarItem>
												<MenubarItem>Notes</MenubarItem>
											</MenubarSubContent>
										</MenubarSub>
										<MenubarSeparator />
										<MenubarItem>
											Print... <MenubarShortcut>⌘P</MenubarShortcut>
										</MenubarItem>
									</MenubarContent>
								</MenubarMenu>
								<MenubarMenu>
									<MenubarTrigger>Edit</MenubarTrigger>
									<MenubarContent>
										<MenubarItem>
											Undo <MenubarShortcut>⌘Z</MenubarShortcut>
										</MenubarItem>
										<MenubarItem>
											Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
										</MenubarItem>
										<MenubarSeparator />
										<MenubarSub>
											<MenubarSubTrigger>Find</MenubarSubTrigger>
											<MenubarSubContent>
												<MenubarItem>Search the web</MenubarItem>
												<MenubarSeparator />
												<MenubarItem>Find...</MenubarItem>
												<MenubarItem>Find Next</MenubarItem>
												<MenubarItem>Find Previous</MenubarItem>
											</MenubarSubContent>
										</MenubarSub>
										<MenubarSeparator />
										<MenubarItem>Cut</MenubarItem>
										<MenubarItem>Copy</MenubarItem>
										<MenubarItem>Paste</MenubarItem>
									</MenubarContent>
								</MenubarMenu>
								<MenubarMenu>
									<MenubarTrigger>View</MenubarTrigger>
									<MenubarContent>
										<MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
										<MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
										<MenubarSeparator />
										<MenubarItem inset>
											Reload <MenubarShortcut>⌘R</MenubarShortcut>
										</MenubarItem>
										<MenubarItem disabled inset>
											Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
										</MenubarItem>
										<MenubarSeparator />
										<MenubarItem inset>Toggle Fullscreen</MenubarItem>
										<MenubarSeparator />
										<MenubarItem inset>Hide Sidebar</MenubarItem>
									</MenubarContent>
								</MenubarMenu>
								<MenubarMenu>
									<MenubarTrigger>Settings</MenubarTrigger>
									<MenubarContent>
										<MenubarItem inset></MenubarItem>
									</MenubarContent>
								</MenubarMenu>
							</Menubar>
							{children}
						</AuthProvider>
						<Toaster position="top-right" reverseOrder={false} />
					</body>
				</html>
			</TRPCProvider>
		</SessionProvider>
	);
}
