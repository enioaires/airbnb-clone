"use client";
import { Menu } from "lucide-react";
import { FC, useCallback, useState } from "react";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, currentUser, rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Anuncie seu espaço no Airbnb
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <Menu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="Viagens"
                />
                <MenuItem onClick={() => {}} label="Favoritos" />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Reservas"
                />
                <MenuItem onClick={() => {}} label="Propriedades" />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label="Anuncie seu espaço no Airbnb"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Sair da conta" />
              </>
            ) : (
              <>
                <MenuItem onClick={registerModal.onOpen} label="Cadastrar-se" />
                <MenuItem onClick={loginModal.onOpen} label="Entrar" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
