'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const MobileNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle Menu" className="sm:hidden">
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-lg">导航</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:bg-accent hover:text-primary rounded-lg px-4 py-3 text-base font-semibold text-gray-900 transition-colors dark:text-gray-100"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
