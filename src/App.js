import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "./components/navigation/Navigation";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/checkout/Checkout";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/Firebase";
import { setCurrentUser } from "./store/user/userAction";

const Home = lazy(() => import("./routes/home/Home"));
const Authentication = lazy(() =>
  import("./routes/authentication/Authentication")
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    unsubscribe();
  }, []);

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
