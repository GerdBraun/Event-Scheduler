import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
   <header>
    <nav></nav>
   </header>
   <main>
    <Outlet />
   </main>
   <footer></footer>
   </>
  )
}

export default App
