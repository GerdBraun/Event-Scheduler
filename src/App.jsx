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
import SignupForm from "./components/SignupForm";
import EventAddForm from "./components/EventAddForm";

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
        <Route path="/events/add" element={<EventAddForm />} /> {/* must be protected */}
        <Route path="/events/edit/:id" element={<EventAddForm />} /> {/* must be protected */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} /> {/* should be hidden when user is logged in */}
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
