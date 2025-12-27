'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from '../../lib/axios';
import Loader from "../../uiComponents/Loader";
import { ParamValue } from 'next/dist/server/request/params';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0';

const ModulesPage = ({ courseId }: { courseId: ParamValue }) => {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { user, isLoading } = useUser()
  const isAuthenticated = !!user;
  const [role, setrole] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    } else if (!isLoading && isAuthenticated) {
      const roles = user?.["https://fined.com/roles"]
      setrole(roles?.[0] || "")
      if (roles?.[0] !== "Admin") router.push("/")
    }
  }, [isLoading, isAuthenticated])

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get(`/modules/course/${courseId}`);
        setModules(res.data);
      } catch (err) {
        console.error('❌ Error fetching modules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [courseId]);

  const handleDeleteModule = async (id: string) => {
    const res = await axios.delete(`/modules/${id}`)
    if (res) {
      setModules(prev => prev.filter(module => module.id !== id));
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-linear-to-br from-white to-blue-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700 mb-1">Modules</h1>
            <p className="text-gray-500">Course ID: <span className="font-semibold text-gray-700">{courseId}</span></p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="text-sm px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition"
            >
              ← Back to Admin
            </Link>
            <button
              onClick={() => router.push(`/admin/courses/${courseId}/modules/add`)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              + Add Module
            </button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : modules.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-lg text-gray-500">No modules found for this course.</p>
            <button
              onClick={() => router.push(`/admin/courses/${courseId}/modules/add`)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Create Your First Module
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="bg-white shadow-md border border-gray-200 rounded-lg p-5 hover:shadow-lg transition"
              >
                <div className='flex justify-between' >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {mod.title}
                  </h3>
                  <button onClick={() => handleDeleteModule(mod.id)} >Delete Module</button>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {mod.description || <span className="italic text-gray-400">No description provided.</span>}
                </p>
                <button
                  onClick={() => router.push(`/admin/modules/${mod.id}/cards`)}
                  className="text-indigo-600 hover:underline text-sm mt-3 inline-block"
                >
                  View Cards →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ModulesPage;
