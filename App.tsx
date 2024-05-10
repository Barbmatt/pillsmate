import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PillDataProvider } from "./src/context/PillDataContext";
import { Home } from "./src/views/Home";

export default function App() {
  return (
    <PillDataProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <Home></Home>
        </SafeAreaProvider>
      </PaperProvider>
    </PillDataProvider>
  );
}
