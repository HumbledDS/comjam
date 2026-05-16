import Link from "next/link";
import { ReactNode, ComponentProps } from "react";

type Variant = "primary" | "outline" | "light" | "ghost";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "children" | "className">)
);

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  outline: "btn btn-outline",
  light: "btn btn-light",
  ghost: "btn-ghost",
};

export function Button({ children, variant = "primary", className = "", ...rest }: ButtonProps) {
  const cls = `${variantClass[variant]} ${className}`.trim();

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {children}
        {variant === "ghost" && <span>→</span>}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
