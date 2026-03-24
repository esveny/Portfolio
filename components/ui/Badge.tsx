import { cn } from "@/lib/utils";

type BadgeProps = {
  children: string;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs tracking-wide text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}