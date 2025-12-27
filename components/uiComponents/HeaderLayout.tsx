"use client";
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('./Navbar'))

export default function HeaderLayout() {
  const pathname = usePathname();
  const routesWithoutFooter = [ '/signin', '/signup', '/admin'];
  const hideLayout = routesWithoutFooter.some(route => pathname.includes(route))

  return (
    <>
      {/* Conditional Navbar */}
      {!hideLayout && <div><Navbar /></div>}
    </>
  )
}