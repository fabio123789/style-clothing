import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation from "./components/navigation/Navigation";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

const Home = lazy(() => import("./routes/home/Home"));
const Authentication = lazy(() => import("./routes/authentication/Authentication"));

function App() {
  return (
    <>
      <Navigation />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
