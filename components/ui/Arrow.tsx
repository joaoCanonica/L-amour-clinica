export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 22 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`h-[10px] w-[22px] ${className}`}
    >
      <path d="M0 5h21M16.5 0.5 21 5l-4.5 4.5" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`h-3 w-3 ${className}`}
    >
      <path d="M1 11 11 1M3.5 1H11v7.5" />
    </svg>
  );
}
