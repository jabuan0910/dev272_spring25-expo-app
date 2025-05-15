// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { ItemsProvider } from "../context/ItemsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
