import { GameProvider } from "./context/GameContext";
import { AppLayout } from "./components/layout/AppLayout";
import { AppRouter } from "./router/AppRouter";
import { AppBootstrap } from "./components/AppBootstrap";

export default function App() {
  return (
    <GameProvider>
      <AppBootstrap />
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </GameProvider>
  );
}