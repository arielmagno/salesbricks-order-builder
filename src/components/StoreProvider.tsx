"use client"; // ✅ This makes sure Redux is available inside client components

import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
