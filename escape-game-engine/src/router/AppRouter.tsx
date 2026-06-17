import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { GamePage } from "../pages/GamePage";
import { SummaryPage } from "../pages/SummaryPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}