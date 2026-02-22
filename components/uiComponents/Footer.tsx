'use client';

import { useUser } from '@auth0/nextjs-auth0';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import instance from '../lib/axios'
import toast, { Toast } from 'react-hot-toast'
import Image from 'next/image';

export default function Footer() {

	const { user, isLoading } = useUser()
	const isAuthenticated = !!user;
	const [role, setrole] = useState("")
	const [email, setEmail] = useState("")

	const [isSaved, setIsSaved] = useState(false)
	const [enteredEmail, setEnteredEmail] = useState("")
	const [isEnteredEmail, setIsEnteredEmail] = useState(false)

	useEffect(() => {
		if (isLoading || !isAuthenticated) return;

		fetch("/api/auth/me")
			.then(res => res.json())
			.then(data => {
				console.log("Data from /api/me: ", data);
				setEmail(user.email || '')
				setrole(data.roles?.[0] || "");
			})
			.catch(() => setrole(""));

	}, [isLoading, isAuthenticated]);
	useEffect(() => {
		console.log("Role updated:", role);
	}, [role]);

	async function fetchEnteredEmail() {
		try {
			const res = await instance.post("/articles/getenteredemail", { email });
			if (res.data[0]?.enteredEmail) {
				setEnteredEmail(res.data[0]?.enteredEmail || null);
				setIsEnteredEmail(true);
			}
		} catch (error) {
			setEnteredEmail("");
			setIsEnteredEmail(false);
			toast.error("Failed to fetch your subscription email.");
		}
	}

	useEffect(() => {
		if (!email) return
		fetchEnteredEmail()
	}, [email]);

	const customToast = (message: string, t: Toast) => (
		<div className="fixed inset-0 z-20 bg-black/40 flex items-center justify-center">
			<div className="bg-white p-6 rounded-2xl shadow-xl w-125 space-y-4">
				<p className="text-xl font-bold text-red-600">⚠️ Alert</p>
				<p className="text-md font-semibold text-gray-700">
					{message}
				</p>
				<div className="flex justify-end pt-4">
					<button
						onClick={() => toast.dismiss(t.id)}
						className={`bg-amber-400 hover:bg-amber-500 transition-all duration-200 text-white px-4 py-2 rounded-lg ${isSaved ? "cursor-not-allowed" : "cursor-pointer"}`}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	)

	const saveEmail = async () => {
		if (enteredEmail === "") return;
		setIsSaved(true);
		try {
			await instance.post("/articles/saveemail", { email, enteredEmail });
			toast.success("🎉 Subscribed successfully.")
			setIsEnteredEmail(true);
		} catch (err) {
			toast((t) => customToast("Failed to save email.", t));
		} finally {
			setIsSaved(false);
		}
	};

	const removeEmail = async () => {
		setIsSaved(true);
		try {
			await instance.post("/articles/removeemail", { email, enteredEmail });
			toast.success("Unsubscribed successfully.");
			setEnteredEmail("");
			setIsEnteredEmail(false);
		} catch (err) {
			toast((t) => customToast("Failed to remove email.", t));
		} finally {
			setIsSaved(false);
		}
	};

	return (
		<div>
			<footer className="bg-[#f7fafc] p-6 sm:px-20 sm:py-10 flex flex-col sm:flex-row flex-wrap justify-between text-[#333] font-sans">
				<div className="flex-1 basis-full sm:basis-50 my-5 sm:m-5 min-w-50 flex flex-col items-center sm:items-start">
					<Image src="/logo.png" alt="FinEd Logo" width={50} height={50} className="h-12.5 mb-3" />
					<p className="text-sm sm:text-base text-gray-700 mb-4 text-center sm:text-left">Financial Education made Easy.</p>
					<div className="flex gap-4">
						<Link href="https://www.linkedin.com/company/fined-personal-finance/"><Image src="/linkedin.png" alt="LinkedIn" width={32} height={32} className="w-8 h-8 transition-transform duration-200 hover:scale-110 cursor-pointer" /></Link>
						<Link href="https://www.instagram.com/fined.personalfinance"><Image src="/insta.jpg" alt="Instagram" width={32} height={32} className="w-8 h-8 transition-transform duration-200 hover:scale-110 cursor-pointer" /></Link>
					</div>
				</div>
				<div className="flex-1 basis-full sm:basis-50 my-5 sm:m-5 min-w-50 font-semibold text-center sm:text-left">
					<h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-4">FEATURED</h4>
					<Link href="/courses" className="block mb-3 text-sm sm:text-base text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600">Courses</Link>
					<Link href="/articles" className="block mb-3 text-sm sm:text-base text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600">Articles</Link>
					<Link href="/fin-tools" className="block mb-3 text-sm sm:text-base text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600">FinTools</Link>
					<Link href="/about" className="block mb-3 text-sm sm:text-base text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600">About Us</Link>
				</div>
				<div className="flex-1 basis-full sm:basis-50 my-5 sm:m-5 min-w-50 font-semibold text-center sm:text-left">
					<h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-4">OTHER</h4>
					<Link href="/help" className="block mb-3 text-sm sm:text-base text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600">Help</Link>
					<Link href="/contact" className="block mb-3 text-sm sm:text-base text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600">Contact Us</Link>
					<Link href="/feedback" className="block mb-3 text-sm sm:text-base text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600">Feedback</Link>
					<Link href="/privacy-policy" className="block mb-3 text-sm sm:text-base text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600">Privacy Policy</Link>
					<Link href="/termsofservice" className="block mb-3 text-sm sm:text-base text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600">Terms of Service</Link>
				</div>
				<div className="newsletter my-5 sm:m-5 w-full sm:w-auto">
					<h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase mb-4">NEWSLETTER</h4>
					{isEnteredEmail ? (
						<div>
							<p className="py-3 pl-3 pr-10 sm:pr-28 w-full mb-3 border border-gray-200 rounded-md text-xs sm:text-sm box-border">{enteredEmail}</p>
							{isSaved ?
								<div className="flex items-center justify-center gap-2 text-[#fbbf24] font-semibold">
									<svg className="animate-spin h-5 w-5 text-[#fbbf24]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
									</svg>
									Unsubscribing...
								</div>
								:
								<button onClick={removeEmail} className="p-3 w-full bg-[#fbbf24] text-white font-semibold border-none rounded-md cursor-pointer transition-colors hover:bg-[#e6b640] box-border">
									Unsubscribe
								</button>
							}
						</div>
					) : (
						<div>
							<input
								value={enteredEmail}
								onChange={(e) => setEnteredEmail(e.target.value.trim())}
								type="email"
								placeholder="Enter your email address"
								className="p-3 w-full mb-3 border border-gray-200 rounded-md text-xs sm:text-sm box-border"
							/>
							{isSaved ?
								<button className="flex items-center justify-center gap-2 p-3 w-full bg-[#fbbf24] text-white font-semibold border-none rounded-md cursor-pointer transition-colors hover:bg-[#e6b640] box-border">
									<svg className="animate-spin h-5 w-5 text-[#fbbf24]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
									</svg>
									Subscribing...
								</button>
								:
								<button
									onClick={() => {
										if (isAuthenticated) {
											saveEmail();
										} else {
											toast.error("Please signin !");
										}
									}}
									className="p-3 w-full bg-[#fbbf24] text-white font-semibold border-none rounded-md cursor-pointer transition-colors hover:bg-[#e6b640] box-border"
								>
									Subscribe Now
								</button>
							}
						</div>
					)}
				</div>
			</footer>

			<p className="text-center justify-center w-full py-10 text-xs 2xl:max-w-350 2xl:mx-auto bg-gray-100 text-black">
				© Copyright {new Date().getFullYear()}, All Rights Reserved by FinEd.
			</p>
		</div>
	)
}