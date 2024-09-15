import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import LeftSideBar from '@/components/layout/LeftSideBar'
import TopBar from '@/components/layout/TopBar'
import { ToasterProvider } from '@/lib/ToasterProvider'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin dashboard to manage data',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${inter.className} min-h-screen flex flex-col`}
                >
                    <ToasterProvider />
                    <div className="flex flex-grow max-lg:flex-col text-grey-1">
                        <LeftSideBar />
                        <TopBar />
                        <div className="flex-1">{children}</div>
                    </div>
                    {/* <Footer className="fixed bottom-0 w-full" /> */}
                </body>
            </html>
        </ClerkProvider>
    )
}
