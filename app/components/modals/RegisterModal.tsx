"use client";
import { FC, useCallback, useState } from "react";
import { Github, Chrome } from "lucide-react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/auth/register", data);
      setIsLoading(false);
      toast.success("Conta criada com sucesso!");
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      toast.error("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bem-vindo ao Airbnb" />
      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder=" "
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder=" "
        required
      />
      <Input
        id="password"
        label="Senha"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder=" "
        required
      />
    </div>
  );

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4">
      <Button
        variant={"outline"}
        Icon={Chrome}
        onClick={() => signIn("google")}
      >
        Continuar com Google
      </Button>
      <Button
        variant={"outline"}
        Icon={Github}
        onClick={() => signIn("github")}
      >
        Continuar com Github
      </Button>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center items-center gap-2">
          <div>Já tem uma conta?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline font-semibold"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Cadastrar-se"
      actionLabel="Continuar"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
