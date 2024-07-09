import React from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "./components/navigation/Navigation.tsx";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.tsx";
import Shop from "./routes/shop/Shop.tsx";
import Checkout from "./routes/checkout/Checkout.tsx";
import { checkUserSession } from "./store/user/userAction.ts";

const Home = lazy(() => import("./routes/home/Home.tsx"));
const Authentication = lazy(() =>
  import("./routes/authentication/Authentication.tsx")
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/shop/*" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
