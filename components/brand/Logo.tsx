import Image from "next/image";
import Link from "next/link";

type Theme = "blue" | "cream";

/**
 * Wordmark logo. Uses transparent PNGs extracted from the brand JPEGs so it
 * blends on any background. Pick `blue` for use on light backgrounds, `cream`
 * for use on dark backgrounds.
 */
export function Logo({
  variant = "blue",
  href = "/",
  width = 110,
  priority = false,
  className = "",
}: {
  variant?: Theme;
  href?: string | null;
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  const src = variant === "cream" ? "/brand/wordmark-cream.png" : "/brand/wordmark-blue.png";

  // Wordmark aspect ratio after trim() is roughly 3.6:1.
  const height = Math.round(width / 3.6);

  const img = (
    <Image
      src={src}
      alt="Com'Jam"
      width={width * 2}
      height={Math.round((width * 2) / 3.6)}
      priority={priority}
      sizes={`${width}px`}
      className={`object-contain ${className}`}
      style={{ width, height: "auto" }}
    />
  );

  if (href === null) return <span className="inline-block leading-none">{img}</span>;
  return (
    <Link
      href={href}
      aria-label="Com'Jam — accueil"
      className="inline-block leading-none"
    >
      {img}
    </Link>
  );
}
