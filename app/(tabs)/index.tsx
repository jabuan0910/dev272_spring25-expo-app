// app/(tabs)/index.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Switch,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { useDogBreeds, DogBreed } from "../../hooks/useDogBreeds";
import { useTheme } from "../../context/ThemeContext";
import { Platform } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function HomeTab() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  // const test = "bad spacing";
  // const testValue = "Just testing pre-commit hook";
  const isDark = theme === "dark";
  const insets = useSafeAreaInsets();
  const { data, isLoading, isError } = useDogBreeds();
  const breeds = useMemo(() => data ?? [], [data]);

  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState<DogBreed[]>([]);
  const name = "React Native";
  console.log(name);

  useEffect(() => {
    if (breeds.length > 0) {
      setFiltered(breeds);
    }
  }, [breeds]);

  const onSearch = (text: string) => {
    setSearchText(text);
    const filteredBreeds = breeds.filter((breed) =>
      breed.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFiltered(filteredBreeds);
  };

  if (isLoading || isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>
          {isLoading
            ? "Loading from Supabase..."
            : "Failed to load dog breeds."}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDark ? "#121212" : "#fff",
          paddingBottom: insets.bottom,
        }}
      >
        {/* === Toggle Switch Positioned in Top Right === */}
        <View style={{ position: "absolute", top: 10, right: 20, zIndex: 1 }}>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <Text
          style={[
            styles.title,
            {
              marginBottom: 12,
              color: isDark ? "#ffffff" : "#000000",
            },
          ]}
        >
          Dog Explorer Search
        </Text>

        <View style={{ marginHorizontal: 16 }}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#222" : "#f2f2f2",
                color: isDark ? "#fff" : "#000",
                borderColor: isDark ? "#555" : "#ccc",
              },
            ]}
            placeholder="Search items..."
            placeholderTextColor={isDark ? "#999" : "#888"}
            value={searchText}
            onChangeText={onSearch}
          />
        </View>

        <Button
          title="+ Add New Breed"
          onPress={() => router.push("/add-breed")}
        />

        <View style={{ flex: 1 }}>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: isDark ? "#1f1f1f" : "#fff",
                    borderColor: isDark ? "#444" : "#ddd",
                  },
                ]}
              >
                <Text
                  style={[styles.name, { color: isDark ? "#fff" : "#000" }]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[styles.origin, { color: isDark ? "#ccc" : "#555" }]}
                >
                  {item.origin ?? "Unknown origin"}
                </Text>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    onPress={() => router.push(`/edit-breed/${item.id}`)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.detailsLink}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        `/detail?name=${item.name}&origin=${item.origin}`,
                      )
                    }
                    activeOpacity={0.7}
                  >
                    <Text style={styles.detailsLink}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={{
              paddingBottom: -100,
            }}
            showsVerticalScrollIndicator={true}
            scrollIndicatorInsets={{ right: 1 }}
            ListFooterComponent={<View style={{ height: 0 }} />}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerSection: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    marginHorizontal: 2,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16, // ⬅️ Add this for side spacing
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  origin: {
    fontSize: 14,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailsLink: {
    color: "#007AFF",
    fontSize: 16,
  },
});
