// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { TaskProvider } from "./TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack screenOptions={{ headerBackTitle: "Home" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-task" options={{ title: "Add Task" }} />
        <Stack.Screen name="detail" options={{ title: "Detail" }} />
        <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      </Stack>
    </TaskProvider>
  );
}
