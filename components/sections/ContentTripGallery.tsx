"use client";

import Image from "next/image";

/**
 * Amsterdam (Édition 01) gallery — an infinite horizontal marquee mixing the
 * 8 photos and 2 autoplaying muted clips, to show the real vibe of the
 * previous edition. Reuses the global scroll-left keyframes.
 */
export function ContentTripGallery({
  photos,
  videos,
}: {
  photos: readonly { src: string; thumb: string }[];
  videos: readonly string[];
}) {
  // Interleave videos among the photos (after 3rd and 6th photo).
  const items: Array<{ kind: "photo"; src: string; thumb: string } | { kind: "video"; src: string }> = [];
  photos.forEach((p, i) => {
    items.push({ kind: "photo", ...p });
    if (i === 2 && videos[0]) items.push({ kind: "video", src: videos[0] });
    if (i === 5 && videos[1]) items.push({ kind: "video", src: videos[1] });
  });

  const looped = [...items, ...items];

  return (
    <div className="overflow-hidden" aria-label="Galerie de l'édition Amsterdam">
      <div
        className="flex gap-4"
        style={{
          width: "max-content",
          willChange: "transform",
          animationName: "scroll-left",
          animationDuration: "90s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {looped.map((item, i) => (
          <figure
            key={item.src + i}
            className="shrink-0 bg-beige-dark overflow-hidden"
            style={{ width: "min(68vw, 300px)", height: "min(88vw, 400px)" }}
          >
            {item.kind === "photo" ? (
              <Image
                src={item.thumb}
                alt=""
                width={800}
                height={1067}
                sizes="(max-width: 640px) 68vw, 300px"
                className="block w-full h-full object-cover"
              />
            ) : (
              <video
                className="block w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
