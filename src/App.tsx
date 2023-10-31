import { Outlet } from "react-router-dom";
import Nav from "./ui/Header/Navbar";
import Footer from "./ui/Footer";

function App() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
