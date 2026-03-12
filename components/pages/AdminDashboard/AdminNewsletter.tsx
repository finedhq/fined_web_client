'use client';

import { useEffect, useState } from "react"
import instance from "../../lib/axios"
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/navigation";

export default function NewsLetter() {

  const router = useRouter();

  const { user, isLoading } = useUser()
  const isAuthenticated = !!user;
  const [role, setrole] = useState("")

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        console.log("Data from /api/me: ", data);
        setrole(data.roles?.[0] || "");
      })
      .catch(() => setrole(""));

  }, [isLoading, isAuthenticated]);
  useEffect(() => {
    console.log("Role updated:", role);
  }, [role]);

  const [data, setData] = useState({
    title: "",
    content: ""
  })

  async function send() {
    const res = await instance.post("/admin/newsletters", { data })
    if (res.data.message) {
      alert("Sent!")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full" >
      <div className="h-2/3 w-2/5 border-2 flex flex-col gap-8 p-4">
        <p>Title</p>
        <input className="border-2 p-2" type="text" value={data.title} onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))} />
        <p>Content</p>
        <input className="border-2 p-2" type="text" value={data.content} onChange={(e) => setData(prev => ({ ...prev, content: e.target.value }))} />
        <button className="bg-blue-500 py-3" onClick={send} >Send Emails</button>
      </div>
    </div>
  )
}