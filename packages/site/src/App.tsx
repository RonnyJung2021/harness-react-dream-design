import { ConfigProvider, UI_VERSION } from "@harness-react-dream-design/ui";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DocsShell } from "./layouts/DocsShell";
import { ButtonDocPage } from "./pages/ButtonDocPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DocsShell uiVersion={UI_VERSION} />}>
            <Route index element={<HomePage />} />
            <Route path="components/button" element={<ButtonDocPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
