import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "bg-pine text-pine-fg shadow-[0_2px_0_#143d34] hover:bg-pine-hover active:shadow-none",
        secondary:
          "border border-ink/15 bg-surface-2 text-ink shadow-[0_2px_0_rgb(28_25_21/0.14)] hover:bg-surface active:shadow-none",
        ghost: "text-ink-soft hover:bg-bg-warm hover:text-ink",
        outline:
          "border border-ink/20 bg-surface-2 text-ink hover:bg-surface",
      },
      size: {
        sm: "h-9 rounded-[10px] px-3 text-sm",
        md: "h-11 rounded-md px-4 text-sm",
        lg: "h-12 rounded-lg px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
