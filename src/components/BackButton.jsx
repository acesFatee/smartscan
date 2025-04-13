"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="flex mb-2 items-center gap-2 hover:bg-gray-100 rounded-full"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </Button>
  );
}
