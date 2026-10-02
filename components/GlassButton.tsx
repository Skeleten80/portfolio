import Link from "next/link";
import { ReactNode } from "react";
import styles from "./GlassButton.module.css";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  ariaLabel?: string;
}

export default function GlassButton({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  ariaLabel,
}: Props) {
  const className = `glass-thin ${styles.btn} ${
    variant === "primary" ? styles.primary : styles.ghost
  }`;
  if (href) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
