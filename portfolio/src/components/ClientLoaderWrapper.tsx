"use client";

import { useState } from "react";
import Loader3D from "./Loader3D"; // Ensure the path points to your Loader component

export default function ClientLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return false;
    const navEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    return navEntries.length > 0 && navEntries[0]?.type === "reload";
  });

  return (
    <>
      {showLoader && (
        <Loader3D onFinish={() => setShowLoader(false)} />
      )}
      {children}
    </>
  );
}