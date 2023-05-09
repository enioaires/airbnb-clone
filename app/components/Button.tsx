"use client";
import * as React from "react";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "../utils";
import { LucideIcon } from "lucide-react";

const buttonVariants = cva(
  "relative disabled:opacity-70 rounded-lg hover:opacity-80 transition w-full",
  {
    variants: {
      variant: {
        default: "bg-rose-500 border-rose-500 text-white",
        outline: "bg-white border-black text-black hover:bg-gray-50",
      },
      size: {
        default: "py-3 text-md font-semibold border-2",
        sm: "py-1 text-sm font-light border-[1px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  Icon?: LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, Icon, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {Icon && <Icon size={24} className="absolute left-4 top-3" />}
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {Icon && <Icon size={24} className="absolute left-4 top-3" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
