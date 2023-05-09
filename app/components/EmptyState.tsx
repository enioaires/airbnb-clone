"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Heading from "./Heading";
import { Button } from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "Nada encontrado",
  subtitle = "Tente remover ou alterar algum dos filtros",
  showReset,
}) => {
  const router = useRouter();

  const onReset = () => {
    router.push("/");
  };

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button variant={"outline"} onClick={onReset}>
            Remover filtros
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
