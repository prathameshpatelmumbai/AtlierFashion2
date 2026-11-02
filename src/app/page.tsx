"use client";

import { StudioProvider } from "@/context/StudioContext";
import { StudioShell } from "@/components/studio/StudioShell";

export default function Home() {
  return (
    <StudioProvider>
      <StudioShell />
    </StudioProvider>
  );
}
