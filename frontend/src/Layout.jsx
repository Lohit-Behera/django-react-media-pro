import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { fetchUserDetails } from "./features/UserSlice";
import AuroraBackground from "./components/AuroraBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FallBack from "./components/FallBack";
import ServerError from "./components/ServerError";
import Loader from "@/components/Loader/Loader";

function Layout() {
  const dispatch = useDispatch();
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

  return (
    <div className="relative min-h-screen h-full w-full">
      <div className="absolute inset-0 w-full h-full overflow-hidden object-cover -z-10">
        <AuroraBackground />
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
