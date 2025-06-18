import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import Home from "./pages/Home/Home.page";
import About from "./pages/About/About.page";
import CardDetails from "./components/CardDetails";
import RouteGuard from "./components/RouteGuard";
import ErrorPage from "./pages/Error/Error.page";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/SignIn/login";
import Signup from "./pages/Register/signup";
import Favourites from "./pages/Favourites/Favourites.page";
import MyCardsPage from "./pages/MyCards/myCard.page";
import CreateCard from "./components/cards/createCards";
import EditCardPage from "./components/cards/editCardPage";
import GlobalSpinner from "./components/GlobalSpinner";
import { TRootState } from "./store/store";
import { userActions } from "./store/userSlice";
import { loadingActions } from "./store/loadingSlice";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: TRootState) => state.loadingSlice.isLoading,
  );
  const [isUserReady, setIsUserReady] = useState(false);

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsUserReady(true);
        return;
      }

      dispatch(loadingActions.startLoading());
      axios.defaults.headers.common["x-auth-token"] = token;

      try {
        const parsedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = parsedToken._id;

        const { data } = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        );
        dispatch(userActions.login(data));
      } catch (err) {
        console.error("User fetch failed", err);
        localStorage.removeItem("token");
      } finally {
        dispatch(loadingActions.stopLoading());
        setIsUserReady(true);
      }
    };

    initUser();
  }, [dispatch]);
  
  


  if (!isUserReady || isLoading) {
    return <GlobalSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/card/:id" element={<CardDetails />} />
      <Route
        path="/profile"
        element={
          <RouteGuard>
            <Profile />
          </RouteGuard>
        }
      />
      <Route
        path="/create-card"
        element={
          <RouteGuard isBiz={true}>
            <CreateCard />
          </RouteGuard>
        }
      />
      <Route
        path="/edit-card/:id"
        element={
          <RouteGuard isBiz={true}>
            <EditCardPage />
          </RouteGuard>
        }
      />
      <Route
        path="/my-card"
        element={
          <RouteGuard isBiz={true}>
            <MyCardsPage />
          </RouteGuard>
        }
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
