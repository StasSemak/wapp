"use client";

import { useState, useEffect } from "react";

export function useIsMobile(breakpoint: number) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < breakpoint
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};
