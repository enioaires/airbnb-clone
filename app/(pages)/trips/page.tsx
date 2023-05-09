import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/app/components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Sem permissão"
        subtitle="Você não tem permissão para acessar essa página."
      />
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="Nenhuma reserva encontrada"
        subtitle="Você ainda não fez nenhuma reserva."
      />
    );
  }

  return (
    <div>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </div>
  );
};

export default TripsPage;
