import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { fetchUserDetails } from "./features/UserSlice";
import { Vortex } from "./components/ui/vortex";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import AuroraBackground from "./components/AuroraBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FallBack from "./components/FallBack";
import ServerError from "./components/ServerError";
import Loader from "@/components/Loader/Loader";

function Layout() {
  const dispatch = useDispatch();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const mode = useSelector((state) => state.mode.mode);

  const userInfo = useSelector((state) => state.user.userInfo);
  const userdetailsStatus = useSelector(
    (state) => state.user.userdetailsStatus
  );
  const userUpdateStatus = useSelector((state) => state.user.userUpdateStatus);
  const userUpdateSucceeded = userUpdateStatus === "succeeded";
  const id = userInfo ? userInfo.id : "";

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserDetails(id));
    }
  }, [dispatch, id, userUpdateSucceeded]);

  useEffect(() => {
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme =
      mode === "dark"
        ? "dark"
        : systemTheme && mode === "system"
        ? "dark"
        : "light";
    setIsDarkMode(theme === "dark");
  }, [mode]);
  return (
    <div className="relative min-h-screen h-full w-full">
      <div className="absolute inset-0 w-full h-full overflow-hidden object-cover -z-10">
        <div className="w-full mx-auto rounded-md fixed inset-0 h-screen overflow-hidden">
          {isDarkMode ? (
            <Vortex
              backgroundColor="black"
              rangeY={900}
              particleCount={700}
              baseHue={200}
              baseRadius={2}
              className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
            ></Vortex>
          ) : (
            <BackgroundGradientAnimation
              firstColor="#a889d9"
              secondColor="#6d28d9"
              thirdColor="#2ed9bc"
              fourthColor="#ce23e8"
              gradientBackgroundStart="#ce23e8"
              gradientBackgroundEnd="#2ed9bc"
              className="w-full h-full"
            ></BackgroundGradientAnimation>
          )}
        </div>
      </div>
      <Header />
      <ErrorBoundary FallbackComponent={FallBack}>
        {!userInfo ? (
          <Outlet />
        ) : (
          <>
            {userdetailsStatus === "loading" ? (
              <Loader hightfull />
            ) : userdetailsStatus === "failed" ? (
              <ServerError />
            ) : (
              <Outlet />
            )}
          </>
        )}
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default Layout;
