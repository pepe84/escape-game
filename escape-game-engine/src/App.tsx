import { AppLayout } from "./components/layout/AppLayout";
import { AppRouter } from "./router/AppRouter";
import { GameProvider } from "./context/GameContext";

export default function App() {
  return (
    <GameProvider>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </GameProvider>
  );
}