import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AppLayout } from "./components/layout/AppLayout";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { Modules } from "./pages/Modules";
import { ModuleDetails } from "./pages/ModuleDetails";
import { Workspace } from "./pages/Workspace";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Landing />} />
            <Route path="modules" element={<Modules />} />
            <Route path="modules/:moduleId" element={<ModuleDetails />} />
            <Route path="problems" element={<Home />} />
            <Route path="workspace/:id" element={<Workspace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
