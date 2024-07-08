"use client";

import { useState, useEffect } from "react";

export function useIsMobile(breakpoint: number) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if(typeof window === "undefined") return;

    setIsMobile(window.innerWidth < breakpoint);

    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};
