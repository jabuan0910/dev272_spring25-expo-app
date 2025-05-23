// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { ItemsProvider } from "../context/ItemsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";

const queryClient = new QueryClient();

export default function AppLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ItemsProvider>
          <Stack
            screenOptions={{
              headerBackTitle: "Home",
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="add-item" options={{ title: "Save Data" }} />
            <Stack.Screen name="add-breed" options={{ title: "Add Breed" }} />
            <Stack.Screen name="detail" options={{ title: "Detail" }} />
            <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
          </Stack>
        </ItemsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

// app/detail.tsx
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";

// export default function DetailScreen() {
//   const router = useRouter();
//   const { name, origin } = useLocalSearchParams();

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>{name}</Text>
//         <Text style={styles.subtitle}>Origin: {origin}</Text>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>About this breed</Text>
//           <Text style={styles.description}>
//             This is a detailed description about the {name} breed from {origin}.
//             You can add more information here about temperament, size, lifespan,
//             and other characteristics.
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => router.back()}
//         >
//           <Text style={styles.buttonText}>Back to List</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 16,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 16,
//   },
//   section: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: "#444",
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
