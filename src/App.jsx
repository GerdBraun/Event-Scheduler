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
import ProtectedLayout from "./components/ProtectedLayout";
import { useEffect, useState } from "react";
import EventEditForm from "./components/EventEditForm";
import Logout from "./components/Logout";

function App() {
  const [token, setToken] = useState(false);
  /**
   * gets the user's token from localStorage
   */
  const getToken = () => {
    const userToken = localStorage.getItem("token") || false;
    setToken(userToken);
  };

  /**
   * saves a newly received token from login to localStorage & hands it over to the app
   * @param {String} newToken
   */
  const rememberToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  /**
   * removes the token from localStorage (logout)
   */
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(false);
  };

  useEffect(() => {
    getToken();
    /* just for testing */
    // TODO: remove this for production
    rememberToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMwMTk5NTIxLCJleHAiOjE3MzM3OTk1MjF9.feS_3p40GSX0l4Un3_YpWtnyCYni0hyDBz2cZhOUz0M");
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout token={token} />}>
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
        {/* must be protected */}
        <Route path="/events/add" element={<ProtectedLayout token={token} />}>
          <Route index element={<EventAddForm />} />
        </Route>
        {/* must be protected */}
        <Route path="/events/edit/:id" element={<ProtectedLayout token={token} />}>
          <Route index element={<EventEditForm />} />
        </Route>
        {/* should be hidden when user is logged in */}
        <Route
          path="/login"
          element={<LoginForm rememberToken={rememberToken} />}
        />
        <Route
          path="/logout"
          element={<Logout removeToken={removeToken} />}
        />
        {/* should be hidden when user is logged in */}
        <Route path="/signup" element={<SignupForm />} />
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
