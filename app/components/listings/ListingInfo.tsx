"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { LucideIcon } from "lucide-react";
import { FC } from "react";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        label: string;
        description: string;
        icon: LucideIcon;
      }
    | undefined;
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
}

const ListingInfo: FC<ListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div>Hospedado por {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} hóspede(s)</div>
          <div>{roomCount} quarto(s)</div>
          <div>{bathroomCount} banheiro(s)</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
