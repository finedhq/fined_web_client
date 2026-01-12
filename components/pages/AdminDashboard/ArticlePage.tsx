'use client';

import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/navigation";

const ArticlePage = ({ article, onClose }: any) => {
  const router = useRouter();

  const modalRef = useRef<HTMLDivElement>(null);

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

  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close on outside click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (modalRef.current && !modalRef.current.contains(e?.target as Node)) {
      onClose();
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/admin/articles?article=${article.id}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("🔗 Link copied to clipboard!");
    } catch (err) {
      console.error("❌ Failed to copy link:", err);
      alert("❌ Failed to copy the link.");
    }
  };

  return (

    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 px-4 py-4"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-3xl w-full relative shadow-lg animate-fade-in overflow-scroll max-h-screen"
      >
        {/* Header buttons */}
        <div className="absolute top-3 right-3 flex gap-3">
          <button
            onClick={handleShare}
            title="Share Article"
            className="text-blue-600 hover:text-blue-800 text-xl transition"
          >
            🔗
          </button>
          <button
            onClick={onClose}
            title="Close"
            className="text-gray-600 hover:text-red-500 text-2xl transition"
          >
            ✕
          </button>
        </div>

        {/* Article Content */}
        <h1 className="text-2xl sm:text-3xl font-bold my-4">{article.title}</h1>

        {article.image_url && (
          <img
            src={article.image_url}
            alt={`${article.title} illustration`}
            className="w-full rounded mb-4"
          />
        )}

        <p className="whitespace-pre-line leading-relaxed text-gray-800 text-[1.05rem]">
          {article.content}
        </p>
      </div>
    </div>
  );
};

export default ArticlePage;
