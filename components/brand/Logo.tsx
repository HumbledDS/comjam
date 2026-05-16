import Image from "next/image";
import Link from "next/link";

type Theme = "blue" | "beige";

/**
 * Wordmark logo. The source JPEGs are roughly square with the wordmark
 * centered in a sea of background padding — so we use object-cover with a
 * tight 4:1 aspect to crop to the wordmark itself.
 *
 * Pick the theme matching the surrounding bg so the JPEG background blends.
 */
export function Logo({
  on = "beige",
  href = "/",
  width = 140,
  priority = false,
  className = "",
}: {
  on?: Theme;
  href?: string | null;
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  const src = on === "blue" ? "/brand/wordmark-on-blue.jpg" : "/brand/wordmark-on-beige.jpg";
  // 3:1 aspect crops out empty bg above/below the wordmark. Width must fit the
  // full word — keep at least ~100px or the 'm' will get clipped.
  const height = Math.round(width * 0.32);
  const safeWidth = Math.max(width, 100);

  const img = (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: safeWidth, height }}
    >
      <Image
        src={src}
        alt="Com'Jam"
        fill
        priority={priority}
        sizes={`${safeWidth}px`}
        className="object-cover object-center"
        style={{ transform: "scale(1.25)" }}
      />
    </div>
  );

  if (href === null) return <span className="inline-block leading-none">{img}</span>;
  return (
    <Link href={href} aria-label="Com'Jam — accueil" className="inline-block leading-none">
      {img}
    </Link>
  );
}
