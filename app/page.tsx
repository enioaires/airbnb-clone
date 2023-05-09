import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { SafeListing } from "./types";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  const isEmpty = listings.length === 0;

  if (isEmpty) return <EmptyState showReset />;

  const onAction = (id: string) => {
    console.log(id);
  };

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: SafeListing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              actionLabel="Reservar"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
}
