import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
