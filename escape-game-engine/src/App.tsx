import { BrowserRouter } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { AppLayout } from "./components/layout/AppLayout";
import { AppRoutes } from "./router/AppRoutes";
import { AppBootstrap } from "./components/AppBootstrap";

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppBootstrap />
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </GameProvider>
    </BrowserRouter>
  );
}