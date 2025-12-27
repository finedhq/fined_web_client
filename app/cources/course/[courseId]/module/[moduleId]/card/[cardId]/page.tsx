'use client';

import { useParams } from "next/navigation";
import ModuleContentPage from "@/components/pages/ModuleContentPage";

export default function ModuleContent() {
  const params = useParams();

  return (
    <ModuleContentPage params={params} />
  );
}