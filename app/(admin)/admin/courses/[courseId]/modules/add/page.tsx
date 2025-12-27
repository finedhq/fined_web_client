'use client';

import ModuleForm from "@/components/uiComponents/ModuleForm";
import { useParams } from "next/navigation";

export default function ModuleAdd() {
  const params = useParams();
  const courseId = params.courseId
  return (
    <ModuleForm courseId={courseId} />
  );
}