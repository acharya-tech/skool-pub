import "src/global.css";

import { Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";

import { themeConfig, ThemeProvider } from "./theme";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import { defaultSettings, SettingsProvider } from "./components/settings";
import { useMainRoute } from "@hooks/useMainRoute";
import { switchRoutes } from "./pages/route";
import { dataProvider } from "./_service/dataProvider";
import { BASE_URL } from "@common/options";
import { axiosInstance } from "./_service/axious";
import { useTranslation } from "react-i18next";
import { CapLetter } from "@utils/other";
import { authProvider } from "./authProvider";
import { CONFIG } from "./global-config";
import { accessControlProvider } from "./accessControlProvider";
type AppProps = {
  children: React.ReactNode;
};
function App({ children }: AppProps) {
  const { t, i18n } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const mainRoute = useMainRoute((state: any) => state.route)

  return (
    <RefineKbarProvider>
      <SettingsProvider defaultSettings={defaultSettings}>
        <ThemeProvider
          modeStorageKey={themeConfig.modeStorageKey}
          defaultMode={themeConfig.defaultMode}
        >
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              i18nProvider={i18nProvider}
              dataProvider={dataProvider(BASE_URL, axiosInstance)}
              notificationProvider={useNotificationProvider}
              accessControlProvider={accessControlProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                ...switchRoutes(mainRoute, t),
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
              }}
            >
              {children}
              <UnsavedChangesNotifier />
              <DocumentTitleHandler handler={({ resource, action }) => {
                let title = CONFIG.appName
                if (resource && action) {
                  title = `${resource.meta?.label ?? CapLetter(resource.name)} ${action} | ${title}`;
                }
                return title;
              }} />
            </Refine>
          </RefineSnackbarProvider>
        </ThemeProvider>
      </SettingsProvider>
    </RefineKbarProvider>
  );
}

export default App;
