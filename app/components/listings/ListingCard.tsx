"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";
import { Button } from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  actionId,
  actionLabel,
  currentUser,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (disabled) return;

      onAction?.(actionId!);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    if (reservation.startDate === reservation.endDate) {
      return `${format(startDate, "dd/MM/yyyy")}`;
    } else {
      return `${format(startDate, "dd/MM/yyyy")} - ${format(
        endDate,
        "dd/MM/yyyy"
      )}`;
    }
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing Image"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="aboslute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex item-scenter gap-1">
          <div className="font-semibol">R$ {price}</div>
          {!reservation && <div className="font-light">dia</div>}
        </div>
        {onAction && actionLabel && (
          <Button size={"sm"} onClick={handleCancel}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
