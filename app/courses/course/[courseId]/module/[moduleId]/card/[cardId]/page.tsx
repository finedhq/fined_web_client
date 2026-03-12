'use client';

import ModuleContentPage from "@/components/pages/ModuleContentPage";
import { useParams } from "next/navigation";

export default function ModuleContent() {
  const params = useParams();

  return (
    <ModuleContentPage params={params} />
  );
}