'use client';

import CardForm from "@/components/uiComponents/CardForm";
import { useParams } from "next/navigation";

export default function Cards() {
  const params = useParams();
  const moduleId = params.moduleId
  return (
    <CardForm moduleId={moduleId} />
  );
}