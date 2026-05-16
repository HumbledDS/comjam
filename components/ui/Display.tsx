import { CSSProperties, ReactNode } from "react";

type Size = "sm" | "md" | "lg" | "xl";

const sizeStyle: Record<Size, CSSProperties> = {
  sm: { fontSize: "clamp(28px, 3vw, 40px)" },
  md: { fontSize: "clamp(36px, 3.5vw, 54px)" },
  lg: { fontSize: "clamp(44px, 5vw, 72px)" },
  xl: { fontSize: "clamp(52px, 6vw, 92px)" },
};

/**
 * Editorial display heading. Lines that should be italicized (via <em>) are passed
 * via the lines array + emphasizedLine helper or as children with <em> manually.
 */
export function Display({
  children,
  light = false,
  className = "",
  size = "md",
  style,
  as: As = "h1",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
  size?: Size;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <As
      className={`${light ? "display-light" : "display"} ${className}`}
      style={{ ...sizeStyle[size], ...style }}
    >
      {children}
    </As>
  );
}

export function DisplayLines({
  lines,
  emphasizedLine,
  light = false,
  className = "",
  size = "md",
  as = "h2",
}: {
  lines: readonly string[];
  emphasizedLine?: number;
  light?: boolean;
  className?: string;
  size?: Size;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Display as={as} light={light} className={className} size={size}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {emphasizedLine === i ? <em>{line}</em> : line}
        </span>
      ))}
    </Display>
  );
}
