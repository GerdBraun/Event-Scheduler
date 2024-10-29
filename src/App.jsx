import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import EventList from "./components/EventList";
import EventSingle from "./components/EventSingle";
import LoginForm from "./components/LoginForm";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <Hero />
              <EventList />
            </>
          }
        />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventSingle />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
