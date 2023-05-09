"use client";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reserva cancelada com sucesso!");
          router.refresh();
        })
        .catch(() => {
          toast.error("Não foi possível cancelar a reserva.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Reservas"
        subtitle={`Olá, ${currentUser.name}! Aqui estão as reservas em suas propriedades.`}
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancelar reserva"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
