import { StoreProvider } from "./StoreProvider";
import { ThemeSettingsProvider } from "./ThemeSettingsProvider";
import { ToastProvider } from "./ToastProvider";

export const ProviderTree = ({ children }) => {
  return (
    // <StoreProvider>
    <ToastProvider>
      <ThemeSettingsProvider>{children}</ThemeSettingsProvider>
    </ToastProvider>
    // </StoreProvider>
  );
};
