"use client";

import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";

// This component is a workaround for the fact that @react-three/drei's Html component does not support server-side rendering (SSR) in Next.js. By using this SafeHtml component, we can ensure that the Html component is only rendered on the client side, preventing SSR issues.
export default function SafeHtml({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(handle);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Html {...props}>{children}</Html>;
}
