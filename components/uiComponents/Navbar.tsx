'use client';

import React, { useEffect, useState, useRef } from 'react'
import instance from '../lib/axios'
import toast from 'react-hot-toast'
import { FiMenu, FiX } from "react-icons/fi"
import { MdLogout } from "react-icons/md"
import { useUser } from '@auth0/nextjs-auth0'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import SmartImage from './SmartImage';

export default function Navbar() {

	const router = useRouter();
	const pathname = usePathname();

	const { user, isLoading } = useUser();
	const isAuthenticated = !!user;
	const [role, setrole] = useState("")
	const [email, setEmail] = useState("")

	const [hasUnseen, setHasUnseen] = useState(false)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const loginWithPopup = () => {
		router.push(`/auth/login?returnTo=${pathname}`);
	}

	const logout = () => {
		router.push(`/auth/logout?returnTo=${window.location.origin}`);
	}

	// useEffect(() => {
	// 	if (!isLoading && isAuthenticated) {
	// 		setEmail(user?.email || "")
	// 		console.log(user)
	// 		const roles = user?.["https://fined.com/roles"]
	// 		setrole(roles?.[0] || "")
	// 		console.log(roles)
	// 	}
	// }, [isLoading, isAuthenticated])
	useEffect(() => {
		if (isLoading || !isAuthenticated) return;

		fetch("/api/auth/me")
			.then(res => res.json())
			.then(data => {
			console.log("Data from /api/me: ",data);
			setrole(data.roles?.[0] || "");
			})
			.catch(() => setrole(""));
			
	}, [isLoading, isAuthenticated]);
	useEffect(() => {
		console.log("Role updated:", role);
	}, [role]);

	async function fetchHasUnseen() {
		try {
			const res = await instance.post("/home/hasunseen", { email });
			if (res) {
				setHasUnseen(res.data);
			}
		} catch (error) {
			toast.error("Failed to fetch notifications status.");
		}
	}

	useEffect(() => {
		if (!email) return
		fetchHasUnseen()
	}, [email])

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div>
			{isAuthenticated ?
				<header className="flex flex-col md:flex-row md:items-center bg-[#f7fafc] box-border sm:pb-2 pb-1 sm:mb-2 mb-1">
					{/* Mobile and Tablet Header */}
					<div className="flex justify-between items-center w-full mt-4 xl:hidden px-4">
						<div onClick={() => router.push('/')} className="flex flex-col items-center font-bold text-lg max-w-45 overflow-hidden whitespace-nowrap cursor-pointer">
							<SmartImage
								src="/logo.png"
								alt="FinEd logo"
								width={160} height={60}
								className="w-auto h-full"
								containerClassName='h-12 sm:h-14'
							/>
							<span className='text-[#4100bc] text-[10px] -mt-2' >Beta</span>
						</div>
						<div className="flex items-center gap-4">
							<div onClick={() => router.push("/notifications")} className="relative bg-white rounded-full p-2 shadow-sm cursor-pointer">
								<SmartImage
									src="/bell.png"
									alt="Bell Icon"
									width={24}
									height={24}
									className='w-6'
								/>
								{hasUnseen && (
									<div className="absolute top-1 right-1 w-3 h-3 bg-amber-400 rounded-full" />
								)}
							</div>
							<button className="p-2 text-2xl" onClick={toggleSidebar}>
								{isSidebarOpen ? <FiX /> : <FiMenu />}
							</button>
						</div>
					</div>

					{/* Desktop Header */}
					<div className="hidden xl:flex xl:flex-row xl:items-center w-full mt-8 px-10 justify-between">
						<div onClick={() => router.push('/home')} className="flex flex-col items-center font-bold text-lg w-32 max-w-45 overflow-hidden whitespace-nowrap cursor-pointer">
							<SmartImage
								src="/logo.png"
								alt="FinEd logo"
								width={160} height={60}
								className="w-auto h-full"
								containerClassName='h-12 sm:h-14'
							/>
							<span className='text-[#4100bc] text-[10px] -mt-2' >Beta</span>
						</div>
						<nav className="flex flex-wrap justify-center gap-5">
							<button
								className={`w-28 h-10 text-base border-none rounded-full cursor-pointer shadow-sm font-medium transition-colors ${pathname === '/home' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
								onClick={() => router.push('/home')}
							>
								Home
							</button>
							<button
								className={`w-28 h-10 text-base border-none rounded-full cursor-pointer shadow-sm font-medium transition-colors ${pathname.startsWith('/courses') ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
								onClick={() => router.push('/courses')}
							>
								Courses
							</button>
							<button
								className={`w-28 h-10 text-base border-none rounded-full cursor-pointer shadow-sm font-medium transition-colors ${pathname === '/articles' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
								onClick={() => router.push('/articles')}
							>
								Articles
							</button>
							<button
								className={`w-28 h-10 text-base border-none rounded-full cursor-pointer shadow-sm font-medium transition-colors ${pathname.startsWith('/fin-tools') ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
								onClick={() => router.push('/fin-tools')}
							>
								FinTools
							</button>
							{role === "Admin" && (
								<button
									className={`px-6 py-2 text-base border-none rounded-full cursor-pointer font-medium transition-colors ${pathname === '/admin' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
									onClick={() => router.push('/admin')}
								>
									Admin Dashboard
								</button>
							)}
						</nav>
						<div className='flex items-center gap-4' >
							<div className='h-12 w-12 rounded-full bg-white flex justify-center items-center hover:bg-gray-200 transition-all duration-200 shadow-sm cursor-pointer' >
								<MdLogout
									title='Log out'
									className={`text-2xl`}
									onClick={() => {
										sessionStorage.setItem("forceReload", "true");
										logout()
									}}
								/>
							</div>
							<div onClick={() => router.push("/notifications")} className="relative bg-white rounded-full p-3 shadow-sm cursor-pointer">
								<SmartImage
									src="/bell.png"
									alt="Bell Icon"
									width={24}
									height={24}
									className='w-6'
								/>
								{hasUnseen && (
									<div className="absolute top-0 right-1 w-3 h-3 bg-amber-400 rounded-full" />
								)}
							</div>
						</div>
					</div>

					{/* Sidebar for mobile and tablet */}
					<div
						className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:hidden`}
					>
						<div className="flex justify-between items-center p-4 border-b border-gray-200 text-black">
							<h2 className="text-lg font-bold">Menu</h2>
							<button onClick={toggleSidebar} className="text-2xl text-black">
								<FiX />
							</button>
						</div>
						<nav className="flex flex-col p-4 gap-2">
							<button
								className={`px-4 py-2 text-base border-none rounded-full cursor-pointer font-medium transition-colors text-left ${pathname === '/home' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
								onClick={() => { router.push('/home'); setIsSidebarOpen(false); }}
							>
								Home
							</button>
							<button
								className={`px-4 py-2 text-base border-none rounded-full cursor-pointer font-medium transition-colors text-left ${pathname === '/courses' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
								onClick={() => { router.push('/courses'); setIsSidebarOpen(false); }}
							>
								Courses
							</button>
							<button
								className={`px-4 py-2 text-base border-none rounded-full cursor-pointer font-medium transition-colors text-left ${pathname === '/articles' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
								onClick={() => { router.push('/articles'); setIsSidebarOpen(false); }}
							>
								Articles
							</button>
							<button
								className={`px-4 py-2 text-base border-none rounded-full cursor-pointer font-medium transition-colors text-left ${pathname === '/fin-tools' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
								onClick={() => { router.push('/fin-tools'); setIsSidebarOpen(false); }}
							>
								FinTools
							</button>
							{role === "Admin" && (
								<button
									className={`px-4 py-2 text-base border-none rounded-full cursor-pointer font-medium transition-colors text-left ${pathname === '/admin' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
									onClick={() => { router.push('/admin'); setIsSidebarOpen(false); }}
								>
									Admin Dashboard
								</button>
							)}
							<button
								className={`px-4 py-2 text-base border-none rounded-full cursor-pointer font-medium transition-colors text-left bg-white text-gray-700 hover:bg-gray-200`}
								onClick={() => {
									logout();
									setIsSidebarOpen(false);
								}}
							>
								LogOut
							</button>
						</nav>
					</div>
					{
						isSidebarOpen && (
							<div
								className="fixed inset-0 bg-black/50 z-40"
								onClick={toggleSidebar}
							></div>
						)
					}
				</header>
				:
				<div>
					<header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-10 lg:px-16 py-3 sm:py-6 bg-[#f7fafc]">
						<div className="flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0">
							<div onClick={() => router.push('/')} className="flex flex-col items-center font-bold text-lg max-w-50 overflow-hidden whitespace-nowrap cursor-pointer">
								<SmartImage
									src="/logo.png"
									alt="FinEd logo"
									width={160} height={60}
									className="w-auto h-full"
									containerClassName='h-12 sm:h-14'
								/>
								<span className='text-[#4100bc] text-[10px] -mt-2' >Beta</span>
							</div>
							<button
								className="sm:hidden text-gray-800 focus:outline-none p-2"
								onClick={toggleSidebar}
								aria-label="Toggle menu"
							>
								<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
								</svg>
							</button>
						</div>
						<nav role="navigation" aria-label="Main navigation" className="hidden sm:flex flex-wrap items-center justify-center sm:justify-end gap-6">
							<Link href="/courses" aria-label="View courses" className={`w-28 h-10 text-base flex items-center justify-center border-none rounded-full cursor-pointer shadow-sm font-medium transition-colors ${pathname.startsWith('/courses') ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>Courses</Link>
							<Link href="/articles" aria-label="View articles" className={`w-28 h-10 text-base flex items-center justify-center border-none rounded-full cursor-pointer shadow-sm font-medium transition-colors ${pathname === '/articles' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>Articles</Link>
							<Link href="/about" aria-label="About us" className={`w-28 h-10 text-base flex items-center justify-center border-none rounded-full cursor-pointer shadow-sm font-medium transition-colors ${pathname === '/about' ? 'bg-amber-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>About Us</Link>
							<button onClick={loginWithPopup} className="px-5 py-2 bg-amber-400 text-white rounded-md font-bold hover:bg-amber-500 transition-colors duration-200 text-base sm:text-lg cursor-pointer">Sign up / Login</button>
						</nav>
					</header>
					<div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out sm:hidden z-50`}>
						<div className="flex justify-between items-center p-5 border-b text-black">
							<span className="font-bold text-lg">Menu</span>
							<button onClick={toggleSidebar} className="text-gray-800 focus:outline-none" aria-label="Close menu">
								<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
								</svg>
							</button>
						</div>
						<nav role="navigation" aria-label="Mobile navigation" className="flex flex-col p-5 space-y-5">
							<Link href="/courses" aria-label="View courses" className="text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200 text-lg" onClick={toggleSidebar}>Courses</Link>
							<Link href="/articles" aria-label="View articles" className="text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200 text-lg" onClick={toggleSidebar}>Articles</Link>
							<Link href="/about" aria-label="About us" className="text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200 text-lg" onClick={toggleSidebar}>About Us</Link>
							<button onClick={() => { loginWithPopup(); toggleSidebar(); }} className="px-5 py-2 bg-amber-400 text-white rounded-lg font-bold hover:bg-amber-500 transition-colors duration-200 text-lg cursor-pointer">Sign up / Login</button>
						</nav>
					</div>
					{isSidebarOpen && (
						<div
							className="fixed inset-0 bg-white bg-opacity-80 sm:hidden z-40"
							onClick={toggleSidebar}
							aria-hidden="true"
						></div>
					)}
				</div>
			}
		</div>
	)
}