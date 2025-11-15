import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";



const Home = lazy(() => import("../pages/Home/Home"));
const CharacterDetails = lazy(() => import("../pages/CharacterDetails/CharacterDetails"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}