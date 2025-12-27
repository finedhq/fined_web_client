'use client';

import CardsPage from "@/components/pages/AdminDashboard/CardsPage";
import { useParams } from "next/navigation";

export default function Cards() {
  const params = useParams();
  const moduleId = params.moduleId
  return (
    <CardsPage moduleId={moduleId} />
  );
}