'use client';

import React, { useEffect, useState } from "react"
import instance from "../lib/axios"
import toast from 'react-hot-toast'
import { useUser } from "@auth0/nextjs-auth0";

const HelpPage = () => {

	const { user, isLoading } = useUser()
	const isAuthenticated = !!user;
	const [role, setrole] = useState("")

	const [email, setEmail] = useState("")

	const [hasUnseen, setHasUnseen] = useState(false)
	const [enteredEmail, setEnteredEmail] = useState("")
	const [isEnteredEmail, setIsEnteredEmail] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			setEmail(user?.email || "")
			const roles = user?.["https://fined.com/roles"]
			setrole(roles?.[0] || "")
		}
	}, [isLoading, isAuthenticated])

	async function fetchHasUnseen() {
		try {
			const res = await instance.post("/home/hasunseen", { email })
			if (res) {
				setHasUnseen(res.data)
			}
		} catch (error) {
			toast.error("Failed to fetch notifications status.")
		}
	}

	async function fetchEnteredEmail() {
		try {
			const res = await instance.post("/articles/getenteredemail", { email })
			if (res.data[0]?.enteredEmail) {
				setEnteredEmail(res.data[0]?.enteredEmail || null)
				setIsEnteredEmail(true)
			}
		} catch (error) {
			setEnteredEmail("")
			setIsEnteredEmail(false)
		}
	}

	useEffect(() => {
		if (!email) return
		fetchEnteredEmail()
		fetchHasUnseen()
	}, [email])

	const saveEmail = async () => {
		if (enteredEmail === "") return
		setIsSaved(true)
		try {
			await instance.post("/articles/saveemail", { email, enteredEmail })
			toast.success("🎉 Subscribed successfully.")
			setIsEnteredEmail(true)
		} catch (err) {
			toast.error("❌ Failed to save email.")
		} finally {
			setIsSaved(false)
		}
	}

	const removeEmail = async () => {
		setIsSaved(true)
		try {
			await instance.post("/articles/removeemail", { email, enteredEmail })
			toast.success("Unsubscibed successfully.")
			setEnteredEmail("")
			setIsEnteredEmail(false)
		} catch (err) {
			toast.error("❌ Failed to remove email.")
		} finally {
			setIsSaved(false)
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsSidebarOpen(false);
		};
		if (isSidebarOpen) {
			window.addEventListener('keydown', handleKeyDown);
			return () => window.removeEventListener('keydown', handleKeyDown);
		}
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="bg-gray-100 h-full w-full pb-5 flex flex-col">
			<div className="max-w-5xl text-sm sm:text-lg mx-auto px-4 py-8 text-gray-800">
				<h1 className="text-2xl sm:text-4xl font-bold mb-12 text-center text-primary">📘 Help & Support – FinEd</h1>

				<section className="mb-10">
					<h2 className="text-xl sm:text-2xl font-bold text-secondary mb-4">🔹 Getting Started</h2>
					<ul className="space-y-3">
						<li><strong>What is FinEd?</strong> FinEd is a platform to improve your financial habits through lessons, tracking, and scoring.</li>
						<li><strong>Do I need to sign up?</strong> Yes, log in or sign up to start using personalized features.</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-xl sm:text-2xl font-bold text-secondary mb-4">📚 Learning with Courses</h2>
					<ul className="space-y-3">
						<li><strong>How do I begin a course?</strong> Go to the Courses tab, pick a topic, and start completing cards.</li>
						<li><strong>What are cards?</strong> Cards are mini-lessons or quizzes. Complete them to earn FinStars.</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-xl sm:text-2xl font-bold text-secondary mb-4">💰 Tracking Your Finances</h2>
					<ul className="space-y-3">
						<li><strong>How to log transactions?</strong> Go to Transactions → Add income or expense → Categorize.</li>
						<li><strong>How does budgeting work?</strong> Set monthly budgets by category. FinEd tracks your progress automatically.</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-xl sm:text-2xl font-bold text-secondary mb-4">🏆 Scoring System</h2>
					<ul className="space-y-3">
						<li><strong>What is FinScore?</strong> Your score based on course completions, budgeting, tracking, and activity.</li>
						<li><strong>How to earn points?</strong> Learn, quiz, budget, log spending, and maintain streaks.</li>
						<li><strong>What are FinStars?</strong> Stars earned on cards/quizzes. They boost your FinScore.</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-xl sm:text-2xl font-bold text-secondary mb-4">🔁 Streaks & Motivation</h2>
					<ul className="space-y-3">
						<li><strong>What are streaks?</strong> Daily activity builds streaks. Skipping resets them.</li>
						<li><strong>Are there rewards?</strong> Yes! Longer streaks give bonus FinScore.</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-xl sm:text-2xl font-bold text-secondary mb-4">💡 Recommendations</h2>
					<ul className="space-y-3">
						<li><strong>How does it work?</strong> We use your tags (goals, profile) to match useful schemes.</li>
						<li><strong>Where to find them?</strong> Head to the Recommendations tab for personalized ideas.</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-xl sm:text-2xl font-bold text-secondary mb-4">📊 Progress Tracking</h2>
					<ul className="space-y-3">
						<li><strong>How do I track my progress?</strong> Use the Dashboard to view courses completed, budgets met, and your FinScore.</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-xl sm:text-2xl font-bold text-secondary mb-4">🙋‍♂️ Need More Help?</h2>
					<ul className="space-y-3">
						<li>📧 Email us at: <a href="mailto:fined.personalfinance@gmail.com" className="text-blue-600 underline">fined.personalfinance@gmail.com</a></li>
						<li>💬 Use the Feedback form in your dashboard</li>
						<li>🛠️ FAQs and Forum coming soon!</li>
					</ul>
				</section>

				<section className="bg-primary/5 p-2 rounded-lg">
					<h2 className="text-xl font-bold mb-2">🚀 Tips to Maximize FinEd</h2>
					<ul className="list-disc list-inside space-y-2">
						<li>Set your Monthly Budget early.</li>
						<li>Explore different topics to improve overall literacy.</li>
						<li>Check the Leaderboard for friendly competition.</li>
					</ul>
				</section>
			</div>
		</div>
	);
};

export default HelpPage;
