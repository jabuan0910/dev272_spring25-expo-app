// app/(tabs)/index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { useDogBreeds, DogBreed } from "../../hooks/useDogBreeds";
import { Ionicons } from "@expo/vector-icons";

export default function HomeTab() {
  const router = useRouter();

  const { data, isLoading, isError } = useDogBreeds();
  const breeds = data ?? [];

  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState<DogBreed[]>([]);

  useEffect(() => {
    if (breeds && breeds.length > 0) {
      setFiltered(breeds);
    }
  }, [breeds]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading from Supabase...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Failed to load dog breeds.</Text>
      </View>
    );
  }

  const onSearch = (text: string) => {
    setSearchText(text);
    const filteredBreeds = breeds.filter((breed) =>
      breed.name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredBreeds);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Saved Items</Text>

      <TextInput
        style={styles.input}
        placeholder="Search items..."
        value={searchText}
        onChangeText={onSearch}
      />

      <Button title="+ Add New Item" onPress={() => router.push("/add-item")} />

      <FlatList
        style={{ marginTop: 12 }}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
              router.push(`/detail?name=${item.name}&origin=${item.origin}`)
            }
          >
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.origin}>
                {item.origin ?? "Unknown origin"}
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.detailsText}>Details</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#007AFF"
                style={styles.detailsIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No items yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  origin: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  detailsLink: {
    color: "#007AFF",
    fontSize: 14,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  detailsText: {
    color: "#007AFF",
    fontSize: 14,
    marginRight: 4,
  },
  detailsIcon: {
    color: "#007AFF",
    fontSize: 14,
  },
});
