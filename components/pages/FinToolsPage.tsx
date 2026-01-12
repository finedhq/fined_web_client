'use client';

import React from "react"
import { useState, useEffect } from "react"
import instance from "../lib/axios"
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";
import toast from "react-hot-toast";
import SmartImage from "../uiComponents/SmartImage";

const tools = [
	{
		name: "FinTracker",
		image: "/expense.png",
		description: "Track your monthly expenses, set budgets, and visualize your financial habits.",
		route: "/fin-tools/expensetracker",
		available: true
	},
	// {
	//     name: "Loan Calculator",
	//     image: "/images/loan-calculator.png",
	//     description: "Calculate EMIs and track your loan payments easily.",
	//     available: false
	// },
	// {
	//     name: "Investment Planner",
	//     image: "/images/investment-planner.png",
	//     description: "Plan your investments based on goals and timelines.",
	//     available: false
	// }
]

export default function FinToolsPage() {
	const router = useRouter()

	const { user, isLoading } = useUser()
	const isAuthenticated = !!user;
	const [role, setrole] = useState("")

	const [email, setEmail] = useState("")
	const [hasUnseen, setHasUnseen] = useState(false)

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push("/")
		} else if (!isLoading && isAuthenticated) {
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

	useEffect(() => {
		if (!email) return
		fetchHasUnseen()
	}, [email])

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="sm:pb-5 bg-gray-100">
			<div className="px-4 sm:px-10 py-10" >
				<h1 className="text-3xl font-bold mb-8 text-gray-800">FinTools</h1>
				<div className="w-68 mx-auto sm:mx-0">
					{tools.map((tool, index) => (
						<div
							key={index}
							className={`rounded-2xl shadow-md overflow-hidden bg-white border ${tool.available ? "hover:shadow-xl cursor-pointer" : "opacity-60"
								} transition-all duration-300`}
							onClick={() => tool.available && router.push(tool.route)}
						>
							<SmartImage
								src={tool.image}
								alt={tool.name}
								fill
								className="object-fill"
								containerClassName="shrink-0 w-full h-48"
							/>
							<div className="p-4">
								<h2 className="text-xl font-semibold text-gray-800 mb-2">
									{tool.name}
								</h2>
								<p className="text-gray-600">{tool.description}</p>
								{!tool.available && (
									<span className="inline-block mt-3 text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
										Coming Soon
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
