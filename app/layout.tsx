import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "./providers/Toasterprovider";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb Clone",
  description: "Um Clone do Airbnb feito com Next.js e TailwindCSS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
