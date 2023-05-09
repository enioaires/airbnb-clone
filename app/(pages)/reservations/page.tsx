import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Você não deveria estar aqui"
        subtitle="Faça login para ver suas reservas"
      />
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="Você ainda não tem nenhuma reserva"
        subtitle="Quando você fizer uma reserva, ela aparecerá aqui."
      />
    );
  }

  return (
    <div>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  );
};

export default ReservationsPage;
