"use client";
import { FC, useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <EmptyState
      title="Ops!"
      subtitle="Algo deu errado. Tente novamente mais tarde."
    />
  );
};

export default ErrorState;
