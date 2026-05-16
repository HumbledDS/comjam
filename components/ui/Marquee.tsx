import { Fragment } from "react";

/**
 * Infinite horizontal ticker. Renders items twice for seamless loop with CSS keyframes
 * (defined as @keyframes ticker in globals.css).
 */
export function Marquee({ items, speed = 22 }: { items: readonly string[]; speed?: number }) {
  return (
    <div className="bg-blue overflow-hidden whitespace-nowrap py-[14px]">
      <div
        className="inline-flex"
        style={{ animation: `ticker ${speed}s linear infinite` }}
      >
        {[0, 1].map((loop) => (
          <Fragment key={loop}>
            {items.map((item, i) => (
              <span
                key={`${loop}-${i}`}
                className="inline-flex items-center gap-[18px] px-9 text-[10px] font-normal tracking-[2.5px] uppercase text-blue-pale"
              >
                <span className="w-[3px] h-[3px] rounded-full bg-blue-light shrink-0" />
                {item}
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
