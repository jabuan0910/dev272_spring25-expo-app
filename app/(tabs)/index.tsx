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

export default function HomeTab() {
  const router = useRouter();
  const { data, isLoading, isError } = useDogBreeds(); // ✅ safe default
  const breeds: DogBreed[] = data ?? [];

  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState<DogBreed[]>([]);

  useEffect(() => {
    setFiltered(breeds);
  }, [breeds]);

  const onSearch = (text: string) => {
    setSearchText(text);
    const filteredBreeds = breeds.filter((breed) =>
      breed.name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredBreeds);
  };

  // if (!isLoading) {
  //   return <Text>Loading from Supabase...</Text>;
  // }

  // if (isError) {
  //   return <Text>Failed to load dog breeds.</Text>;
  // }

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
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.origin ?? "Unknown origin"}</Text>
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
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  name: { fontSize: 16, fontWeight: "600" },
  desc: { fontSize: 14, color: "#555", marginTop: 4 },
});
