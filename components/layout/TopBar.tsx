'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { navLinks } from '@/lib/constants'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

const TopBar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false)
    const pathname = usePathname()

    return (
        <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
            <Image src="/logo.png" alt="logo" width={180} height={100} />

            <div className="flex gap-8 max-md:hidden px-2">
                {navLinks.map((link) => (
                    <Link
                        key={link.url}
                        href={link.url}
                        className={`flex gap-4 text-body-medium ${pathname === link.url ? 'text-blue-1' : 'text-grey-1'}`}
                    >
                        <p>{link.label}</p>
                    </Link>
                ))}
            </div>

            <div className="relative flex gap-4 items-center">
                <Menu
                    className="cursor-pointer md:hidden"
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                />
                {dropdownMenu && (
                    <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
                        {navLinks.map((link) => (
                            <Link
                                key={link.url}
                                href={link.url}
                                className={`flex gap-4 text-body-medium ${pathname === link.url ? 'text-blue-1' : 'text-grey-1'}`}
                            >
                                {link.icon}
                                <p>{link.label}</p>
                            </Link>
                        ))}
                    </div>
                )}
                <UserButton />
            </div>
        </div>
    )
}

export default TopBar
