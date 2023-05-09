"use client";
import { FC, useCallback, useState } from "react";
import { Github, Chrome } from "lucide-react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Login realizado com sucesso!");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error("Algo deu errado, tente novamente mais tarde.");
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bem-vindo de volta" />
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
    loginModal.onClose();
    registerModal.onOpen();
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
          <div>Primeira vez no Airbnb?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline font-semibold"
          >
            Cadastre-se
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Entrar"
      actionLabel="Continuar"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
