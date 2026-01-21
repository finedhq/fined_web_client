'use client';

import React, { useEffect, useState } from "react"
import instance from "../lib/axios"
import toast from 'react-hot-toast'
import { useUser } from "@auth0/nextjs-auth0";

const ContactUs = () => {

	const { user, isLoading } = useUser()
	const isAuthenticated = !!user;
	const [role, setrole] = useState("")

	const [email, setEmail] = useState("")

	const [hasUnseen, setHasUnseen] = useState(false)
	const [enteredEmail, setEnteredEmail] = useState("")
	const [isEnteredEmail, setIsEnteredEmail] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const [form, setForm] = useState({ name: "", email: "", message: "" })
	const [submitted, setSubmitted] = useState(false)

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await instance.post("/contact/user", form)

			setSubmitted(true);
			setForm({
				name: user?.name || "",
				email: user?.email || "",
				message: "",
			});

			toast("✅ Message submitted successfully!");
		} catch (error) {
			toast("❌ Failed to submit. Please try again.");
		}
	};

	return (
		<div className="bg-gray-100 h-full w-full pb-5 flex flex-col">
			<div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
				<h1 className="text-4xl font-bold text-center text-primary mb-6">📞 Contact Us</h1>
				<p className="text-center mb-10 text-gray-600">
					We'd love to hear from you! Whether it's feedback, suggestions, or support — reach out below.
				</p>

				<div className="grid md:grid-cols-2 gap-8">
					{/* Contact Form */}
					<form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg space-y-4">
						<div>
							<label className="block text-sm font-medium mb-1">Your Name</label>
							<input
								type="text"
								name="name"
								required
								value={form.name}
								onChange={handleChange}
								className="w-full px-3 py-2 border rounded-lg focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">Email Address</label>
							<input
								type="email"
								name="email"
								required
								value={form.email}
								onChange={handleChange}
								className="w-full px-3 py-2 border rounded-lg focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">Your Message</label>
							<textarea
								name="message"
								rows={5}
								required
								value={form.message}
								onChange={handleChange}
								className="w-full px-3 py-2 border rounded-lg focus:outline-none"
							></textarea>
						</div>

						<button
							type="submit"
							className="bg-primary text-white font-semibold bg-amber-400 px-4 py-2 rounded-lg hover:bg-primary/90 transition"
						>
							Send Message
						</button>

						{submitted && (
							<p className="text-green-600 mt-2">✅ Your message has been sent!</p>
						)}
					</form>

					{/* Contact Info */}
					<div className="bg-primary/5 p-6 rounded-lg">
						<h2 className="text-2xl font-semibold text-primary mb-4">Reach Us</h2>
						<p className="mb-4">
							Have a question or need help with something on FinEd? Reach out through any of the following:
						</p>
						<ul className="space-y-3">
							<li>
								📧 <strong>Email:</strong>{" "}
								<a href="mailto:fined.personalfinance@gmail.com" className="text-blue-600 underline">
									fined.personalfinance@gmail.com
								</a>
							</li>
							<li>
								🗨️ <strong>Feedback Form:</strong> Available on your dashboard
							</li>
							<li>
								🕐 <strong>Response Time:</strong> Within 24–48 hours
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
