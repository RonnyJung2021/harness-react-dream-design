import { ConfigProvider, UI_VERSION } from "@harness-react-dream-design/ui";
import { DocsShell } from "./layouts/DocsShell";

export default function App() {
  return (
    <ConfigProvider>
      <DocsShell uiVersion={UI_VERSION} />
    </ConfigProvider>
  );
}
