"use client";
import { cn } from "@/app/utils";
import { VariantProps, cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

const categoryInputVariant = cva(
  "rounded-xl border-2 p-4 flex items-center gap-3 hover:border-black transition cursor-pointer",
  {
    variants: {
      selected: {
        false: "border-neutral-200",
        true: "border-black",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

interface CategoryInputProps extends VariantProps<typeof categoryInputVariant> {
  icon: LucideIcon;
  label: string;
  onClick: (value: string) => void;
}

const CategoryInput: FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={cn(categoryInputVariant({ selected }))}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
