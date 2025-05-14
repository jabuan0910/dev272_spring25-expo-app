// app/(tabs)/index.tsx
import React, { useContext, useState, useEffect } from "react";
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
import { ItemsContext } from "../../context/ItemsContext"; // ← correct path

export default function HomeTab() {
  const router = useRouter();
  const { items } = useContext(ItemsContext); // ← useContext here
  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    setFiltered(items);
  }, [items]);

  const onSearch = (text: string) => {
    setSearchText(text);
    setFiltered(
      items.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
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

      <Button
        title="+ Add New Item"
        onPress={() => router.push("/add-item")} // ← routes to app/add-item.tsx
      />

      <FlatList
        style={{ marginTop: 12 }}
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
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
