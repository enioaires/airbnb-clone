"use client";
import { VariantProps, cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { FC, useCallback } from "react";
import { cn } from "../utils";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const categoryVariant = cva(
  "flex flex-col items-center justify-center fap-2 p-3 border-b-2 hover:text-neutral-800 cursor-pointer",
  {
    variants: {
      selected: {
        false: "border-transparent text-neutral-500",
        true: "border-b-neutral-800 text-neutral-800",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

interface CategoryBoxProps extends VariantProps<typeof categoryVariant> {
  label: string;
  icon: LucideIcon;
}

const CategoryBox: FC<CategoryBoxProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label.toLowerCase(),
    };

    if (params?.get("category") === label.toLowerCase()) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div onClick={handleClick} className={cn(categoryVariant({ selected }))}>
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export { CategoryBox, categoryVariant };
