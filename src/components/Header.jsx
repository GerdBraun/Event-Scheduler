import Navbar from "./Navbar";

const Header = ({ token }) => {
  return (
    <header>
      <Navbar token={token} />
    </header>
  );
};

export default Header;
