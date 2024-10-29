import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const Layout = () => {
  return (
    <>
    <header>
        <nav>Navbar</nav>
    </header>
    <main>
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default Layout