'use client';

import ModulesPage from "@/components/pages/AdminDashboard/ModulesPage";
import { useParams } from "next/navigation";

export default function Modules() {
  const params = useParams();
  const courseId = params.courseId
  return (
    <ModulesPage courseId={courseId} />
  );
}