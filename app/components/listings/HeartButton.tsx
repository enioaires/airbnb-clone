"use client";
import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { Heart } from "lucide-react";
import { FC } from "react";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: FC<HeartButtonProps> = ({ currentUser, listingId }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      {hasFavorited ? (
        <Heart
          size={28}
          color="#fff"
          className="absolute fill-rose-500 mt-2 ml-2"
        />
      ) : (
        <Heart
          size={28}
          color="#fff"
          className="fill-neutral-500/70 absolute mt-2 ml-2"
        />
      )}
    </div>
  );
};

export default HeartButton;
