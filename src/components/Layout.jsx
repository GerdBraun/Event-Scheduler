import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ token }) => {
  return (
    <>
      <Header token={token} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
