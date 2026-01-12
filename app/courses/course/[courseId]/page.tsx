'use client';

import CourseOverviewPage from "@/components/pages/CourseOverviewPage";
import { useParams } from "next/navigation";

export default function CourseOverview() {
  const params = useParams();
  const courseId = params.courseId
  return (
    <CourseOverviewPage courseId={courseId} />
  );
}