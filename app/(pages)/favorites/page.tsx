import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async ({}) => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Você ainda não favoritou nenhuma propriedade."
        subtitle="Navegue pelas propriedades e clique no coração para favoritar."
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
