// app/add-item.tsx
import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ItemsContext } from "../../context/ItemsContext";

export default function AddItemScreen() {
  const { addItem } = useContext(ItemsContext);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerBackTitle: "Home",
  //     title: "Add Item",
  //   });
  // }, [navigation]);

  const handleSubmit = () => {
    if (!name.trim() || !desc.trim()) {
      setError("Both fields are required.");
      return;
    }
    addItem({ id: Date.now().toString(), name, description: desc });
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        style={styles.input}
      />
      {error.length > 0 && <Text style={styles.error}>{error}</Text>}
      <Button title="Save Item" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12 },
  error: { color: "red", marginBottom: 12 },
});
