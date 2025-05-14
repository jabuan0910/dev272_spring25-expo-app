// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { ItemsProvider } from "../context/ItemsContext";

export default function App() {
  return (
    <ItemsProvider>
      <Stack
        screenOptions={{
          headerBackTitle: "Back",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-item" options={{ title: "Save Data" }} />
        <Stack.Screen name="detail" options={{ title: "Detail" }} />
        <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      </Stack>
    </ItemsProvider>
  );
}
