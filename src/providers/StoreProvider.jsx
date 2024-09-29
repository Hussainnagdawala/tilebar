import { useRef } from "react";
import { Provider } from "react-redux";
// import { store, AppStore } from "../rtk/store/index";

export function StoreProvider({ children }) {
  // const storeRef = useRef<AppStore>();
  // if (!storeRef.current) {
  //   // Create the store instance the first time this renders
  //   storeRef.current = store();
  // }

  return <Provider store={""}>{children}</Provider>;
}
