"use client";
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('./Footer'))

export default function FooterLayout() {
  const pathname = usePathname();
  const routesWithoutFooter = ['/signin', '/signup', '/admin', '/onboarding'];
  const hideLayout = routesWithoutFooter.some(route => pathname.includes(route))

  return (
    <>
      {/* Conditional Footer */}
      {!hideLayout && <div><Footer /></div>}
    </>
  )
}