import { Outlet } from "react-router-dom";
import Footer from "./ui/Footer";
import Header from "./ui/Header/Header";

import { Toaster } from "react-hot-toast";

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default AppLayout;
