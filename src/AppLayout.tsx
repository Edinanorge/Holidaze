import { Outlet } from "react-router-dom";
import Footer from "./ui/Footer";
import Header from "./ui/Header/Header";
import { SearchProvider } from "./context/searchContext";
import { Toaster } from "react-hot-toast";

function AppLayout() {
  return (
    <SearchProvider>
      <Header />
      <Outlet />
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </SearchProvider>
  );
}

export default AppLayout;
