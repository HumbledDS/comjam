import { ReactNode } from "react";

export function Label({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`${light ? "label-light" : "label"} ${className}`}>
      {children}
    </div>
  );
}
