import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation from "./components/navigation/Navigation";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/checkout/Checkout";

const Home = lazy(() => import("./routes/home/Home"));
const Authentication = lazy(() =>
  import("./routes/authentication/Authentication")
);

function App() {
  return (
    <>
      <Navigation />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
