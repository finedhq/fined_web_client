"use client";
import React, { useState, useEffect } from "react";
import instance from "../../lib/axios"
import Loader from "../../uiComponents/Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const CoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // 👈 new state
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

  const fetchCourses = async () => {
    try {
      const res = await instance.get("/courses/getall");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false); // 👈 end loading
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id: string) => {
    const res = await instance.delete(`/courses/${id}`)
    if (res) {
      setCourses(prev => prev.filter(course => course.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-r from-blue-50 to-indigo-50 p-10">
      <section className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            All Courses
          </h1>
          <span>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
              <Link href={"/admin"}>Home</Link>
            </h2>
          </span>
          <button
            onClick={() => router.push("/admin/courses/add")}
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add New Course
          </button>
        </header>

        {loading ? (
          <Loader></Loader>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500 mt-24 text-lg font-medium">
            No courses available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <article
                key={course.id}
                className="cursor-pointer rounded-xl bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                ) : (
                  <div className="w-full h-48 bg-indigo-100 rounded-t-xl flex items-center justify-center text-indigo-400 font-semibold text-lg">
                    No Image
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between" >
                    <h2 className="text-xl font-bold text-gray-900 mb-3 truncate">
                      {course.title}
                    </h2>
                    <button onClick={() => handleDeleteCourse(course.id)} >Delete Course</button>
                  </div>
                  <p className="text-gray-700 mb-5 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 font-semibold tracking-wide">
                    <span>Modules: {course.modules_count}</span>
                    <span>Duration: {course.duration} min</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/courses/${course.id}/modules`);
                  }}
                  className="mt-4 text-sm text-indigo-600 font-medium hover:underline"
                >
                  View Modules →
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default CoursesPage;
