'use client'

import Image from 'next/image'
import { navLinks } from '@/lib/constants'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const LeftSideBar = () => {
    const pathname = usePathname()

    return (
        <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
            <Image src="/logo.png" alt="logo" width={180} height={100} />

            <div className="flex flex-col gap-12">
                {navLinks.map((link) => (
                    <Link
                        key={link.url}
                        href={link.url}
                        className={`flex gap-4 text-body-medium ${
                            pathname === link.url ||
                            (link.url !== '/' && pathname.startsWith(link.url))
                                ? 'text-blue-1'
                                : 'text-grey-1'
                        }`}
                    >
                        {link.icon}
                        <p>{link.label}</p>
                    </Link>
                ))}
            </div>

            {/* <div className="flex gap-4 text-body-medium items-center">
                <UserButton />
                <p>Edit Profile</p>
            </div> */}
        </div>
    )
}

export default LeftSideBar
