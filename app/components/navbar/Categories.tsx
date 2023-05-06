"use client";
import { FC } from "react";
import Container from "../Container";
import {
  Palmtree,
  Home,
  Castle,
  Wand2,
  Snowflake,
  Sun,
  Pizza,
  Mountain,
  Wind,
  Bird,
} from "lucide-react";
import { CategoryBox } from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

interface CategoriesProps {}

export const categories = [
  {
    label: "Praia",
    icon: Palmtree,
    description: "Próximo a praia",
  },
  {
    label: "Chalés",
    icon: Home,
    description: "Chalés aconchegantes",
  },
  {
    label: "Fazendas",
    icon: Bird,
    description: "Fazendas com animais",
  },
  {
    label: "Castelos",
    icon: Castle,
    description: "Castelos medievais",
  },
  {
    label: "Luxo",
    icon: Wand2,
    description: "Luxo e conforto",
  },
  {
    label: "Ártico",
    icon: Snowflake,
    description: "Frio e neve",
  },
  {
    label: "Deserto",
    icon: Sun,
    description: "Calor e areia",
  },
  {
    label: "Diversão",
    icon: Pizza,
    description: "Diversão e festas",
  },
  {
    label: "Grutas",
    icon: Mountain,
    description: "Grutas e cavernas",
  },
  {
    label: "Moinhos",
    icon: Wind,
    description: "Moinhos de vento",
  },
];

const Categories: FC<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  const isSelected = (label: string) => {
    return label.toLowerCase() === category;
  };

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={isSelected(category.label)}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
