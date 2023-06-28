import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Layout = lazy(() => import("./pages/layout"));
const HomePage = lazy(() => import("./pages"));
const GamePage = lazy(() => import("./pages/[channel]"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/numerica-game/" element={<HomePage />} />
        <Route path="/numerica-game/:channel" element={<GamePage />} />
      </Route>
    </Routes>
  );
}
